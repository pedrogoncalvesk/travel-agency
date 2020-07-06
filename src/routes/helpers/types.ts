export interface ListPlacesBody {
  locale: string;
  currency: string;
  country: string;
  queryParameter: string;
}

export interface ListPlacesResponse {
  Places: Array<Place> | null;
}

export interface MoreInformationBody {
  information: string;
}

export interface MoreInformationResponse {
  name: string;
  capital: string;
  language: string;
  currency: string;
  phoneCode: string;
}

export interface BrowseQuotesBody {
  locale: string;
  currency: string;
  country: string;
  originplace: string;
  destinationplace: string;
  inboundpartialdate?: string;
  outboundpartialdate?: string;
}

export interface BrowseQuotesResponse {
  Quotes: Array<Quote> | null;
  Places: Array<PlaceResult> | null;
  Carriers: Array<Carrier> | null;
  Currencies: Array<Currency> | null;
}

export interface CheckoutBody {
  name: string;
  lastName: string;
  cardNumber: string;
  cvv: string;
  expirationDate: string;
  quotes: Quote | Array<Quote>;
  placesQuoteApi: PlaceResult | Array<PlaceResult>;
}

export interface CheckoutResponse {
  idCheckout: string;
}

export interface CheckStatusBody extends CheckoutResponse {}

export interface CheckStatusResponse {
  status: string;
}

export interface Place {
  PlaceId: string;
  PlaceName: string;
  CountryId: string;
  RegionId: string;
  CityId: string;
  CountryName: string;
}

export interface Quote {
  QuoteId: number | string;
  MinPrice: number;
  Direct: boolean;
  OutboundLeg: Leg;
  InboundLeg: Leg;
  QuoteDateTime: string;
  Price?: string;
  Currency?: Currency;
  CarriersInfo?: Array<Carrier>;
  Places: Array<PlaceResult>;
}

export interface Leg {
  CarrierIds: Array<number | string>;
  OriginId: number;
  DestinationId: number;
  DepartureDate: number;
  CarriersInfo?: Array<Carrier> | null;
  Origin: PlaceResult | null;
  Destination: PlaceResult | null;
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

export interface History {
  [idCheckout: string]: {
    status: string;
    flights: Array<Quote>;
    places: Array<PlaceResult>;
  };
}
