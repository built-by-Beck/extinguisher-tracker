# Firebase Project Setup Guide

This guide will help you configure this application to use your Firebase project.

## Step 1: Create/Select Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or select an existing one)
3. Enable the following services:
   - **Authentication** (Email/Password)
   - **Firestore Database**
   - **Storage**
   - **Cloud Functions** (requires Blaze plan)

## Step 2: Get Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to "Your apps" section
3. Click the web icon (`</>`) to add a web app
4. Register your app (you can name it "Fire Extinguisher Tracker")
5. Copy the Firebase configuration object

## Step 3: Update Firebase Configuration

### Option A: Using Environment Variables (Recommended)

1. Create a `.env` file in the root directory:
```bash
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

2. Update `src/firebase.js` to use environment variables (already configured if you use the template below)

### Option B: Direct Configuration

Update `src/firebase.js` with your Firebase config values directly.

## Step 4: Update Firebase Project Reference

1. Update `.firebaserc` with your project ID:
```json
{
  "projects": {
    "default": "your-project-id"
  }
}
```

2. Initialize Firebase in your project:
```bash
firebase login
firebase use default
```

## Step 5: Set Up Firestore

1. In Firebase Console, go to **Firestore Database**
2. Create database (start in test mode for development)
3. Update Firestore Security Rules (see `firestore.rules` file)
4. Create the following indexes if needed (Firebase will prompt you)

## Step 6: Set Up Authentication

1. In Firebase Console, go to **Authentication**
2. Enable **Email/Password** sign-in method
3. Save changes

## Step 7: Set Up Storage

1. In Firebase Console, go to **Storage**
2. Create storage bucket
3. Update Storage Security Rules (see `storage.rules` file)

## Step 8: Deploy Cloud Functions

1. Navigate to functions directory:
```bash
cd functions
npm install
cd ..
```

2. Deploy functions:
```bash
firebase deploy --only functions
```

## Step 9: Update Webhook URLs

After deploying functions, update any webhook URLs (like Stripe webhooks) with your new Firebase project's function URLs.

## Files to Update

- `src/firebase.js` - Firebase configuration
- `.firebaserc` - Firebase project ID
- `.env` - Environment variables (if using Option A)
- Any documentation that references the old project ID

## Security Rules

Make sure to set up proper Firestore and Storage security rules. Example rules are included in the codebase.



