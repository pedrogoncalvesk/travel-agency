import React, { useContext, useEffect, useState } from "react";
import { View, Keyboard, Platform, TouchableOpacity } from "react-native";
import { Input, CheckBox } from "react-native-elements";
import moment from "moment";
import * as _ from "lodash";

// eslint-disable-next-line no-unused-vars
import { DefaultProps } from "../../../App";
// eslint-disable-next-line no-unused-vars
import { Carrier, Place, Quote } from "../../helpers/types";
import { GlobalContext } from "../../../config/sharedState";
import { colors } from "../../../config/theme";
import getZuluTime from "../../../utils/getZuluTime";
import alert from "../../../utils/alert";
import isString from "../../../utils/string/isString";
import ContainerPurple from "../../../styled/ContainerPurple";
import ContainerPrimary from "../../../styled/ContainerPrimary";
import Icon from "../../../styled/Icon";
import { ScrollContainer } from "../../../styled/ScrollContainer";
import ShadowContainer from "../../../styled/ShadowContainer";
import {
  Container,
  WhiteText,
  GrayText,
  StrongGrayText,
  StrongText,
  Button,
  ButtonText,
  ContainerBottomSearchBox,
  List,
  ListItemContainer,
  ListItemText,
  ContainerCards,
  ContainerCard,
  CardSection,
  CardSectionRow,
  CardColumn,
  InlineDeparture,
} from "./helpers/styled";
import { listPlaces } from "./helpers/listPlaces";
import { browseQuotes } from "./helpers/browseQuotes";
import { formatLeg } from "./helpers/formatLeg";
import IconMaterial from "../../../styled/IconMaterial";
import isObject from "../../../utils/object/isObject";

