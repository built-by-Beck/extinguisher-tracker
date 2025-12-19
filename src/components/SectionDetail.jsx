import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Info } from 'lucide-react';

export default function SectionDetail({ extinguishers, onSelectItem, getViewMode, toggleView, countsFor, onPass, onFail, onEdit, onSaveNotes }) {
  const { name } = useParams();
  const navigate = useNavigate();
  const section = decodeURIComponent(name || '');
  const [mode, setMode] = useState('unchecked');
  const [scanValue, setScanValue] = useState('');
  const scanRef = useRef(null);
  const [activeItem, setActiveItem] = useState(null);
  const [sortBy, setSortBy] = useState('assetId');
  const [sortOrder, setSortOrder] = useState('asc');
  const [checklist, setChecklist] = useState({
    pinPresent: 'pass',
    tamperSealIntact: 'pass',
    gaugeCorrectPressure: 'pass',
    weightCorrect: 'pass',
    noDamage: 'pass',
    inDesignatedLocation: 'pass',
    clearlyVisible: 'pass',
    nearestUnder75ft: 'pass',
    topUnder5ft: 'pass',
    bottomOver4in: 'pass',
    mountedSecurely: 'pass',
    inspectionWithin30Days: 'pass',
    tagSignedDated: 'pass'
  });
  const [notes, setNotes] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [gps, setGps] = useState(null);
  const [gpsLoading, setGpsLoading] = useState(false);

  useEffect(() => {
    const persisted = localStorage.getItem(`sectionView_${section}`);
    setMode(persisted || getViewMode?.(section) || 'unchecked');
  }, [section, getViewMode]);

  useEffect(() => {
    if (scanRef.current) scanRef.current.focus();
  }, [section]);

  const items = useMemo(() => {
    const list = extinguishers.filter(e => e.section === section);
    const filtered = list.filter(e => mode === 'unchecked' ? e.status === 'pending' : (e.status === 'pass' || e.status === 'fail'));

    // Sort the filtered list
    const sorted = [...filtered].sort((a, b) => {
      let compareValue = 0;

      if (sortBy === 'assetId') {
        const aId = String(a.assetId || '').toLowerCase();
        const bId = String(b.assetId || '').toLowerCase();

        // Try to extract numbers for numeric comparison
        const aNum = parseInt(aId.match(/\d+/)?.[0] || '0');
        const bNum = parseInt(bId.match(/\d+/)?.[0] || '0');

        if (aNum !== bNum) {
          compareValue = aNum - bNum;
        } else {
          compareValue = aId.localeCompare(bId);
        }
      } else if (sortBy === 'location') {
        const aLoc = `${a.vicinity || ''} ${a.parentLocation || ''}`.toLowerCase();
        const bLoc = `${b.vicinity || ''} ${b.parentLocation || ''}`.toLowerCase();
        compareValue = aLoc.localeCompare(bLoc);
      }

      return sortOrder === 'asc' ? compareValue : -compareValue;
    });

    return sorted;
  }, [extinguishers, section, mode, sortBy, sortOrder]);

  const counts = countsFor?.(section) || { checked: 0, unchecked: 0 };

  const switchMode = (next) => {
    setMode(next);
    localStorage.setItem(`sectionView_${section}`, next);
    toggleView?.(section); // keep existing app state in sync
  };

  const findByScan = (code) => {
    if (!code) return null;
    const norm = String(code).trim();
    return extinguishers.find(e => String(e.assetId).trim() === norm) ||
           extinguishers.find(e => String(e.serial || '').trim() === norm);
  };

  const handleScanEnter = () => {
    const match = findByScan(scanValue);
    if (match) {
      setActiveItem(match);
      // Load existing checklist data if available
      if (match.checklistData) {
        setChecklist(match.checklistData);
      } else {
        setChecklist({
          pinPresent: 'pass',
          tamperSealIntact: 'pass',
          gaugeCorrectPressure: 'pass',
          weightCorrect: 'pass',
          noDamage: 'pass',
          inDesignatedLocation: 'pass',
          clearlyVisible: 'pass',
          nearestUnder75ft: 'pass',
          topUnder5ft: 'pass',
          bottomOver4in: 'pass',
          mountedSecurely: 'pass',
          inspectionWithin30Days: 'pass',
          tagSignedDated: 'pass'
        });
      }
      setNotes(match.notes || '');
      setPhotoFile(null);
      setPhotoPreview('');
      setGps(null);
    }
    setScanValue('');
  };

  const checklistSummary = () => {
    const failed = Object.entries(checklist).filter(([, status]) => status === 'fail').map(([k]) => k);
    return failed.length > 0 ? `Failed items: ${failed.join(', ')}. ${notes}`.trim() : notes;
  };

  const saveInspection = (status) => {
    const inspectionData = { checklistData: checklist, notes, photo: photoFile || null, gps: gps || null };

    if (status === 'pass') {
      onPass?.(activeItem, checklistSummary(), inspectionData);
    } else {
      onFail?.(activeItem, checklistSummary(), inspectionData);
    }
    setActiveItem(null);
    setPhotoFile(null);
    setPhotoPreview('');
    setGps(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button className="text-blue-600" onClick={() => navigate(-1)}>← Back</button>
        <div className="font-semibold text-xl">{section}</div>
        <div />
      </div>

      <div className="bg-white p-3 rounded-lg shadow flex items-center gap-2">
        <input
          ref={scanRef}
          value={scanValue}
          onChange={(e)=>setScanValue(e.target.value)}
          onKeyDown={(e)=>{ if (e.key === 'Enter') handleScanEnter(); }}
          placeholder="Scan Asset ID or Serial..."
          className="flex-1 px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
        <div className="text-sm text-gray-500">Scanner auto-fills + Enter</div>
      </div>

      <div className="bg-white p-3 rounded-lg shadow flex gap-2">
        <button
          onClick={() => switchMode('unchecked')}
          className={`flex-1 px-4 py-2 rounded font-medium ${mode === 'unchecked' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Unchecked ({counts.unchecked || 0})
        </button>
        <button
          onClick={() => switchMode('checked')}
          className={`flex-1 px-4 py-2 rounded font-medium ${mode === 'checked' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Checked ({counts.checked || 0})
        </button>
      </div>

      {items.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center text-gray-500">No items found.</div>
      ) : (
        <>
          <div className="space-y-3">
            {items.map(item => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md relative">
                <div onClick={() => setActiveItem(item)} className="cursor-pointer">
                  <div className="font-bold text-lg pr-10">{item.assetId}</div>
                  <div className="text-sm text-gray-600">{item.vicinity} • {item.parentLocation}</div>
                  <div className="text-xs text-gray-500 mt-1">Status: {item.status}</div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/app/extinguisher/${item.assetId}`);
                  }}
                  className="absolute top-3 right-3 p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                  title="View Details"
                >
                  <Info size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Sort Controls */}
          <div className="bg-white p-4 rounded-lg shadow mt-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Sort by:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSortBy('assetId')}
                    className={`px-3 py-1 rounded text-sm font-medium transition ${
                      sortBy === 'assetId'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Asset ID
                  </button>
                  <button
                    onClick={() => setSortBy('location')}
                    className={`px-3 py-1 rounded text-sm font-medium transition ${
                      sortBy === 'location'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Location
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Order:</span>
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition flex items-center gap-2 font-medium"
                >
                  {sortOrder === 'asc' ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                      </svg>
                      Ascending
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                      </svg>
                      Descending
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {activeItem && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg my-8 max-h-[90vh] flex flex-col">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center mb-2">
                <div className="font-semibold text-lg">{activeItem.assetId} — {activeItem.section}</div>
                <button onClick={() => setActiveItem(null)} className="text-gray-600">✕</button>
              </div>
              <div className="text-sm text-gray-600">{activeItem.vicinity} • {activeItem.parentLocation}</div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
            {/* Basic Monthly Check */}
            <div className="mb-4">
              <h4 className="font-semibold text-md mb-2 text-gray-700 border-b pb-1">Basic Monthly Check</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Pin Present</span>
                  <div className="flex gap-3">
                    <label className="flex items-center gap-1"><input type="radio" name="pinPresent" checked={checklist.pinPresent === 'pass'} onChange={()=>setChecklist(c=>({...c,pinPresent:'pass'}))} /><span className="text-xs text-green-600">Pass</span></label>
                    <label className="flex items-center gap-1"><input type="radio" name="pinPresent" checked={checklist.pinPresent === 'fail'} onChange={()=>setChecklist(c=>({...c,pinPresent:'fail'}))} /><span className="text-xs text-red-600">Fail</span></label>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Tamper Seal Intact</span>
                  <div className="flex gap-3">
                    <label className="flex items-center gap-1"><input type="radio" name="tamperSealIntact" checked={checklist.tamperSealIntact === 'pass'} onChange={()=>setChecklist(c=>({...c,tamperSealIntact:'pass'}))} /><span className="text-xs text-green-600">Pass</span></label>
                    <label className="flex items-center gap-1"><input type="radio" name="tamperSealIntact" checked={checklist.tamperSealIntact === 'fail'} onChange={()=>setChecklist(c=>({...c,tamperSealIntact:'fail'}))} /><span className="text-xs text-red-600">Fail</span></label>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Gauge Shows Correct Pressure</span>
                  <div className="flex gap-3">
                    <label className="flex items-center gap-1"><input type="radio" name="gaugeCorrectPressure" checked={checklist.gaugeCorrectPressure === 'pass'} onChange={()=>setChecklist(c=>({...c,gaugeCorrectPressure:'pass'}))} /><span className="text-xs text-green-600">Pass</span></label>
                    <label className="flex items-center gap-1"><input type="radio" name="gaugeCorrectPressure" checked={checklist.gaugeCorrectPressure === 'fail'} onChange={()=>setChecklist(c=>({...c,gaugeCorrectPressure:'fail'}))} /><span className="text-xs text-red-600">Fail</span></label>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Weight feels correct</span>
                  <div className="flex gap-3">
                    <label className="flex items-center gap-1"><input type="radio" name="weightCorrect" checked={checklist.weightCorrect === 'pass'} onChange={()=>setChecklist(c=>({...c,weightCorrect:'pass'}))} /><span className="text-xs text-green-600">Pass</span></label>
                    <label className="flex items-center gap-1"><input type="radio" name="weightCorrect" checked={checklist.weightCorrect === 'fail'} onChange={()=>setChecklist(c=>({...c,weightCorrect:'fail'}))} /><span className="text-xs text-red-600">Fail</span></label>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">No Visible Damage, Corrosion, or Leakage</span>
                  <div className="flex gap-3">
                    <label className="flex items-center gap-1"><input type="radio" name="noDamage" checked={checklist.noDamage === 'pass'} onChange={()=>setChecklist(c=>({...c,noDamage:'pass'}))} /><span className="text-xs text-green-600">Pass</span></label>
                    <label className="flex items-center gap-1"><input type="radio" name="noDamage" checked={checklist.noDamage === 'fail'} onChange={()=>setChecklist(c=>({...c,noDamage:'fail'}))} /><span className="text-xs text-red-600">Fail</span></label>
                  </div>
                </div>
              </div>
            </div>

            {/* Location & Accessibility */}
            <div className="mb-4">
              <h4 className="font-semibold text-md mb-2 text-gray-700 border-b pb-1">Location & Accessibility</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Extinguisher in designated location</span>
                  <div className="flex gap-3">
                    <label className="flex items-center gap-1"><input type="radio" name="inDesignatedLocation" checked={checklist.inDesignatedLocation === 'pass'} onChange={()=>setChecklist(c=>({...c,inDesignatedLocation:'pass'}))} /><span className="text-xs text-green-600">Pass</span></label>
                    <label className="flex items-center gap-1"><input type="radio" name="inDesignatedLocation" checked={checklist.inDesignatedLocation === 'fail'} onChange={()=>setChecklist(c=>({...c,inDesignatedLocation:'fail'}))} /><span className="text-xs text-red-600">Fail</span></label>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Clearly Visible with no Obstructions</span>
                  <div className="flex gap-3">
                    <label className="flex items-center gap-1"><input type="radio" name="clearlyVisible" checked={checklist.clearlyVisible === 'pass'} onChange={()=>setChecklist(c=>({...c,clearlyVisible:'pass'}))} /><span className="text-xs text-green-600">Pass</span></label>
                    <label className="flex items-center gap-1"><input type="radio" name="clearlyVisible" checked={checklist.clearlyVisible === 'fail'} onChange={()=>setChecklist(c=>({...c,clearlyVisible:'fail'}))} /><span className="text-xs text-red-600">Fail</span></label>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Nearest extinguisher not over 75ft away</span>
                  <div className="flex gap-3">
                    <label className="flex items-center gap-1"><input type="radio" name="nearestUnder75ft" checked={checklist.nearestUnder75ft === 'pass'} onChange={()=>setChecklist(c=>({...c,nearestUnder75ft:'pass'}))} /><span className="text-xs text-green-600">Pass</span></label>
                    <label className="flex items-center gap-1"><input type="radio" name="nearestUnder75ft" checked={checklist.nearestUnder75ft === 'fail'} onChange={()=>setChecklist(c=>({...c,nearestUnder75ft:'fail'}))} /><span className="text-xs text-red-600">Fail</span></label>
                  </div>
                </div>
              </div>
            </div>

            {/* Mounting & Height */}
            <div className="mb-4">
              <h4 className="font-semibold text-md mb-2 text-gray-700 border-b pb-1">Mounting & Height</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Top &lt;= 5ft (if &lt;= 40lb)</span>
                  <div className="flex gap-3">
                    <label className="flex items-center gap-1"><input type="radio" name="topUnder5ft" checked={checklist.topUnder5ft === 'pass'} onChange={()=>setChecklist(c=>({...c,topUnder5ft:'pass'}))} /><span className="text-xs text-green-600">Pass</span></label>
                    <label className="flex items-center gap-1"><input type="radio" name="topUnder5ft" checked={checklist.topUnder5ft === 'fail'} onChange={()=>setChecklist(c=>({...c,topUnder5ft:'fail'}))} /><span className="text-xs text-red-600">Fail</span></label>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Bottom &gt;= 4 inches from floor</span>
                  <div className="flex gap-3">
                    <label className="flex items-center gap-1"><input type="radio" name="bottomOver4in" checked={checklist.bottomOver4in === 'pass'} onChange={()=>setChecklist(c=>({...c,bottomOver4in:'pass'}))} /><span className="text-xs text-green-600">Pass</span></label>
                    <label className="flex items-center gap-1"><input type="radio" name="bottomOver4in" checked={checklist.bottomOver4in === 'fail'} onChange={()=>setChecklist(c=>({...c,bottomOver4in:'fail'}))} /><span className="text-xs text-red-600">Fail</span></label>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Mounted securely on hanger or in Cabinet</span>
                  <div className="flex gap-3">
                    <label className="flex items-center gap-1"><input type="radio" name="mountedSecurely" checked={checklist.mountedSecurely === 'pass'} onChange={()=>setChecklist(c=>({...c,mountedSecurely:'pass'}))} /><span className="text-xs text-green-600">Pass</span></label>
                    <label className="flex items-center gap-1"><input type="radio" name="mountedSecurely" checked={checklist.mountedSecurely === 'fail'} onChange={()=>setChecklist(c=>({...c,mountedSecurely:'fail'}))} /><span className="text-xs text-red-600">Fail</span></label>
                  </div>
                </div>
              </div>
            </div>

            {/* Administrative */}
            <div className="mb-4">
              <h4 className="font-semibold text-md mb-2 text-gray-700 border-b pb-1">Administrative</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Inspection date within 30 days of last</span>
                  <div className="flex gap-3">
                    <label className="flex items-center gap-1"><input type="radio" name="inspectionWithin30Days" checked={checklist.inspectionWithin30Days === 'pass'} onChange={()=>setChecklist(c=>({...c,inspectionWithin30Days:'pass'}))} /><span className="text-xs text-green-600">Pass</span></label>
                    <label className="flex items-center gap-1"><input type="radio" name="inspectionWithin30Days" checked={checklist.inspectionWithin30Days === 'fail'} onChange={()=>setChecklist(c=>({...c,inspectionWithin30Days:'fail'}))} /><span className="text-xs text-red-600">Fail</span></label>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Tag signed and dated</span>
                  <div className="flex gap-3">
                    <label className="flex items-center gap-1"><input type="radio" name="tagSignedDated" checked={checklist.tagSignedDated === 'pass'} onChange={()=>setChecklist(c=>({...c,tagSignedDated:'pass'}))} /><span className="text-xs text-green-600">Pass</span></label>
                    <label className="flex items-center gap-1"><input type="radio" name="tagSignedDated" checked={checklist.tagSignedDated === 'fail'} onChange={()=>setChecklist(c=>({...c,tagSignedDated:'fail'}))} /><span className="text-xs text-red-600">Fail</span></label>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes & Photos */}
            <div className="mb-4">
              <h4 className="font-semibold text-md mb-2 text-gray-700 border-b pb-1">Notes & Photos</h4>
              <textarea className="w-full border rounded p-3 text-sm mb-3" rows={6} value={notes} onChange={(e)=>setNotes(e.target.value)} placeholder="Enter any additional notes or observations about the extinguisher or its location..." />
              <div className="flex items-center gap-3">
                <label className="px-3 py-2 border rounded cursor-pointer bg-slate-50">
                  <span>Add Photo</span>
                  <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e)=>{ const f=e.target.files?.[0]; if(f){ setPhotoFile(f); setPhotoPreview(URL.createObjectURL(f)); } }} />
                </label>
                {photoPreview && (<img src={photoPreview} alt="Selected" className="h-16 w-16 object-cover rounded border" />)}
                {photoPreview && (<button className="text-sm text-red-600" onClick={()=>{ setPhotoFile(null); setPhotoPreview(''); }}>Remove</button>)}
              </div>
              <div className="flex items-center gap-3 mt-3">
                <button
                  type="button"
                  className="px-3 py-2 border rounded bg-slate-50"
                  onClick={() => {
                    if (!('geolocation' in navigator)) { alert('Geolocation not supported on this device/browser.'); return; }
                    setGpsLoading(true);
                    navigator.geolocation.getCurrentPosition(
                      (pos) => {
                        const { latitude: lat, longitude: lng, accuracy, altitude, altitudeAccuracy } = pos.coords;
                        setGps({ lat, lng, accuracy, altitude, altitudeAccuracy, capturedAt: new Date().toISOString() });
                        setGpsLoading(false);
                      },
                      (err) => {
                        console.warn('GPS error:', err);
                        alert('Unable to get GPS location. Please ensure location services are enabled.');
                        setGpsLoading(false);
                      },
                      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
                    );
                  }}
                >{gpsLoading ? 'Capturing…' : 'Capture GPS'}</button>
                {gps && (
                  <div className="text-sm text-gray-700 flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded bg-slate-100">
                        {gps.lat.toFixed(6)}, {gps.lng.toFixed(6)} (±{Math.round(gps.accuracy)}m)
                      </span>
                      {gps.altitude !== null && gps.altitude !== undefined && (
                        <span className="px-2 py-1 rounded bg-blue-100 text-blue-800">
                          Alt: {Math.round(gps.altitude)}m {gps.altitudeAccuracy ? `(±${Math.round(gps.altitudeAccuracy)}m)` : ''}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <a className="text-blue-600 underline" href={`https://maps.google.com/?q=${gps.lat},${gps.lng}`} target="_blank" rel="noreferrer">Open in Maps</a>
                      <button className="text-red-600" onClick={()=>setGps(null)}>Clear</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            </div>

            <div className="p-4 border-t bg-gray-50 flex flex-wrap gap-2 justify-end">
              <button onClick={() => { onEdit?.(activeItem); }} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Edit</button>
              <button onClick={() => {
                const inspectionData = { checklistData: checklist, notes, photo: photoFile || null, gps: gps || null };
                onSaveNotes?.(activeItem, checklistSummary(), inspectionData);
              }} className="px-4 py-2 rounded bg-slate-200 hover:bg-slate-300">Save Notes</button>
              <button onClick={() => saveInspection('fail')} className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700">Fail</button>
              <button onClick={() => saveInspection('pass')} className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">Pass</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
