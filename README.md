# Fire Extinguisher Tracker

A comprehensive web application for managing and tracking fire extinguisher inspections. Built with React and Firebase, this tool streamlines the monthly inspection workflow with barcode scanning, GPS location tracking, photo management, detailed checklists, multi-month workspace support, and time tracking capabilities.

## Overview

The Fire Extinguisher Tracker is a full-featured inspection management system that enables hospital maintenance staff to efficiently conduct monthly fire extinguisher inspections across multiple hospital sections. The application provides user authentication, cloud data storage, comprehensive inspection checklists, photo and GPS capture, historical tracking, multi-month workspace management, and powerful reporting capabilities for compliance and maintenance workflows.

## Key Features

### 🔐 User Authentication & Cloud Storage
- **Firebase Authentication**: Secure user login with email/password
- **Cloud Firestore Database**: Real-time data synchronization across devices
- **User-specific data**: Each user has their own isolated dataset
- **Firebase Storage**: Cloud storage for inspection photos (up to 5 per asset)
- **Real-time updates**: Changes sync instantly across all sessions

### 📅 Multi-Month Workspace System
- **Separate inspection cycles**: Each month is its own workspace with independent data
- **Quick workspace switching**: Long-press the month badge in header to switch months
- **Create new inspection months**: Start fresh cycles with one click
- **Copy extinguisher lists**: Option to copy asset list from previous month (all reset to pending)
- **Workspace archiving**: Archive completed months with full inspection logs
- **Automatic migration**: Legacy data automatically migrates to workspace system
- **Per-workspace time tracking**: Timer data scoped to each inspection month
- **Visual month badge**: Always shows current inspection month in header

### 📋 Advanced Inspection Management
- **Detailed 13-point checklist** covering all NFPA compliance requirements:
  - Pin present
  - Tamper seal intact
  - Gauge shows correct pressure
  - Correct weight
  - No physical damage
  - In designated location
  - Clearly visible
  - Nearest extinguisher under 75ft
  - Top under 5ft from floor
  - Bottom over 4 inches from floor
  - Mounted securely
  - Last inspection within 30 days
  - Tag signed and dated
- **Pass/Fail workflow** with individual checklist item tracking
- **Photo capture** during inspection (with camera integration)
- **GPS location tracking** for precise asset positioning
- **Inspection notes** with automatic failed-items summary
- **Complete inspection history** with timestamps, inspector info, and checklist data
- **Status reset capability** for re-inspection workflows

### 📸 Photo Management System
- **Up to 5 photos per asset** with cloud storage
- **Main photo designation**: Set primary photo for each asset
- **Thumbnail gallery** with full-size preview
- **Add/delete photos** individually
- **Inspection photos**: Capture photo during each inspection
- **Photo timestamps**: Automatic upload date tracking
- **Hard delete**: Photos are permanently removed from storage when deleted

### 📍 GPS Location Tracking
- **Capture GPS coordinates** for assets and inspections
- **Accuracy tracking**: Shows GPS precision (plus/minus meters)
- **Google Maps integration**: "Open in Maps" links for navigation
- **Asset location**: Store permanent GPS coordinates for each asset
- **Inspection location**: Track where each inspection was performed
- **Manual GPS capture**: Button-triggered location recording with high accuracy

