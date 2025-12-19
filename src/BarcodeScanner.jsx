import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { X, Camera, CameraOff } from 'lucide-react';

function BarcodeScanner({ onScan, onClose, isOpen }) {
  const videoRef = useRef(null);
  const [codeReader, setCodeReader] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    if (isOpen) {
      initializeScanner();
    }

    return () => {
      stopScanner();
    };
  }, [isOpen]);

  const initializeScanner = async () => {
    try {
      setError('');

      // Request camera permission
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment' // Use back camera if available
        }
      });

      setHasPermission(true);

      // Stop the test stream
      stream.getTracks().forEach(track => track.stop());

      // Initialize the barcode reader
      const reader = new BrowserMultiFormatReader();
      setCodeReader(reader);

      startScanning(reader);

    } catch (err) {
      console.error('Camera initialization error:', err);
      setHasPermission(false);

      if (err.name === 'NotAllowedError') {
        setError('Camera permission denied. Please allow camera access and try again.');
      } else if (err.name === 'NotFoundError') {
        setError('No camera found on this device.');
      } else {
        setError('Error accessing camera: ' + err.message);
      }
    }
  };

  const startScanning = async (reader) => {
    try {
      setIsScanning(true);

      await reader.decodeFromVideoDevice(null, videoRef.current, (result, error) => {
        if (result) {
          const text = result.getText();
          console.log('Scanned:', text);
          onScan(text);
          stopScanner();
        }

        if (error && error.name !== 'NotFoundException') {
          console.error('Scanning error:', error);
        }
      });

    } catch (err) {
      console.error('Scanning start error:', err);
      setError('Failed to start camera scanning.');
      setIsScanning(false);
    }
  };

  const stopScanner = () => {
    if (codeReader) {
      codeReader.reset();
    }
    setIsScanning(false);
  };

  const requestPermissionAgain = async () => {
    setError('');
    setHasPermission(null);
    await initializeScanner();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Camera size={24} />
            Scan Barcode
          </h3>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {hasPermission === false && (
          <div className="text-center">
            <CameraOff size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={requestPermissionAgain}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Try Again
            </button>
          </div>
        )}

        {hasPermission === true && (
          <div>
            <div className="relative mb-4">
              <video
                ref={videoRef}
                className="w-full h-64 bg-black rounded-lg"
                autoPlay
                playsInline
                muted
              />
              {isScanning && (
                <div className="absolute inset-0 border-2 border-blue-500 rounded-lg">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-32 h-32 border-2 border-red-500 rounded-lg animate-pulse"></div>
                  </div>
                </div>
              )}
            </div>

            <p className="text-center text-gray-600 text-sm mb-4">
              Position the barcode within the red square to scan
            </p>

            {error && (
              <p className="text-red-600 text-center mb-4">{error}</p>
            )}

            <button
              onClick={onClose}
              className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        )}

        {hasPermission === null && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Requesting camera permission...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BarcodeScanner;