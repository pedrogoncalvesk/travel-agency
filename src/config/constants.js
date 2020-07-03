/**
 * App constants
 */
export default {
  // KEYS
  // key to storage token
  TOKEN_KEY: "sessionToken",
  INVALID_TOKEN: "JWT - Invalid token",
  TIMEOUT: "Timeout in request race",
  STORAGE_PREFIX_KEY: "app-",
  DATETIME_FORMAT: {
    DEFAULT: "YYYY-MM-DD HH:mm:ss",
    "pt-BR": "DD/MM/YYYY [às] HH:mm:ss",
  },
  // keys for routes navigation
  ROUTES: {
    APP: "App",
    AUTH: "Auth",
    LOGOUT: "Logout",
    LOGIN: "Login",
    REGISTER: "Register",
    REGISTER_ROUTES: {
      INVITE: "Invite",
      FORM: "Form",
      VERIFICATION: "Verification",
    },
    HOME: "Home",
    ABOUT: "About",
    HOME_STACK: "HomeStack",
    PHOTO: "Photo",
    PHOTO_ROUTES: {
      MAP: "PhotoMap",
      CAMERA: "PhotoCamera",
      GALLERY: "PhotoGallery",
    },
    MONITORING: "Monitoring",
    MONITORING_ROUTES: {
      MAP: "MonitoringMap",
    },
  },
  ENTITY: {
    PICTURES: "pictures",
  },
  // URLS
  // base url to api requests
  // eslint-disable-next-line no-undef
  // BASE_URL: env.apiUrl,
  // urls to api requests
  API: {
    LOGIN: "auth/login",
    VALIDATE: "auth/validate",
  },
};
