# Automatic Role Detection System

## Overview
The login and registration system has been updated to automatically detect user roles based on email address patterns instead of requiring users to manually select their role during signup.

## Changes Made

### 1. Email Pattern-Based Role Detection
- **Location**: `src/utils/api.ts`
- **Function**: `determineUserRole(email: string): UserRole`

#### Role Detection Rules:
- **Admin Role**: 
  - Emails containing `admin@`
  - Emails containing `support@homehelper.com`
  - Emails starting with `admin.`

- **Provider Role**:
  - Emails containing `@homehelper.com`
  - Emails containing `@services.com`
  - Emails containing `@fixit.com`
  - Emails containing `provider@`
  - Emails containing `.provider@`, `.cleaner@`, `.plumber@`, `.electrician@`, `.painter@`, `.carpenter@`, `.gardener@`

- **User Role** (Default):
  - All other email patterns (gmail.com, yahoo.com, etc.)

### 2. Updated Demo Users
- **Location**: `src/utils/api.ts`
- **Changes**: Expanded demo user list with realistic email patterns for each role type
- **Examples**:
  - Regular users: `john.doe@gmail.com`, `jane.smith@yahoo.com`
  - Providers: `alex.provider@homehelper.com`, `maria.cleaner@services.com`
  - Admins: `admin@homehelper.com`, `support@homehelper.com`

### 3. Login Page Updates
- **Location**: `src/pages/public/Login.tsx`
- **Changes**:
  - Updated demo credential buttons to use new email patterns
  - Added tooltip information showing which emails map to which roles
  - Added informational text explaining automatic role detection

### 4. Registration Page Updates
- **Location**: `src/pages/public/Register.tsx`
- **Changes**:
  - Removed role selection dropdown/radio buttons
  - Added informational panel explaining email pattern detection
  - Updated form submission to not include role (determined automatically)
  - Added helpful text about account type detection

### 5. Type System Updates
- **Location**: `src/types/user.ts`
- **Changes**: Made `role` property optional in `RegisterData` interface since it's now determined automatically

### 6. Authentication Logic Updates
- **Location**: `src/utils/api.ts`
- **Changes**:
  - Updated `mockAuth.login()` to use `determineUserRole()` function
  - Updated `mockAuth.register()` to use `determineUserRole()` function
  - Both functions now automatically assign roles based on email patterns

## Benefits

1. **Simplified User Experience**: Users no longer need to select their role during registration
2. **Reduced Confusion**: Eliminates the possibility of users selecting the wrong role
3. **Automatic Organization**: Email patterns naturally organize users by their intended role
4. **Scalable**: Easy to add new email patterns for different organizations or service types

## Testing

### Demo Accounts Available:
- **Customer**: `john.doe@gmail.com` / `Demo123!`
- **Provider**: `alex.provider@homehelper.com` / `Demo123!`
- **Admin**: `admin@homehelper.com` / `Demo123!`

### Testing New Registrations:
1. Register with a regular email (e.g., `test@gmail.com`) → Should get User role
2. Register with a provider email (e.g., `john.plumber@services.com`) → Should get Provider role
3. Register with an admin email (e.g., `admin@homehelper.com`) → Should get Admin role

## Implementation Notes

- The role detection is case-insensitive
- The system defaults to User role if no patterns match
- Provider patterns are designed to catch common service provider email formats
- Admin patterns are restrictive to prevent accidental admin access
- All existing authentication flows remain unchanged except for role assignment

## Future Enhancements

1. **Database Integration**: When connecting to a real backend, implement similar logic server-side
2. **Email Verification**: Add email verification to ensure users own the email addresses they register with
3. **Organization Management**: Allow organizations to register their domains for automatic provider role assignment
4. **Role Override**: Add admin functionality to manually override automatically assigned roles if needed
