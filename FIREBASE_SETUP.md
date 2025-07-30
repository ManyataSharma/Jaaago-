# Firebase Authentication Setup for JAAAGO

## Overview
This document explains the Firebase authentication integration for the JAAAGO civic engagement platform, supporting three distinct user types with different authentication methods.

## Firebase Configuration

### Project Details
- **Project ID**: jaaago-1f065
- **Auth Domain**: jaaago-1f065.firebaseapp.com
- **Storage Bucket**: jaaago-1f065.firebasestorage.app

### Authentication Methods
The application supports **multiple authentication methods** based on user type:

1. **Citizens**: Phone Number + OTP Authentication
2. **Government Officials**: Email + Password Authentication
3. **Administrators**: Email + Password + Authorization Code

## Implementation Details

### 1. Firebase Configuration (`src/firebase/config.ts`)
```typescript
const firebaseConfig = {
  apiKey: "AIzaSyAp2o1_C_9KiriL2j4H7pJxVgwM4OEMumI",
  authDomain: "jaaago-1f065.firebaseapp.com",
  projectId: "jaaago-1f065",
  storageBucket: "jaaago-1f065.firebasestorage.app",
  messagingSenderId: "206624063038",
  appId: "1:206624063038:web:57b8f0be9de18c21a09b6f",
  measurementId: "G-FN26VJZ0JD"
};
```

### 2. Authentication Service (`src/firebase/auth.ts`)
- Handles phone number verification for citizens
- Manages reCAPTCHA integration
- Processes OTP confirmation

### 3. Auth Context (`src/context/AuthContext.tsx`)
- Manages authentication state for all user types
- Handles user registration and login for different user types
- Integrates with Firestore for user data storage
- Supports email/password and phone/OTP authentication

### 4. User-Specific Authentication Pages

#### Citizen Authentication (`src/pages/CitizenAuth.tsx`)
- Registration form with age verification (18+)
- Phone number input with OTP verification
- User data collection (name, address, location details)

#### Government Authentication (`src/pages/AuthorityAuth.tsx`)
- Email/password authentication
- Government ID verification
- Department and jurisdiction information
- Registration approval workflow

#### Admin Authentication (`src/pages/AdminAuth.tsx`)
- Email/password authentication
- Authorization code requirement
- System administration access

## User Types and Authentication Flows

### 1. Citizens (Phone + OTP)
**Registration Process:**
1. User fills out registration form
2. Age verification (must be 18+)
3. Phone number validation
4. reCAPTCHA verification
5. SMS OTP sent to phone
6. OTP verification
7. User data saved to Firestore
8. Redirect to Citizen Dashboard

**Login Process:**
1. User enters phone number
2. reCAPTCHA verification
3. SMS OTP sent to phone
4. OTP verification
5. User authenticated and redirected to dashboard

### 2. Government Officials (Email + Password)
**Registration Process:**
1. User fills out authority registration form
2. Government ID verification
3. Department and jurisdiction details
4. Email/password creation
5. Account created in Firebase Auth
6. User data saved to Firestore
7. Pending approval status
8. Redirect to Authority Dashboard

**Login Process:**
1. User enters email and password
2. Firebase email/password authentication
3. User authenticated and redirected to dashboard

### 3. Administrators (Email + Password + Code)
**Registration Process:**
1. User fills out admin registration form
2. Authorization code verification (ADMIN2024)
3. Email/password creation
4. Account created in Firebase Auth
5. User data saved to Firestore
6. Immediate admin access granted
7. Redirect to Admin Dashboard

**Login Process:**
1. User enters email and password
2. Firebase email/password authentication
3. User authenticated and redirected to dashboard

## Security Features

### reCAPTCHA Integration
- Invisible reCAPTCHA for citizen phone verification
- Prevents automated attacks
- Required for phone number verification

### Data Validation
- Age verification (18+ requirement for citizens)
- Phone number format validation
- Email format validation
- Password strength requirements
- Authorization code verification for admins

### Firestore Security
- User data stored securely in Firestore
- User documents linked to Firebase Auth UIDs
- Data structure includes user type and verification status
- Separate collections for different user types

## User Data Structure

```typescript
interface User {
  id: string;                    // Firebase Auth UID
  name: string;                  // Full name
  phone?: string;                // Phone number (citizens)
  email?: string;                // Email (authority/admin)
  address?: string;              // Full address (citizens)
  dob?: string;                  // Date of birth (citizens)
  pincode?: string;              // Postal code (citizens)
  state?: string;                // State (citizens)
  district?: string;             // District (citizens)
  govId?: string;                // Government ID (authority)
  department?: string;           // Department (authority)
  jurisdiction?: string;         // Jurisdiction (authority)
  verified: boolean;             // Verification status
  userType?: 'citizen' | 'authority' | 'partner' | 'admin';
}
```

## Dashboard Access

### Citizen Dashboard (`/citizen-dashboard`)
- Dashboard Home: Overview and welcome
- Report Issue: Submit civic issues
- Check Updates: Track issue status
- Community Wall: View community reports
- Blog & Awareness: Educational content
- Contact: Support and contact information

### Authority Dashboard (`/authority-dashboard`)
- Issue Management: Review and respond to citizen reports
- Department Overview: Manage department-specific issues
- Analytics: View reports and statistics
- Communication: Respond to citizens
- Settings: Update profile and preferences

### Admin Dashboard (`/admin-dashboard`)
- User Management: Manage all user accounts
- System Administration: Platform configuration
- Analytics: Comprehensive system analytics
- Authority Approval: Approve government official registrations
- System Monitoring: Monitor platform health

## Testing

### Development Testing
1. Start the development server: `npm run dev`
2. Test each user type:
   - **Citizens**: Navigate to `/citizen-auth`
   - **Government**: Navigate to `/authority-auth`
   - **Admin**: Navigate to `/admin-auth`
3. Test registration and login flows
4. Verify dashboard access for each user type

### Demo Credentials
- **Admin**: admin@jaaago.org / admin123
- **Admin Code**: ADMIN2024 (for registration)

### Production Considerations
- Ensure Firebase project is properly configured
- Set up proper security rules in Firestore
- Configure SMS provider settings for citizen OTP
- Set up proper domain verification for reCAPTCHA
- Implement proper authorization code management
- Set up email verification for authority accounts

## Troubleshooting

### Common Issues
1. **reCAPTCHA not loading**: Check domain configuration
2. **OTP not received**: Verify phone number format (+91XXXXXXXXXX)
3. **Authentication errors**: Check Firebase console for error logs
4. **Dashboard access denied**: Verify user data in Firestore
5. **Admin code invalid**: Verify authorization code is correct
6. **Email already in use**: Check if user already exists

### Firebase Console
- Monitor authentication attempts
- View user management
- Check Firestore data
- Review security rules
- Monitor SMS delivery for OTP

## Next Steps

1. **Email Verification**: Add email verification for authority accounts
2. **Password Recovery**: Implement password reset functionality
3. **Profile Management**: Allow users to update their information
4. **Two-Factor Authentication**: Add 2FA for admin accounts
5. **Audit Logging**: Implement comprehensive audit trails
6. **Role-Based Permissions**: Implement granular permissions system
7. **Bulk User Management**: Add tools for managing multiple users
8. **Integration APIs**: Add APIs for external system integration 