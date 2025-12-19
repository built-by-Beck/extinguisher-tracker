import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, CheckCircle, XCircle, Circle, Image as ImageIcon, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

/**
 * ExtinguisherDetailView - Full-page view showing all information about a fire extinguisher
 *
 * Features:
 * - Optimized photo loading (thumbnails first, lazy load on demand)
 * - Complete inspection history with photos
 * - Asset details prominently displayed
 * - Navigation from main list and section detail
 */
const ExtinguisherDetailView = ({ extinguishers }) => {
  const { assetId } = useParams();
  const navigate = useNavigate();
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [expandedInspection, setExpandedInspection] = useState(null);

  // Find the extinguisher by assetId
  const extinguisher = extinguishers.find(e => e.assetId === assetId);

  if (!extinguisher) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white p-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2 text-blue-400 hover:text-blue-300"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <div className="bg-red-900/20 border border-red-500 rounded-lg p-6 text-center">
            <h2 className="text-xl font-bold mb-2">Extinguisher Not Found</h2>
            <p className="text-gray-300">No extinguisher found with Asset ID: {assetId}</p>
          </div>
        </div>
      </div>
    );
  }

  // Get status icon and color
  const getStatusDisplay = (status) => {
    if (status === 'pass') return { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-900/30', label: 'PASSED' };
    if (status === 'fail') return { icon: XCircle, color: 'text-red-400', bg: 'bg-red-900/30', label: 'FAILED' };
    return { icon: Circle, color: 'text-gray-400', bg: 'bg-gray-800/30', label: 'PENDING' };
  };

  const currentStatus = getStatusDisplay(extinguisher.status);
  const StatusIcon = currentStatus.icon;

  // Prepare photos for optimized loading
  const mainPhoto = extinguisher.photos && extinguisher.photos.length > 0
    ? extinguisher.photos[0].url
    : extinguisher.photoUrl; // Fallback to old single photo

  const lastInspectionPhoto = extinguisher.lastInspectionPhotoUrl;

  // All gallery photos (excluding the first which is shown as main)
  const additionalPhotos = extinguisher.photos && extinguisher.photos.length > 1
    ? extinguisher.photos.slice(1)
    : [];

  // Get all inspection photos from history
  const inspectionHistory = extinguisher.inspectionHistory || [];
  const sortedHistory = [...inspectionHistory].sort((a, b) =>
    new Date(b.date) - new Date(a.date)
  );

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const totalPhotos = (extinguisher.photos?.length || 0) + inspectionHistory.filter(h => h.photoUrl).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white p-4 pb-20">
      <div className="max-w-4xl mx-auto">
        {/* Header with Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        {/* Asset Details Card */}
        <div className="bg-gray-800/50 backdrop-blur rounded-lg p-6 mb-4 border border-gray-700">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">Asset #{extinguisher.assetId}</h1>
              <div className="space-y-1 text-gray-300">
                <p><span className="font-semibold">Serial:</span> {extinguisher.serial || 'N/A'}</p>
                <p><span className="font-semibold">Section:</span> {extinguisher.section}</p>
              </div>
            </div>
            <div className={`${currentStatus.bg} ${currentStatus.color} px-4 py-2 rounded-lg flex items-center gap-2`}>
              <StatusIcon size={24} />
              <span className="font-bold">{currentStatus.label}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-700">
            <div>
              <p className="text-sm text-gray-400 mb-1">Location</p>
              <p className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>{extinguisher.vicinity || 'N/A'}</span>
              </p>
              {extinguisher.parentLocation && (
                <p className="text-sm text-gray-400 ml-6">({extinguisher.parentLocation})</p>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Last Checked</p>
              <p className="flex items-center gap-2">
                <Calendar size={16} />
                {extinguisher.checkedDate ? formatDate(extinguisher.checkedDate) : 'Never'}
              </p>
            </div>
          </div>

          {/* Current Notes */}
          {extinguisher.notes && (
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-sm text-gray-400 mb-1">Current Notes</p>
              <p className="text-gray-200 bg-gray-900/50 p-3 rounded">{extinguisher.notes}</p>
            </div>
          )}

          {/* GPS Location */}
          {extinguisher.gps && (
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-sm text-gray-400 mb-1">GPS Location</p>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm bg-black/40 px-2 py-1 rounded">
                    {Number(extinguisher.gps.lat).toFixed(6)}, {Number(extinguisher.gps.lng).toFixed(6)}
                    {extinguisher.gps.accuracy && (
                      <span className="text-gray-400"> (±{Math.round(extinguisher.gps.accuracy)}m)</span>
                    )}
                  </span>
                </div>
                <a
                  className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                  href={`https://maps.google.com/?q=${extinguisher.gps.lat},${extinguisher.gps.lng}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open in Maps <ExternalLink size={14} />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Photos Section - Optimized Loading */}
        <div className="bg-gray-800/50 backdrop-blur rounded-lg p-6 mb-4 border border-gray-700">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <ImageIcon size={24} />
            Photos ({totalPhotos})
          </h2>

          {/* Initial Photos (Thumbnails) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Main Photo */}
            {mainPhoto && (
              <div>
                <p className="text-sm text-gray-400 mb-2">Main Photo</p>
                <a
                  href={mainPhoto}
                  target="_blank"
                  rel="noreferrer"
                  className="block group relative"
                >
                  <img
                    src={mainPhoto}
                    alt="Main extinguisher photo"
                    className="w-full h-48 object-cover rounded-lg border border-gray-600 group-hover:border-blue-400 transition-colors"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <ExternalLink size={32} className="text-white" />
                  </div>
                </a>
              </div>
            )}

            {/* Last Inspection Photo */}
            {lastInspectionPhoto && (
              <div>
                <p className="text-sm text-gray-400 mb-2">Last Inspection Photo</p>
                <a
                  href={lastInspectionPhoto}
                  target="_blank"
                  rel="noreferrer"
                  className="block group relative"
                >
                  <img
                    src={lastInspectionPhoto}
                    alt="Last inspection photo"
                    className="w-full h-48 object-cover rounded-lg border border-gray-600 group-hover:border-blue-400 transition-colors"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <ExternalLink size={32} className="text-white" />
                  </div>
                </a>
              </div>
            )}

            {!mainPhoto && !lastInspectionPhoto && (
              <p className="text-gray-400 col-span-2">No photos available</p>
            )}
          </div>

          {/* View All Photos - Lazy Loaded */}
          {(additionalPhotos.length > 0 || inspectionHistory.some(h => h.photoUrl)) && (
            <div className="border-t border-gray-700 pt-4">
              <button
                onClick={() => setShowAllPhotos(!showAllPhotos)}
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                {showAllPhotos ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                {showAllPhotos ? 'Hide' : 'View'} All Photos ({totalPhotos} total)
              </button>

              {showAllPhotos && (
                <div className="mt-4 space-y-4">
                  {/* Additional Gallery Photos */}
                  {additionalPhotos.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Gallery Photos</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {additionalPhotos.map((photo, index) => (
                          <a
                            key={index}
                            href={photo.url}
                            target="_blank"
                            rel="noreferrer"
                            className="block group relative"
                          >
                            <img
                              src={photo.url}
                              alt={`Gallery photo ${index + 2}`}
                              className="w-full h-32 object-cover rounded-lg border border-gray-600 group-hover:border-blue-400 transition-colors"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                              <ExternalLink size={24} className="text-white" />
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Inspection Photos from History (excluding last inspection if already shown) */}
                  {inspectionHistory.filter(h => h.photoUrl && h.photoUrl !== lastInspectionPhoto).length > 0 && (
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Previous Inspection Photos</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {inspectionHistory
                          .filter(h => h.photoUrl && h.photoUrl !== lastInspectionPhoto)
                          .map((inspection, index) => {
                            const inspStatus = getStatusDisplay(inspection.status);
                            return (
                              <a
                                key={index}
                                href={inspection.photoUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="block group relative"
                              >
                                <img
                                  src={inspection.photoUrl}
                                  alt={`Inspection photo from ${formatDate(inspection.date)}`}
                                  className="w-full h-32 object-cover rounded-lg border border-gray-600 group-hover:border-blue-400 transition-colors"
                                />
                                <div className={`absolute top-2 right-2 ${inspStatus.bg} ${inspStatus.color} px-2 py-1 rounded text-xs font-bold`}>
                                  {inspStatus.label}
                                </div>
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                  <ExternalLink size={24} className="text-white" />
                                </div>
                                <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded text-xs">
                                  {formatDate(inspection.date)}
                                </div>
                              </a>
                            );
                          })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Inspection History */}
        <div className="bg-gray-800/50 backdrop-blur rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-bold mb-4">Inspection History ({sortedHistory.length})</h2>

          {sortedHistory.length === 0 ? (
            <p className="text-gray-400">No inspection history available</p>
          ) : (
            <div className="space-y-3">
              {sortedHistory.map((inspection, index) => {
                const inspStatus = getStatusDisplay(inspection.status);
                const InspStatusIcon = inspStatus.icon;
                const isExpanded = expandedInspection === index;

                return (
                  <div
                    key={index}
                    className={`${inspStatus.bg} border ${inspStatus.color.replace('text-', 'border-')} rounded-lg p-4`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <InspStatusIcon size={20} className={inspStatus.color} />
                          <span className={`font-bold ${inspStatus.color}`}>{inspStatus.label}</span>
                          <span className="text-gray-400 text-sm">• {formatDate(inspection.date)}</span>
                        </div>

                        {inspection.notes && (
                          <p className="text-gray-300 text-sm mb-2">{inspection.notes}</p>
                        )}

                        {/* Show photo thumbnail if exists */}
                        {inspection.photoUrl && (
                          <div className="mt-2">
                            <a
                              href={inspection.photoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-block group relative"
                            >
                              <img
                                src={inspection.photoUrl}
                                alt={`Inspection photo from ${formatDate(inspection.date)}`}
                                className="h-20 w-auto rounded border border-gray-600 group-hover:border-blue-400 transition-colors"
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center">
                                <ExternalLink size={20} className="text-white" />
                              </div>
                            </a>
                          </div>
                        )}

                        {/* GPS from inspection */}
                        {inspection.gps && (
                          <div className="mt-2 text-xs text-gray-400">
                            <a
                              href={`https://maps.google.com/?q=${inspection.gps.lat},${inspection.gps.lng}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                            >
                              GPS: {Number(inspection.gps.lat).toFixed(4)}, {Number(inspection.gps.lng).toFixed(4)}
                              <ExternalLink size={12} />
                            </a>
                          </div>
                        )}

                        {/* Checklist Data - Expandable */}
                        {inspection.checklistData && (
                          <div className="mt-2">
                            <button
                              onClick={() => setExpandedInspection(isExpanded ? null : index)}
                              className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                            >
                              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                              {isExpanded ? 'Hide' : 'View'} Checklist Details
                            </button>

                            {isExpanded && (
                              <div className="mt-2 bg-black/30 p-3 rounded text-sm space-y-1">
                                {Object.entries(inspection.checklistData).map(([key, value]) => (
                                  <div key={key} className="flex justify-between">
                                    <span className="text-gray-300">
                                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                                    </span>
                                    <span className={value ? 'text-green-400' : 'text-red-400'}>
                                      {value ? '✓ Pass' : '✗ Fail'}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExtinguisherDetailView;
