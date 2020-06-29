import { locale } from "expo-localization";
import i18n from "i18n-js";

import locales from "./config/locales";

i18n.fallbacks = true;
i18n.translations = { ...locales };
i18n.locale = locale;

export default locale;
