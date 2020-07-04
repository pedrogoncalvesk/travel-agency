import C from "./Country";

export interface CountryType {
  name: string;
  iso2: string;
  dialCode: string;
  priority: number;
  areasCodes: null | Array<number>;
  locales: undefined | Array<string>;
  locale: undefined | string;
}

export const Country = C;
