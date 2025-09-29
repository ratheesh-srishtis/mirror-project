// src/config/devConfig.js
// Development Configuration Helper

export const devConfig = {
  // Toggle this to enable/disable development mode features
  bypassAdminAuth: process.env.REACT_APP_BYPASS_ADMIN_AUTH === "true",
  isDevelopment: process.env.NODE_ENV === "development",

  // Helper method to check if dev mode is active
  isDevMode: function () {
    return this.isDevelopment && this.bypassAdminAuth;
  },

  // Helper method to log dev actions
  devLog: function (message, ...args) {
    if (this.isDevMode()) {
      console.log(`🔧 DEV MODE: ${message}`, ...args);
    }
  },
};

export default devConfig;
