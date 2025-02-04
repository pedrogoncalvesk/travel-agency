/**
 * App constants
 */
export default {
  // KEYS
  // key to storage token
  TIMEOUT: "Timeout in request race",
  STORAGE_PREFIX_KEY: "app-",
  DATETIME_FORMAT: {
    DEFAULT: "YYYY-MM-DD HH:mm:ss",
    "pt-BR": "DD/MM/YYYY [às] HH:mm:ss",
  },
  // keys for routes navigation
  ROUTES: {
    APP: "App",
    HOME: "Home",
    HOME_STACK: "HomeStack",
    TICKETS: "Tickets",
    CHECKOUT: "Checkout",
    ORDERS: "Orders",
    DISCOVER: "Discover",
  },
  // URLS
  // base url to api requests
  // eslint-disable-next-line no-undef
  BASE_URL: "https://producer-api-cloud.herokuapp.com/",
  BASE_URL_CONSUMER: "https://consumer-api-cloud.herokuapp.com/",
  // urls to api requests
  API: {
    PLACES: "listPlaces",
    INFORMATION: "moreInformation",
    QUOTES: "browseQuotes",
    CHECKOUT: "checkout",
    CHECK_STATUS: "statusTransaction",
  },
};