const Tickets = (props: DefaultProps) => {
  const {
    screenProps: { t, locale, getCountry },
  } = props;
  const [globalState, setGlobalState] = useContext(GlobalContext)();
  const [flightFrom, setFlightFrom] = useState("");
  const [flightTo, setFlightTo] = useState("");
  const [placesFrom, setPlacesFrom] = useState([]);
  const [placesTo, setPlacesTo] = useState([]);
  const [flights, setFlights] = useState([]);
  const [isAnyDate, setIsAnyDate] = useState(false);
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(Platform.OS === "web");

  const _keyboardDidShow = () => setKeyboardIsOpen(true);
  const _keyboardDidHide = () => setKeyboardIsOpen(false);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  useEffect(() => {
    moment.locale(locale);
  }, [locale]);

  const _handleButtonSearch = async (): Promise<void> => {
    const c = getCountry(locale);
    const dateBegin = moment(globalState.dateBegin, c.dateFormat);
    const dateEnd = moment(globalState.dateEnd, c.dateFormat);
    if (
      (isAnyDate || (dateBegin.isValid() && dateEnd.isValid())) &&
      "PlaceId" in globalState.flightFrom &&
      "PlaceId" in globalState.flightTo
    ) {
      const r = await browseQuotes({
        locale,
        currency: c.currency || "",
        country: c.iso2,
        originplace: globalState.flightFrom.PlaceId,
        destinationplace: globalState.flightTo.PlaceId,
        ...(!isAnyDate
          ? {
              outboundpartialdate: getZuluTime(dateBegin.toDate(), true),
              inboundpartialdate: getZuluTime(dateEnd.toDate(), true),
            }
          : {
              outboundpartialdate: "anytime",
              inboundpartialdate: "anytime",
            }),
      });
      if (
        typeof r === "boolean" ||
        !Array.isArray(r.Quotes) ||
        !Array.isArray(r.Places) ||
        !Array.isArray(r.Carriers) ||
        !Array.isArray(r.Currencies) ||
        !r.Currencies.length
      ) {
        return;
      }

      const {
        Carriers,
        Places,
        Currencies: [Currency],
      } = r;
      const f = r.Quotes.map(
        (quote: Quote): Array<Quote> => {
          const Price = quote.MinPrice.toLocaleString(locale, {
            style: "currency",
            currency: Currency.Code,
            minimumFractionDigits: Currency.DecimalDigits,
          });

          const OutboundLeg = formatLeg(quote.OutboundLeg, Carriers, Places);
          const InboundLeg = formatLeg(quote.InboundLeg, Carriers, Places);
          const CarriersInfo = _.unionBy(
            isObject(OutboundLeg) && "CarriersInfo" in OutboundLeg
              ? OutboundLeg.CarriersInfo
              : [],
            isObject(InboundLeg) && "CarriersInfo" in InboundLeg
              ? InboundLeg.CarriersInfo
              : [],
            "CarrierId",
          );

          return {
            ...quote,
            // @ts-ignore
            CarriersInfo,
            Currency,
            Price,
            OutboundLeg,
            InboundLeg,
          };
        },
      );

      // @ts-ignore
      setFlights(f);
    } else
      alert(
        "Oops...",
        "Parece que está faltando alguma informação ou existe alguma informação no formulário errada. Por favor, tente novamente.",
      );
  };

  const _handleClear = () => {
    setGlobalState({
      ...globalState,
      flightFrom: {},
      flightTo: {},
      dateBegin: "",
      dateEnd: "",
    });
    setFlightFrom("");
    setFlightTo("");
    setFlights([]);
  };

  const _renderPlacesBox = (
    renderFunction: ({ item }: Item) => JSX.Element,
    places: Array<Place>,
  ): JSX.Element | null => {
    if (!keyboardIsOpen) {
      return null;
    }
    return (
      <ContainerBottomSearchBox>
        {/* @ts-ignore */}
        <ShadowContainer>
          <List
            data={places}
            keyExtractor={(item: { PlaceId: any }) => `${item.PlaceId}`}
            getItem={(data: any[], index: number) => data[index]}
            getItemCount={(data: string | any[]) => data.length}
            renderItem={renderFunction}
          />
        </ShadowContainer>
      </ContainerBottomSearchBox>
    );
  };

  const _renderInputDate = () => {
    return [
      <WhiteText key={1}>{t("Tickets-StartDate")}</WhiteText>,
      <Input
        key={2}
        disabled={isAnyDate}
        containerStyle={{ paddingHorizontal: 0 }}
        placeholderTextColor={colors.COLOR_GRAY}
        inputStyle={{ color: colors.COLOR_WHITE, paddingHorizontal: 5 }}
        leftIcon={<Icon name="calendar" size={24} color="white" />}
        placeholder={t("Tickets-StartDate-Placeholder")}
        value={globalState.dateBegin}
        onChangeText={val => setGlobalState({ ...globalState, dateBegin: val })}
      />,
      <WhiteText key={3}>{t("Tickets-EndDate")}</WhiteText>,
      <Input
        key={4}
        disabled={isAnyDate}
        containerStyle={{ paddingHorizontal: 0 }}
        placeholderTextColor={colors.COLOR_GRAY}
        inputStyle={{ color: colors.COLOR_WHITE, paddingHorizontal: 5 }}
        leftIcon={<Icon name="calendar" size={24} color="white" />}
        placeholder={t("Tickets-EndDate-Placeholder")}
        value={globalState.dateEnd}
        onChangeText={val => setGlobalState({ ...globalState, dateEnd: val })}
      />,
    ];
  };

  /**
   * SECTION FLIGHT FROM
   */
  const _makeRequestFrom = async (val: string) => {
    const c = getCountry(locale);
    const p = await listPlaces({
      locale,
      currency: c.currency || "",
      country: c.iso2,
      queryParameter: val,
    });
    if (typeof p === "boolean" || !Array.isArray(p.Places)) return;
    // @ts-ignore
    setPlacesFrom(p.Places);
  };

  const _handleChangeFrom = async (val: string) => {
    setFlightFrom(val);
    if (val.length === 0) {
      setGlobalState({ ...globalState, flightFrom: {} });
    }

    if (val.length >= 3) {
      await _makeRequestFrom(val);
    }
  };

  const _handleSubmitFrom = (item: Place) => {
    setFlightFrom(item.PlaceName);
    setGlobalState({ ...globalState, flightFrom: item });
    setPlacesFrom([]);
  };

  const _renderItemFrom = ({ item }: Item) => (
    <ListItemContainer onPress={() => _handleSubmitFrom(item)}>
      {isString(item.PlaceName) && (
        <ListItemText>{item.PlaceName}</ListItemText>
      )}
    </ListItemContainer>
  );

  /**
   * SECTION FLIGHT TO
   */
  const _makeRequestTo = async (val: string) => {
    const c = getCountry(locale);
    const p = await listPlaces({
      locale,
      currency: c.currency || "",
      country: c.iso2,
      queryParameter: val,
    });
    if (typeof p === "boolean" || !Array.isArray(p.Places)) return;
    // @ts-ignore
    setPlacesTo(p.Places);
  };

  const _handleChangeTo = async (val: string) => {
    setFlightTo(val);
    if (val.length === 0) {
      setGlobalState({ ...globalState, flightTo: {} });
    }

    if (val.length >= 3) {
      await _makeRequestTo(val);
    }
  };

  const _handleSubmitTo = (item: Place) => {
    setFlightTo(item.PlaceName);
    setGlobalState({ ...globalState, flightTo: item });
    setPlacesTo([]);
  };

  const _renderItemTo = ({ item }: Item) => (
    <ListItemContainer onPress={() => _handleSubmitTo(item)}>
      {isString(item.PlaceName) && (
        <ListItemText>{item.PlaceName}</ListItemText>
      )}
    </ListItemContainer>
  );

  const _handleCheckBox = () => setIsAnyDate(!isAnyDate);

  const _renderSearch = () => {
    return (
      <ContainerPurple>
        <ContainerPrimary>
          <WhiteText style={{ marginBottom: 10, fontSize: 20 }}>
            {t("Tickets-Title")}
          </WhiteText>

          <Container style={{ zIndex: 2 }}>
            <WhiteText>{t("Tickets-From")}</WhiteText>
            <Input
              containerStyle={{ paddingHorizontal: 0 }}
              placeholderTextColor={colors.COLOR_GRAY}
              inputStyle={{ color: colors.COLOR_WHITE, paddingHorizontal: 5 }}
              placeholder={t("Tickets-From-Placeholder")}
              onChangeText={_handleChangeFrom}
              value={
                !isString(flightFrom) &&
                "PlaceName" in globalState.flightFrom &&
                isString(globalState.flightFrom.PlaceName)
                  ? globalState.flightFrom.PlaceName
                  : flightFrom
              }
            />
            {isString(flightFrom) &&
              _renderPlacesBox(_renderItemFrom, placesFrom)}
          </Container>
          <Container style={{ zIndex: 1 }}>
            <WhiteText>{t("Tickets-To")}</WhiteText>
            <Input
              containerStyle={{ paddingHorizontal: 0 }}
              placeholderTextColor={colors.COLOR_GRAY}
              inputStyle={{ color: colors.COLOR_WHITE, paddingHorizontal: 5 }}
              placeholder={t("Tickets-To-Placeholder")}
              onChangeText={_handleChangeTo}
              value={
                !isString(flightTo) &&
                "PlaceName" in globalState.flightTo &&
                isString(globalState.flightTo.PlaceName)
                  ? globalState.flightTo.PlaceName
                  : flightTo
              }
            />
            {isString(flightTo) && _renderPlacesBox(_renderItemTo, placesTo)}
          </Container>

          {_renderInputDate()}
          <CheckBox
            title={t("Tickets-AnyDate")}
            onPress={_handleCheckBox}
            checked={isAnyDate}
          />
          <View>
            <Button onPress={_handleButtonSearch}>
              <ButtonText>{t("Tickets-Search")}</ButtonText>
            </Button>
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              onPress={_handleClear}
              style={{ paddingVertical: 5 }}
            >
              <WhiteText>{t("Tickets-Clear")}</WhiteText>
            </TouchableOpacity>
          </View>
        </ContainerPrimary>
      </ContainerPurple>
    );
  };

  const _renderFlights = () => {
    if (!flights.length) return null;

    return (
      <ContainerCards>
        {flights.map((q: Quote) => (
          <ContainerCard key={q.QuoteId}>
            <CardSection>
              <StrongText>{t("Tickets-Carriers")}</StrongText>
              <GrayText>
                {Array.isArray(q.CarriersInfo) &&
                  q.CarriersInfo.map((c: Carrier) => c.Name).join(",")}
              </GrayText>
            </CardSection>
            <CardSectionRow>
              {isObject(q.OutboundLeg) && (
                <CardColumn style={{ marginRight: 40 }}>
                  <InlineDeparture>
                    <IconMaterial
                      name="airplane-takeoff"
                      size={15}
                      color={colors.COLOR_GRAY_BLACK}
                      style={{ marginRight: 7.5 }}
                    />
                    <StrongGrayText style={{ marginRight: 5 }}>
                      {t("Tickets-Outbound")}
                    </StrongGrayText>
                    {/* @ts-ignore */}
                    <GrayText>{`${q.OutboundLeg.Origin.IataCode}-${q.OutboundLeg.Destination.IataCode}`}</GrayText>
                  </InlineDeparture>
                  <StrongText style={{ fontSize: 16 }}>
                    {`${moment(q.OutboundLeg.DepartureDate).format(
                      "dd D MMM YYYY",
                    )}`}
                  </StrongText>
                  <GrayText>{`${moment(q.OutboundLeg.DepartureDate).format(
                    "HH:mm",
                  )} - ${
                    q.Direct ? t("Tickets-Direct") : t("Tickets-Scale")
                  }`}</GrayText>
                </CardColumn>
              )}
              {isObject(q.InboundLeg) && (
                <CardColumn>
                  <InlineDeparture>
                    <IconMaterial
                      name="airplane-landing"
                      size={15}
                      color={colors.COLOR_GRAY_BLACK}
                      style={{ marginRight: 7.5 }}
                    />
                    <StrongGrayText style={{ marginRight: 5 }}>
                      {t("Tickets-Inbound")}
                    </StrongGrayText>
                    {/* @ts-ignore */}
                    <GrayText>{`${q.InboundLeg.Origin.IataCode}-${q.InboundLeg.Destination.IataCode}`}</GrayText>
                  </InlineDeparture>
                  <StrongText style={{ fontSize: 16 }}>
                    {`${moment(q.InboundLeg.DepartureDate).format(
                      "dd D MMM YYYY",
                    )}`}
                  </StrongText>
                  <GrayText>{`${moment(q.InboundLeg.DepartureDate).format(
                    "HH:mm",
                  )} - ${
                    q.Direct ? t("Tickets-Direct") : t("Tickets-Scale")
                  }`}</GrayText>
                </CardColumn>
              )}
            </CardSectionRow>
            <CardSectionRow
              style={{ justifyContent: "space-between", borderBottomWidth: 0 }}
            >
              <CardColumn>
                <GrayText>{t("Tickets-MinPrice")}</GrayText>
                <StrongText style={{ fontSize: 22.5 }}>{q.Price}</StrongText>
              </CardColumn>
              <CardColumn>
                <Button
                  style={{
                    backgroundColor: colors.COLOR_PRIMARY,
                    borderColor: colors.COLOR_PRIMARY,
                  }}
                  onPress={_handleButtonSearch}
                >
                  <ButtonText
                    style={{ paddingHorizontal: 22.5, paddingVertical: 2.5 }}
                  >
                    {t("Tickets-Buy")}
                  </ButtonText>
                </Button>
              </CardColumn>
            </CardSectionRow>
          </ContainerCard>
        ))}
      </ContainerCards>
    );
  };

  return (
    <ScrollContainer paddingHorizontal={0} justifyContent="flex-start">
      {_renderSearch()}
      {_renderFlights()}
    </ScrollContainer>
  );
};

interface Item {
  item: Place;
}

export default Tickets;
