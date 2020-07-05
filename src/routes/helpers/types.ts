export interface ListPlacesBody {
  locale: string;
  currency: string;
  country: string;
  queryParameter: string;
}

export interface ListPlacesResponse {
  Places: Array<Place> | null;
}

export interface Place {
  PlaceId: string;
  PlaceName: string;
  CountryId: string;
  RegionId: string;
  CityId: string;
  CountryName: string;
}

export interface BrowseQuotesBody {
  locale: string;
  currency: string;
  country: string;
  originplace: string;
  destinationplace: string;
  inboundpartialdate: string;
  outboundpartialdate: string;
}

export interface BrowseQuotesResponse {
  Quotes: Array<Quote> | null;
  Places: Array<PlaceResult> | null;
  Carriers: Array<Carrier> | null;
  Currencies: Array<Currency> | null;
}

export interface Quote {
  QuoteId: number;
  MinPrice: number;
  Direct: boolean;
  OutboundLeg: Leg;
  InboundLeg: Leg;
  QuoteDateTime: string;
}

export interface Leg {
  CarrierIds: Array<number>;
  OriginId: number;
  DestinationId: number;
  DepartureDate: number;
}

export interface PlaceResult {
  PlaceId: string;
  IataCode: string;
  Name: string;
  Type: string;
  SkyscannerCode: string;
  CityId: string;
  CityName: string;
  CountryName: string;
}

export interface Carrier {
  CarrierId: number;
  Name: string;
}

export interface Currency {
  Code: string;
  Symbol: string;
  ThousandsSeparator: string;
  DecimalSeparator: string;
  SymbolOnLeft: boolean;
  SpaceBetweenAmountAndSymbol: boolean;
  RoundingCoefficient: number;
  DecimalDigits: number;
}
