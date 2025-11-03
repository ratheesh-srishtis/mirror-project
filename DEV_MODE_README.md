# Development Mode Configuration

## Admin Authentication Bypass

During development, you can bypass admin authentication to avoid logging in repeatedly.

### Quick Toggle

**Option 1: Environment Variable (Recommended)**

- Edit `.env.development` file
- Set `REACT_APP_BYPASS_ADMIN_AUTH=true` for bypass
- Set `REACT_APP_BYPASS_ADMIN_AUTH=false` to enable auth

**Option 2: Direct Config**

- Edit `src/config/devConfig.js`
- Modify the `bypassAdminAuth` property

### How it Works

- ✅ **Development Mode + Bypass Enabled**: Admin routes work without login
- ❌ **Production Mode**: Authentication always required
- 🔒 **Development Mode + Bypass Disabled**: Authentication required

### Visual Indicators

- Admin header shows `[DEV MODE]` when bypass is active
- Console logs show bypassed routes with 🔧 emoji

### Files Involved

- `.env.development` - Development environment variables
- `.env.production` - Production environment variables
- `src/config/devConfig.js` - Development configuration helper
- `src/config/PrivateRoute.js` - Authentication logic
- `src/admin/Layout/AdminHeader.js` - Visual dev mode indicator

### Security Note

This bypass **only works** in development mode (`NODE_ENV=development`). Production builds automatically disable this feature for security.
