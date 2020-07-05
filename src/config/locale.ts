/*
 * App config for locale
 */
import { locale } from "expo-localization";
import i18n from "i18n-js";

import { initialState } from "./sharedState";

export const locales = {
  en: require("../assets/locale/en.json"),
  "pt-BR": require("../assets/locale/pt-BR.json"),
};

i18n.fallbacks = true;
i18n.translations = { ...locales };
i18n.defaultLocale = initialState.locale;
i18n.locale = locale;

export default locale;
