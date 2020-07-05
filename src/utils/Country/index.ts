import C from "./Country";

export interface CountryType {
  name: string;
  iso2: string;
  dialCode: string;
  priority: number;
  areasCodes: null | Array<number>;
  locales?: Array<string>;
  locale?: string;
  currency?: string;
  dateFormat?: string;
}

export const Country = C;
