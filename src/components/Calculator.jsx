import React from 'react';

// Simple wrapper that embeds the external calculator app via iframe.
// Configure the URL in your .env.local as VITE_CALCULATOR_URL.
export default function Calculator() {
  const calcUrl = import.meta.env.VITE_CALCULATOR_URL || '';

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-bold">Fire Extinguisher Calculator</h2>
        {calcUrl && (
          <a
            href={calcUrl}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:text-blue-700 underline text-sm"
          >
            Open in new tab
          </a>
        )}
      </div>
      {calcUrl ? (
        <div className="w-full" style={{ height: '80vh' }}>
          <iframe
            title="Extinguisher Calculator"
            src={calcUrl}
            className="w-full h-full"
            style={{ border: 0 }}
            allow="clipboard-write; camera; geolocation;"
          />
        </div>
      ) : (
        <div className="p-6 text-gray-700">
          <p className="mb-3">
            No calculator URL configured. To embed your separate Firebase-hosted
            calculator app, set an environment variable in <code>.env.local</code>:
          </p>
          <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">VITE_CALCULATOR_URL=https://your-calc-app.web.app</pre>
          <p className="mt-3 text-sm text-gray-600">
            After saving, restart the dev server and revisit this page.
          </p>
        </div>
      )}
    </div>
  );
}