### 🏥 Section-Based Organization
- Organize extinguishers by hospital sections:
  - Main Hospital
  - Building A, B, C, D
  - WMC (Women's Medical Center)
  - Employee Parking
  - Visitor Parking
  - FED (Front Entrance Drive)
- **Section filtering** to focus work on specific areas
- **"All Sections" view** for searching across entire inventory
- **Per-section statistics**: Pending, passed, and failed counts
- **Smart sorting**: Automatic organization by floor and room number for efficient walking routes
- **Section notes**: Add persistent notes per section (stored in Firestore)

### ⏱️ Time Tracking System
- **Per-section timers** with start/pause/stop controls
- **Real-time display** showing hours, minutes, and seconds
- **Persistent storage**: Timer data saved per workspace
- **Section time summary** modal with complete breakdown
- **Export time data** to Excel with calculated metrics
- **Clear individual or all times**: Easy reset for new inspection cycles
- **Workspace-scoped**: Each inspection month has its own time tracking data

### 📱 Dual Barcode Scanning
- **Camera-based scanning**: Uses device camera with BarcodeDetector API
- **Manual entry mode**: Keyboard input for handheld scanners or manual lookup
- **Multi-format support**: Code 128, QR codes, Data Matrix, and more
- **Instant asset lookup**: Immediate navigation to scanned extinguisher
- **Search by Asset ID or Serial Number**: Flexible matching
- **Real-time feedback**: Visual and audio confirmation of successful scans

### 🧮 Embedded Calculator
- **External calculator integration**: Embed your fire extinguisher calculator app via iframe
- **Configurable URL**: Set `VITE_CALCULATOR_URL` in environment variables
- **Quick access**: Calculator button in header for easy access
- **Open in new tab**: Option to open calculator in separate window
- **Seamless integration**: Works within the app interface

### 📊 Comprehensive Data Management
- **Excel/CSV Import**: Bulk upload with automatic section assignment
- **Section-specific imports**: Assign all imported items to a chosen section
- **Export options**:
  - **All data**: Complete inventory with full checklist details
  - **Passed items only**: Compliance reporting
  - **Failed items only**: Maintenance work orders
  - **Time tracking report**: Labor hours by section with item counts
- **Checklist data in exports**: Full pass/fail status for each inspection point
- **Database backup (JSON)**: Full export/import of all collections
- **Database export (CSV)**: Importer-friendly format for data migration

### 🔄 Monthly Inspection Cycle Management
- **Multi-month workspaces**: Maintain separate data for each inspection month
- **Create new months**: Start fresh with optional copy from previous month
- **Archive completed months**: Save inspection results and remove from active list
- **Historical logging**: All archived months saved to inspection logs
- **Inspection history preservation**: All past inspections remain accessible per asset
- **Workspace switching**: Easily navigate between active inspection months

### 🎯 Smart Filtering & Sorting
- **Real-time search**: Filter by Asset ID, Serial Number, Vicinity, or Location
- **Section view modes**: Toggle between "Unchecked" and "Checked" items per section
- **Persistent view preferences**: View mode saved per section
- **Walking-order sorting**: Automatic organization by:
  - Floor level (basement to top floor)
  - Room numbers (numerical order)
  - Vicinity name (alphabetical)
- **Status filtering**: View pending, passed, or failed items

### 👨‍💼 Admin Mode
- **Protected database operations**: Toggle admin mode for sensitive actions
- **Import controls**: Restrict bulk data imports to admins
- **Add new assets**: Create individual fire extinguisher records
- **Edit asset details**: Modify Asset ID, Serial, Location, Section, GPS
- **Delete extinguishers**: Remove obsolete or duplicate assets
- **Clear all data**: Nuclear option for complete database reset (with confirmation)

### 📈 Real-Time Dashboard
- **Global statistics**: Total pending, passed, failed, and completion percentage
- **Per-section breakdowns**: Individual statistics for each hospital area
- **Visual progress tracking**: Color-coded status indicators
- **Time tracking display**: Active timer and accumulated time per section
- **Completion percentage**: Automatic calculation of inspection progress
- **Workspace indicator**: Current inspection month always visible

### 💾 Data Persistence
- **Firebase Firestore**: Primary cloud database storage
- **Real-time sync**: Automatic data synchronization via onSnapshot listeners
- **User isolation**: Data scoped by Firebase user ID
- **Workspace isolation**: Data scoped by workspace/month
- **Session state**: UI preferences saved to localStorage
- **Offline support**: Local timer data with cloud sync capability

### 🌐 Marketing Website
- **Landing page**: Public homepage with feature highlights
- **Features page**: Detailed feature descriptions
- **Pricing page**: Plan information and pricing details
- **About page**: Company and developer information
- **Terms of Service**: Legal terms and conditions
- **Privacy Policy**: Data handling and privacy information
- **Google AdSense integration**: Monetization on public pages

## Technology Stack

- **Frontend Framework**: React 18 with React Router
- **Build Tool**: Vite (with Hot Module Replacement)
- **Styling**: Tailwind CSS with responsive design
- **Icons**: Lucide React icon library
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Data Processing**: XLSX (SheetJS) for Excel/CSV import/export
- **State Management**: React hooks with Firestore real-time listeners
- **Barcode Scanning**: Native BarcodeDetector API with polyfill fallback
- **Geolocation**: Native browser Geolocation API with high accuracy mode
- **Advertising**: Google AdSense for marketing pages

## Data Structure

### Workspace Record
```javascript
{
  id: "firestore-document-id",
  userId: "firebase-user-uid",
  label: "Dec '24",
  monthYear: "2024-12",
  status: "active" | "archived",
  createdAt: "2024-12-01T00:00:00Z",
  archivedAt: null | "2025-01-01T00:00:00Z"
}
```

### Fire Extinguisher Record
```javascript
{
  id: "firestore-document-id",
  assetId: "FE-12345",
  serial: "SN789456",
  vicinity: "Near elevator bank",
  parentLocation: "2nd Floor East Wing",
  section: "Main Hospital",
  status: "pending" | "pass" | "fail",
  checkedDate: "2025-10-10T14:30:00Z",
  notes: "Pressure gauge in green zone",
  userId: "firebase-user-uid",
  workspaceId: "workspace-document-id",
  createdAt: "2025-10-01T08:00:00Z",

  // Photo management (up to 5 photos)
  photos: [
    {
      url: "https://firebase-storage-url/photo1.jpg",
      uploadedAt: "2025-10-15T10:30:00Z",
      path: "assets/FE-12345/1729000000_photo.jpg"
    }
  ],

  // GPS location
  location: {
    lat: 33.4484,
    lng: -84.3880,
    accuracy: 15,
    capturedAt: "2025-10-15T10:30:00Z"
  },

  // Latest inspection photo and GPS
  lastInspectionPhotoUrl: "https://firebase-storage-url/inspection.jpg",
  lastInspectionGps: {
    lat: 33.4484,
    lng: -84.3880,
    accuracy: 10,
    capturedAt: "2025-10-21T14:30:00Z"
  },

  // Detailed checklist data
  checklistData: {
    pinPresent: "pass" | "fail" | "n/a",
    tamperSealIntact: "pass" | "fail" | "n/a",
    gaugeCorrectPressure: "pass" | "fail" | "n/a",
    weightCorrect: "pass" | "fail" | "n/a",
    noDamage: "pass" | "fail" | "n/a",
    inDesignatedLocation: "pass" | "fail" | "n/a",
    clearlyVisible: "pass" | "fail" | "n/a",
    nearestUnder75ft: "pass" | "fail" | "n/a",
    topUnder5ft: "pass" | "fail" | "n/a",
    bottomOver4in: "pass" | "fail" | "n/a",
    mountedSecurely: "pass" | "fail" | "n/a",
    inspectionWithin30Days: "pass" | "fail" | "n/a",
    tagSignedDated: "pass" | "fail" | "n/a"
  },

  // Complete inspection history
  inspectionHistory: [
    {
      date: "2025-09-21T10:15:00Z",
      status: "pass",
      notes: "All checks normal",
      inspector: "user@example.com",
      checklistData: { /* full checklist */ },
      photoUrl: "https://firebase-storage-url/inspection.jpg",
      gps: { lat: 33.4484, lng: -84.3880, accuracy: 12 }
    }
  ],

  lastMonthlyReset: "2025-10-01T00:00:00Z"
}
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Firebase account (free tier works fine)

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd Fire_Extinguisher_Tracker
```

2. Install dependencies:
```bash
npm install
```

3. **Configure Firebase** (required):
   - Create a Firebase project at https://console.firebase.google.com
   - Enable **Authentication** (Email/Password provider)
   - Enable **Firestore Database** (start in test mode, then configure security rules)
   - Enable **Storage** (for photo uploads)
   - Copy your Firebase config to `src/firebase.js`:
   ```javascript
   import { initializeApp } from 'firebase/app';
   import { getAuth } from 'firebase/auth';
   import { getFirestore } from 'firebase/firestore';
   import { getStorage } from 'firebase/storage';

   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };

   const app = initializeApp(firebaseConfig);
   export const auth = getAuth(app);
   export const db = getFirestore(app);
   export const storage = getStorage(app);
   ```

4. **Configure Environment Variables** (optional):
   Create a `.env.local` file:
   ```bash
   # External calculator app URL (optional)
   VITE_CALCULATOR_URL=https://your-calc-app.web.app

   # Google AdSense Publisher ID (optional, for marketing pages)
   VITE_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXX
   ```

5. **Configure Firestore Security Rules**:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /extinguishers/{docId} {
         allow read, write: if request.auth != null &&
                            request.resource.data.userId == request.auth.uid;
       }
       match /workspaces/{docId} {
         allow read, write: if request.auth != null &&
                            request.resource.data.userId == request.auth.uid;
       }
       match /sectionNotes/{docId} {
         allow read, write: if request.auth != null &&
                            request.resource.data.userId == request.auth.uid;
       }
       match /inspectionLogs/{docId} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

6. **Configure Storage Security Rules**:
   ```javascript
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /assets/{userId}/{allPaths=**} {
         allow read, write: if request.auth != null;
       }
       match /inspections/{userId}/{allPaths=**} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

7. Start development server:
```bash
npm run dev
```

8. Open your browser to `http://localhost:5173`

9. **Create user account**: Use the login screen to register a new account

## Usage

### First-Time Setup

1. **Login/Register**: Create an account or login with existing credentials
2. **Automatic Workspace Creation**: Your first workspace is created automatically
3. **Enable Admin Mode**: Click the settings icon to toggle admin mode
4. **Import Initial Data**: Click menu -> "Import Data File (By Section)"
5. **Select Section**: Choose which hospital section the data belongs to
6. **Upload File**: Select your Excel/CSV file with asset data

### Managing Inspection Months (Workspaces)

1. **View Current Month**: The month badge in the header shows your active workspace
2. **Switch Months**: Long-press (hold 0.5s) the month badge to open workspace switcher
3. **Create New Month**: Menu -> "New Inspection Month" or from workspace switcher
4. **Copy Assets**: When creating a new month, optionally copy asset list from previous month
5. **Archive Completed Months**: From workspace switcher, archive finished inspection cycles

### Starting a Monthly Inspection Cycle

1. **Select Section**: Click on the hospital section you want to inspect
2. **Start Timer**: Click "Start Timer" to begin tracking inspection time
3. **View Unchecked Items**: Default view shows pending inspections

### Conducting Detailed Inspections

1. **Find Extinguisher**: Use one of three methods:
   - Click **"Camera Scan"** to scan barcode with device camera
   - Click **"Manual Entry"** to type or use handheld scanner
   - Use the **search bar** to filter by Asset ID, Serial, or Location

2. **Open Inspection Modal**: Click on extinguisher card or scan to open

3. **Review Details**: Verify Asset ID, Serial, Location, Section

4. **Add Photos** (optional):
   - Click "Add Photo" to capture up to 5 photos
   - First photo becomes the main photo
   - Hover over photos to set as main or delete

5. **Capture GPS** (optional):
   - Click "Capture GPS" for precise location coordinates
   - View accuracy rating (plus/minus meters)
   - Click "Open in Maps" to verify location

6. **Complete 13-Point Checklist**:
   - Mark each item as Pass, Fail, or N/A
   - All items default to "Pass" for efficiency
   - Failed items automatically added to notes

7. **Add Notes** (optional):
   - Enter specific observations or issues
   - Notes combine with failed checklist items

8. **Capture Inspection Photo** (optional):
   - Take photo during inspection for compliance proof

9. **Mark Status**: Click **"PASS"** or **"FAIL"**
   - Checklist data, photo, GPS, and notes all saved together

### Section Progress Tracking

1. **Monitor Progress**: Watch real-time statistics update
   - Pending count decreases as inspections complete
   - Completion percentage increases
   - Timer shows accumulated time

2. **Pause/Resume Timer**: Use pause button for breaks
3. **Switch Views**: Toggle between "Unchecked" and "Checked" items
4. **View Checked Items**: Review completed inspections
5. **Section Notes**: Add notes for the section (persists across sessions)

### Managing Assets

1. **Edit Asset Details**:
   - Open asset inspection modal
   - Click "Edit Extinguisher Details"
   - Update Asset ID, Serial, Location, Section, GPS, or Photos
   - Click "Save Changes"

2. **Delete Asset** (admin only):
   - Open edit modal
   - Click "Delete" button
   - Confirm deletion

3. **Add New Asset** (admin only):
   - Enable admin mode
   - Click menu -> "Add New Fire Extinguisher"
   - Fill in Asset ID (required), Serial, Vicinity, Parent Location
   - Select Section
   - Optionally add photo and GPS
   - Click "Add Fire Extinguisher"

### Using the Calculator

1. **Open Calculator**: Click the calculator button in the header
2. **Configure URL**: Set `VITE_CALCULATOR_URL` in your environment variables
3. **Embedded View**: Calculator displays within the app via iframe
4. **New Tab Option**: Click "Open in new tab" for full-screen access

### Completing a Section

1. **Stop Timer**: Click "Stop Timer" when section is complete
2. **Review Failed Items**: Toggle to "Checked" view, filter by status
3. **Export Failed Items**: Menu -> "Export Failed Only" for work orders
4. **Move to Next Section**: Select another section tab

### End of Month Reporting

1. **View Time Tracking**: Click "View All Times" or menu -> time summary
2. **Export Reports**:
   - **Export All Data**: Complete inventory with checklist details
   - **Export Passed Only**: Compliance report
   - **Export Failed Only**: Maintenance work orders
   - **Export Time Data**: Labor hours by section

3. **Archive Current Month**:
   - Open workspace switcher (long-press month badge)
   - Click "Archive Current Month"
   - Inspection log saved automatically
   - Create new month for next cycle

### Database Backup (JSON)

- **Export full database**: Menu -> Admin -> "Export Database (JSON)"
  - Includes `extinguishers`, `sectionNotes`, and `inspectionLogs` collections
  - Saves a timestamped `.json` file as backup
- **Import backup**: Menu -> Admin -> "Import Database (JSON)"
  - Replaces current data with backup contents (confirms before proceeding)
  - Photos referenced by URLs remain in Firebase Storage

### Database Export (CSV)

- **Export importer-friendly CSV**: Menu -> Admin -> "Export Database (CSV)"
  - Columns: Asset ID, Serial, Vicinity, Parent Location, Section
  - This CSV can be imported directly using "Import Data File"

## Development

### Available Commands

- `npm run dev` - Start Vite development server with React Fast Refresh
- `npm run build` - Create production build in `dist/` directory
- `npm run preview` - Serve the built `dist/` locally for verification
- `npm run lint` - Run ESLint across source files (zero warnings policy)

### Code Organization

```
src/
├── App.jsx                     # Main application component and business logic
├── main.jsx                    # React entry point
├── Router.jsx                  # Route definitions (marketing + app)
├── index.css                   # Tailwind CSS configuration
├── firebase.js                 # Firebase configuration (Auth, Firestore, Storage)
├── Login.jsx                   # Authentication UI component
├── components/
│   ├── BarcodeScanner.jsx      # Camera-based barcode scanning
│   ├── SectionGrid.jsx         # Section overview grid (home page)
│   ├── SectionDetail.jsx       # Section detail view with checklist modal
│   ├── ExtinguisherDetailView.jsx  # Individual asset detail view
│   ├── Calculator.jsx          # External calculator iframe wrapper
│   └── AdSense.jsx             # Google AdSense ad component
└── pages/
    ├── LandingPage.jsx         # Public homepage
    ├── FeaturesPage.jsx        # Feature descriptions
    ├── PricingPage.jsx         # Pricing information
    ├── AboutPage.jsx           # About page
    ├── TermsPage.jsx           # Terms of service
    └── PrivacyPage.jsx         # Privacy policy
```

### Firebase Collections

- **`extinguishers`** - Fire extinguisher assets (scoped by `userId` and `workspaceId`)
- **`workspaces`** - Inspection month/cycle definitions (scoped by `userId`)
- **`sectionNotes`** - Per-section notes (scoped by `userId`)
- **`inspectionLogs`** - Archived monthly inspection cycle snapshots

### localStorage Keys

- `currentWorkspace_{userId}` - Currently selected workspace ID
- `sessionState_{userId}` - Current filters and UI state per user
- `sectionTimes_{userId}_{workspaceId}` - Time tracking data per workspace
- `sectionView_{section}` - View mode preference per section (unchecked/checked)
- `inspectionLogs_{userId}` - Fallback storage for inspection logs

### Photo Storage Structure

```
firebase-storage/
├── assets/
│   └── {assetId}/
│       └── {timestamp}_{filename}.jpg    (up to 5 photos per asset)
└── inspections/
    └── {assetId}/
        └── {timestamp}_{filename}.jpg    (one photo per inspection)
```

## Browser Compatibility

- **Chrome/Edge (recommended)**: Full support including BarcodeDetector API
- **Firefox**: Full support with BarcodeDetector polyfill
- **Safari**: Full support with BarcodeDetector polyfill
- **Mobile browsers**: Responsive design, full functionality
- **iOS Safari/Chrome**: Camera access for barcode scanning and photo capture
- **Android Chrome**: Native BarcodeDetector API support

## Feature Highlights

### What Makes This App Special

1. **Multi-Month Workspaces**: Maintain separate inspection cycles with easy switching
2. **Complete Offline Capability**: Timer data stored locally; works when internet drops
3. **13-Point NFPA Compliance Checklist**: Automated compliance tracking for fire code
4. **Smart Walking Routes**: Automatic sorting by floor and room number
5. **Photo Management**: Up to 5 reference photos per asset plus inspection photos
6. **GPS Precision**: Track exact asset locations with accuracy ratings
7. **Firebase Real-time Sync**: Changes instantly appear across all logged-in devices
8. **Monthly Audit Trail**: Complete historical logging of inspection cycles
9. **Dual Scanning Modes**: Both camera-based and handheld scanner support
10. **Time Tracking**: Accurate labor reporting by hospital section
11. **Admin Safeguards**: Protected controls prevent accidental data loss
12. **Embedded Calculator**: Quick access to external calculation tools

### Mobile-First Design

- Fully responsive interface works on phones, tablets, and desktops
- Touch-optimized buttons and controls
- Long-press gestures for quick workspace switching
- Camera integration for photo capture and barcode scanning
- GPS location services for asset mapping
- Works great on hospital Wi-Fi or cellular data

### Security Features

- Firebase Authentication with email/password
- User-scoped data (users only see their own data)
- Workspace-scoped data isolation
- Firestore security rules enforce user isolation
- Storage security rules protect uploaded photos
- Admin mode toggle for sensitive operations

### Performance

- React 18 with Fast Refresh for instant development updates
- Vite build system for lightning-fast builds
- Real-time Firestore listeners for instant data sync
- Optimized photo thumbnails and lazy loading
- Efficient filtering and sorting algorithms

## Troubleshooting

### Camera Scanner Not Working
- **Check browser permissions**: Allow camera access when prompted
- **Use HTTPS**: Camera API requires secure connection (or localhost)
- **Try different browser**: Chrome/Edge have best support
- **Check lighting**: Ensure barcode is well-lit and in focus

### GPS Location Issues
- **Enable location services**: Check device settings
- **Allow browser permission**: Grant location access when prompted
- **Wait for high accuracy**: GPS may take 5-10 seconds to achieve best accuracy
- **Move to open area**: GPS works best with clear view of sky

### Data Not Syncing
- **Check internet connection**: Firestore requires connectivity
- **Verify Firebase config**: Ensure `src/firebase.js` is properly configured
- **Check console for errors**: Open browser DevTools for detailed error messages
- **Verify Firestore rules**: Ensure security rules allow authenticated access

### Photos Not Uploading
- **Check Storage rules**: Verify Firebase Storage security rules
- **Verify file size**: Large photos may take time to upload
- **Check internet speed**: Slow connections may timeout
- **Try smaller photos**: Compress images if necessary

### Import Failing
- **Check file format**: Only CSV, XLS, and XLSX supported
- **Verify column names**: Should include "Asset ID", "Serial", "Vicinity", "Parent Location"
- **Check for special characters**: Some characters may cause parsing issues
- **Try smaller batches**: Import in chunks if file is very large

### Workspace Issues
- **Missing workspaces**: Legacy data auto-migrates on first login
- **Can't switch months**: Long-press the month badge for 0.5 seconds
- **Lost data**: Check you're viewing the correct workspace/month

## Roadmap

Future enhancements under consideration:

- [ ] Offline mode with background sync when connection returns
- [ ] Scheduled notifications for upcoming inspections
- [ ] Barcode printing integration for new assets
- [ ] Advanced analytics and trend reporting
- [ ] Multi-user collaboration features
- [ ] Mobile app versions (iOS/Android)
- [ ] QR code generation for quick asset access
- [ ] Integration with work order systems
- [ ] Automated monthly report email distribution
- [ ] Custom checklist templates per building/section

## License

Copyright 2025 David Beck (built_by_Beck). All rights reserved.

This software is proprietary and confidential. See LICENSE file for details.

## Developer

**David Beck** (built_by_Beck)
Life Safety Technician

For questions, support, or licensing inquiries, please contact the developer.

---

Built with React + Vite + Firebase | Cloud-First with Offline Support
