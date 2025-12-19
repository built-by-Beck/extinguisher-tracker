// src/components/BarcodeScanner.jsx
// AI-Powered Barcode Scanner using Barcode Detection API (Google ML Kit)
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { X, Camera, CameraOff, Zap } from 'lucide-react';
import { BarcodeDetectorPolyfill } from '@undecaf/barcode-detector-polyfill';

function BarcodeScanner({ onScan, onClose, isOpen }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const detectorRef = useRef(null);
  const scanIntervalRef = useRef(null);

  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');
  const [hasPermission, setHasPermission] = useState(null);
  const [detectedCodes, setDetectedCodes] = useState([]);
  const [scanCount, setScanCount] = useState(0);

  // Stop all scanning and release camera
  const stopScanner = useCallback(() => {
    console.log('🛑 Stopping scanner...');
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        console.log('Stopping track:', track.label, track.readyState);
        track.stop();
      });
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsScanning(false);
    setDetectedCodes([]);
    console.log('✅ Scanner stopped');
  }, []);

  // Helper: get a working media stream with fallbacks
  const getWorkingStream = async () => {
    const tryConstraints = [
      { video: { facingMode: { ideal: 'environment' }, width: { ideal: 1920 }, height: { ideal: 1080 } }, audio: false },
      { video: { facingMode: { ideal: 'user' }, width: { ideal: 1920 }, height: { ideal: 1080 } }, audio: false },
      { video: true, audio: false }
    ];
    let lastErr = null;
    for (const constraints of tryConstraints) {
      try {
        const s = await navigator.mediaDevices.getUserMedia(constraints);
        return s;
      } catch (e) {
        lastErr = e;
        console.warn('getUserMedia failed for constraints', constraints, e);
      }
    }
    throw lastErr || new Error('No camera stream available');
  };

  // Initialize camera and barcode detector
  const initializeScanner = useCallback(async () => {
    console.log('🎥 Initializing scanner...');
    setError('');
    setHasPermission(null);
    setScanCount(0);

    try {
      // Check if BarcodeDetector is supported (native or polyfill)
      const BarcodeDetector = window.BarcodeDetector || BarcodeDetectorPolyfill;
      console.log('BarcodeDetector available:', !!BarcodeDetector);

      // Check supported formats
      const formats = await BarcodeDetector.getSupportedFormats?.();
      console.log('Supported barcode formats:', formats);

      // Create detector for all supported formats
      detectorRef.current = new BarcodeDetector({
        formats: formats || [
          'code_128', 'code_39', 'code_93',
          'ean_8', 'ean_13', 'upc_a', 'upc_e',
          'qr_code', 'data_matrix', 'aztec', 'pdf417'
        ]
      });
      console.log('✅ Barcode detector created');

      // Request camera with fallbacks
      console.log('📸 Requesting camera access...');
      console.log('Navigator.mediaDevices available:', !!navigator.mediaDevices);
      console.log('getUserMedia available:', !!navigator.mediaDevices?.getUserMedia);
      console.log('Platform:', navigator.platform);
      console.log('User Agent:', navigator.userAgent);

      const stream = await getWorkingStream();
      console.log('✅ Camera stream obtained:', stream.getVideoTracks()[0].label);
      console.log('Video track settings:', stream.getVideoTracks()[0].getSettings());
      
      setHasPermission(true);
      streamRef.current = stream;

      if (videoRef.current) {
        const video = videoRef.current;

        // Set attributes for iOS Safari
        video.setAttribute('playsinline', 'true');
        video.setAttribute('webkit-playsinline', 'true');

        const startVideo = async () => {
          video.srcObject = streamRef.current;
          await new Promise((resolve) => {
            const onLoaded = () => { video.removeEventListener('loadedmetadata', onLoaded); resolve(); };
            video.addEventListener('loadedmetadata', onLoaded);
          });
          try {
            await video.play();
          } catch (e) {
            console.warn('video.play() rejected on init:', e);
            // iOS Safari sometimes needs a retry
            await new Promise(r => setTimeout(r, 50));
            try {
              await video.play();
            } catch (e2) {
              console.warn('video.play() retry failed:', e2);
            }
          }
        };

        // First attempt
        await startVideo();

        // iOS Safari needs extra time for video dimensions to populate
        await new Promise(r => setTimeout(r, 500));

        // Validate frames; if black, auto re-init once (mimics successful manual switch)
        const track = streamRef.current?.getVideoTracks?.()[0];
        const ready = () => video.videoWidth > 0 && video.videoHeight > 0 && track && track.readyState === 'live';
        if (!ready()) {
          console.warn('Video not ready, waiting longer...');
          await new Promise(r => setTimeout(r, 800));
        }
        if (!ready()) {
          console.warn('No frames after first init; auto re-initializing camera');
          stopScanner();
          const retry = await getWorkingStream();
          streamRef.current = retry;
          await startVideo();
          await new Promise(r => setTimeout(r, 500));
        }

        if (video.videoWidth === 0 || video.videoHeight === 0) {
          console.warn('Video still has zero dimensions; delaying scan start');
        }
        setIsScanning(true);
        startContinuousScanning();
      }
    } catch (err) {
      console.error('❌ Scanner initialization error:', err);
      console.error('Error name:', err.name);
      console.error('Error message:', err.message);
      console.error('Error stack:', err.stack);
      setHasPermission(false);

      if (err.name === 'NotAllowedError') {
        setError('Camera permission denied. Please reset: Settings > Safari > Advanced > Website Data > Delete this site, then refresh.');
      } else if (err.name === 'NotFoundError') {
        setError('No camera found on this device.');
      } else if (err.name === 'NotSupportedError') {
        setError('Camera requires HTTPS. This site must be accessed via https:// (not http://) on iOS devices.');
      } else if (err.name === 'NotReadableError') {
        setError('Camera is already in use by another app. Please close other camera apps and try again.');
      } else if (err.name === 'SecurityError') {
        setError('Security Error: Camera blocked. Make sure you are using HTTPS and have not previously denied permission.');
      } else {
        setError(`Error (${err.name}): ${err.message || String(err)}`);
      }
    }
  }, []);

  // Continuous scanning using ML Kit
  const startContinuousScanning = () => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }

    scanIntervalRef.current = setInterval(async () => {
      if (!videoRef.current || !detectorRef.current || !isScanning) return;

      try {
        // Detect barcodes in the current video frame
        if (videoRef.current.readyState < 2) return; // HAVE_CURRENT_DATA
        const barcodes = await detectorRef.current.detect(videoRef.current);

        if (barcodes && barcodes.length > 0) {
          setScanCount(prev => prev + 1);

          // Draw detection boxes on canvas
          drawBarcodes(barcodes);

          // Get the first detected barcode
          const barcode = barcodes[0];
          const text = barcode.rawValue;

          if (text && text.trim()) {
            console.log('✅ Barcode detected:', text, 'Format:', barcode.format);

            // Stop scanning and return result
            stopScanner();
            onScan(String(text).trim());
          }
        }
      } catch (err) {
        // Ignore errors during scanning (usually means no barcode in frame)
        if (!err.message?.includes('Could not')) {
          console.warn('Scan error:', err);
        }
      }
    }, 100); // Scan every 100ms for responsive detection
  };

  // Draw detection boxes on canvas overlay
  const drawBarcodes = (barcodes) => {
    if (!canvasRef.current || !videoRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext('2d');

    // Match canvas size to video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Clear previous drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw each detected barcode
    barcodes.forEach(barcode => {
      const { boundingBox, cornerPoints } = barcode;

      if (cornerPoints && cornerPoints.length === 4) {
        // Draw polygon around barcode
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(cornerPoints[0].x, cornerPoints[0].y);
        for (let i = 1; i < cornerPoints.length; i++) {
          ctx.lineTo(cornerPoints[i].x, cornerPoints[i].y);
        }
        ctx.closePath();
        ctx.stroke();
      } else if (boundingBox) {
        // Fallback to bounding box
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 4;
        ctx.strokeRect(boundingBox.x, boundingBox.y, boundingBox.width, boundingBox.height);
      }

      // Draw label
      ctx.fillStyle = '#00ff00';
      ctx.font = 'bold 20px Arial';
      const text = `${barcode.format}: ${barcode.rawValue}`;
      const x = boundingBox?.x || cornerPoints?.[0]?.x || 10;
      const y = (boundingBox?.y || cornerPoints?.[0]?.y || 10) - 10;
      ctx.fillText(text, x, y);
    });
  };

  // Switch between front/back camera
  const switchCamera = async () => {
    // Fully stop existing stream/tracks first
    stopScanner();
    try {
      // Attempt to get a stream with the opposite facing mode first
      const currentFacingMode = streamRef.current?.getVideoTracks()[0]?.getSettings()?.facingMode;
      const desiredMode = currentFacingMode === 'environment' ? 'user' : 'environment';
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: desiredMode }, width: { ideal: 1920 }, height: { ideal: 1080 } },
          audio: false
        });
      } catch (e) {
        console.warn('Switch with desired mode failed, using generic fallback', e);
        stream = await getWorkingStream();
      }
      streamRef.current = stream;
      if (videoRef.current) {
        const video = videoRef.current;

        // Set attributes for iOS Safari
        video.setAttribute('playsinline', 'true');
        video.setAttribute('webkit-playsinline', 'true');

        video.srcObject = stream;
        await new Promise((resolve) => {
          const onLoaded = () => { video.removeEventListener('loadedmetadata', onLoaded); resolve(); };
          video.addEventListener('loadedmetadata', onLoaded);
        });
        try {
          await video.play();
        } catch (e) {
          console.warn('video.play() rejected on switch:', e);
          // iOS Safari sometimes needs a retry
          await new Promise(r => setTimeout(r, 50));
          await video.play();
        }
        if (video.videoWidth === 0 || video.videoHeight === 0) {
          await new Promise(r => setTimeout(r, 150));
        }
        setIsScanning(true);
        startContinuousScanning();
      }
    } catch (err) {
      console.error('Camera switch error:', err);
      setError('Failed to switch camera');
      await initializeScanner();
    }
  };

  // Handle close
  const handleClose = () => {
    stopScanner();
    onClose?.();
  };

  // Initialize when opened
  useEffect(() => {
    console.log('BarcodeScanner effect - isOpen:', isOpen);
    if (isOpen) {
      // Small delay to ensure modal is fully rendered
      const timer = setTimeout(() => {
        initializeScanner();
      }, 100);
      return () => {
        clearTimeout(timer);
        stopScanner();
      };
    } else {
      stopScanner();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[95vh] overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Zap size={24} className="text-yellow-500" />
            AI Barcode Scanner
          </h3>
          <button
            onClick={handleClose}
            onTouchStart={() => {}}
            className="p-2 hover:bg-gray-100 active:bg-gray-200 rounded-full transition cursor-pointer"
            style={{ WebkitTapHighlightColor: 'rgba(0,0,0,0.1)', touchAction: 'manipulation' }}
            aria-label="Close scanner"
          >
            <X size={24} />
          </button>
        </div>

        {/* Permission Denied State */}
        {hasPermission === false && (
          <div className="text-center py-8">
            <CameraOff size={64} className="mx-auto mb-4 text-gray-400" />
            <p className="text-red-600 mb-4 font-medium">{error}</p>
            <button
              onClick={initializeScanner}
              onTouchStart={() => {}}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition font-medium cursor-pointer"
              style={{ WebkitTapHighlightColor: 'rgba(0,0,0,0.2)', touchAction: 'manipulation' }}
            >
              <Camera className="inline mr-2" size={20} />
              Try Again
            </button>
            <p className="text-xs text-gray-500 mt-4">
              Make sure to allow camera access when your browser asks
            </p>
          </div>
        )}

        {/* Camera Active State */}
        {hasPermission === true && (
          <div>
            {/* AI Badge */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg mb-4 text-center">
              <span className="font-semibold">🤖 Powered by Google ML Kit</span>
              <span className="text-xs block mt-1">
                AI-based detection • Supports all barcode types
              </span>
            </div>

            {/* Video Preview with Canvas Overlay */}
            <div className="relative mb-4 bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                className="w-full h-[400px] object-cover"
                autoPlay
                playsInline
                webkit-playsinline=""
                muted
              />
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
              />

              {/* Scanning Indicator */}
              {isScanning && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 animate-pulse">
                  <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                  Scanning... ({scanCount})
                </div>
              )}

              {/* Scan Frame Guide */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-64 h-40 border-4 border-green-400 rounded-lg shadow-lg">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-400 rounded-tl-lg"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-400 rounded-tr-lg"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-400 rounded-bl-lg"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-400 rounded-br-lg"></div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-800 font-medium mb-2">
                📸 How to scan:
              </p>
              <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
                <li>Hold your device steady</li>
                <li>Position the barcode inside the green frame</li>
                <li>Make sure the barcode is well-lit and in focus</li>
                <li>The scanner will automatically detect and read the code</li>
              </ul>
            </div>

            {/* Controls */}
            <div className="flex gap-3">
              <button
                onClick={switchCamera}
                onTouchStart={() => {}}
                className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 active:bg-gray-800 transition font-medium flex items-center justify-center gap-2 cursor-pointer"
                style={{ WebkitTapHighlightColor: 'rgba(0,0,0,0.2)', touchAction: 'manipulation' }}
              >
                <Camera size={20} />
                Switch Camera
              </button>
              <button
                onClick={handleClose}
                onTouchStart={() => {}}
                className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 active:bg-red-700 transition font-medium cursor-pointer"
                style={{ WebkitTapHighlightColor: 'rgba(0,0,0,0.2)', touchAction: 'manipulation' }}
              >
                Cancel
              </button>
            </div>

            {/* Supported Formats */}
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Supports: QR Code, UPC, EAN, Code 128, Code 39, Data Matrix, PDF417, and more
              </p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {hasPermission === null && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-700 font-medium mb-2">Initializing AI Scanner...</p>
            <p className="text-sm text-gray-500">
              Please allow camera access when prompted
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BarcodeScanner;
