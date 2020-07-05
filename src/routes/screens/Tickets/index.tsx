import React, { useContext, useEffect, useState } from "react";
import { View, Keyboard, Platform } from "react-native";
import { Input } from "react-native-elements";
import moment from "moment";

// eslint-disable-next-line no-unused-vars
import { DefaultProps } from "../../../App";
// eslint-disable-next-line no-unused-vars
import { Place } from "../../helpers/types";
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
  Text,
  Button,
  ButtonText,
  ContainerBottomSearchBox,
  List,
  ListItemContainer,
  ListItemText,
} from "./helpers/styled";
import { listPlaces } from "./helpers/listPlaces";
import { browseRoutes } from "./helpers/browseRoutes";

const Tickets = (props: DefaultProps) => {
  const {
    screenProps: { t, locale, getCountry },
  } = props;
  const [globalState, setGlobalState] = useContext(GlobalContext)();
  const [flightFrom, setFlightFrom] = useState("");
  const [flightTo, setFlightTo] = useState("");
  const [placesFrom, setPlacesFrom] = useState([]);
  const [placesTo, setPlacesTo] = useState([]);
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
    console.log(globalState);
  }, [globalState]);

  const _handleButtonSearch = async () => {
    // console.log(globalState.flightFrom, globalState.flightTo, globalState.dateBegin, globalState.dateEnd);
    const dateBegin = moment(globalState.dateBegin, "DD/MM/YYYY");
    const dateEnd = moment(globalState.dateEnd, "DD/MM/YYYY");
    if (
      dateBegin.isValid() &&
      dateEnd.isValid() &&
      "PlaceId" in globalState.flightFrom &&
      "PlaceId" in globalState.flightTo
    ) {
      const c = getCountry(locale);
      const x = await browseRoutes({
        locale,
        currency: c.currency || "",
        country: c.iso2,
        originplace: globalState.flightFrom.PlaceId,
        destinationplace: globalState.flightTo.PlaceId,
        outboundpartialdate: getZuluTime(dateBegin.toDate(), true),
        inboundpartialdate: getZuluTime(dateEnd.toDate(), true),
      });
      console.log(x);
      return;
    }
    alert("Oops...", "As datas informadas não são válidas.");
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

  return (
    <ScrollContainer paddingHorizontal={0} justifyContent="flex-start">
      <ContainerPurple>
        <ContainerPrimary>
          <Text style={{ marginBottom: 10, fontSize: 20 }}>
            {t("Tickets-Title")}
          </Text>

          <Container style={{ zIndex: 2 }}>
            <Text>{t("Tickets-From")}</Text>
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
            <Text>{t("Tickets-To")}</Text>
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
          <Text>{t("Tickets-StartDate")}</Text>
          <Input
            containerStyle={{ paddingHorizontal: 0 }}
            placeholderTextColor={colors.COLOR_GRAY}
            inputStyle={{ color: colors.COLOR_WHITE, paddingHorizontal: 5 }}
            leftIcon={<Icon name="calendar" size={24} color="white" />}
            placeholder={t("Tickets-StartDate-Placeholder")}
            value={globalState.dateBegin}
            onChangeText={val =>
              setGlobalState({ ...globalState, dateBegin: val })
            }
          />
          <Text>{t("Tickets-EndDate")}</Text>
          <Input
            containerStyle={{ paddingHorizontal: 0 }}
            placeholderTextColor={colors.COLOR_GRAY}
            inputStyle={{ color: colors.COLOR_WHITE, paddingHorizontal: 5 }}
            leftIcon={<Icon name="calendar" size={24} color="white" />}
            placeholder={t("Tickets-EndDate-Placeholder")}
            value={globalState.dateEnd}
            onChangeText={val =>
              setGlobalState({ ...globalState, dateEnd: val })
            }
          />

          <View>
            <Button onPress={_handleButtonSearch}>
              <ButtonText>{t("Tickets-Search")}</ButtonText>
            </Button>
          </View>
        </ContainerPrimary>
      </ContainerPurple>
    </ScrollContainer>
  );
};

interface Item {
  item: Place;
}

export default Tickets;
