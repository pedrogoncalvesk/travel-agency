import React, { useContext, useEffect, useState } from "react";
import { View, Keyboard } from "react-native";
import { Input } from "react-native-elements";

// eslint-disable-next-line no-unused-vars
import { DefaultProps } from "../../../App";
import { GlobalContext } from "../../../config/sharedState";
import ContainerPurple from "../../../styled/ContainerPurple";
import ContainerPrimary from "../../../styled/ContainerPrimary";
import Icon from "../../../styled/Icon";
import { colors } from "../../../config/theme";
import { ScrollContainer } from "../../../styled/ScrollContainer";
import ShadowContainer, { ShadowFix } from "../../../styled/ShadowContainer";
import {
  Text,
  Button,
  ButtonText,
  ContainerBottomSearchBox,
  List,
  ListItemContainer,
  ListItemText,
} from "./helpers/styled";
import isString from "../../../utils/string/isString";
import { listPlaces } from "./helpers/listPlaces";

const Tickets = (props: DefaultProps) => {
  const {
    screenProps: { t, locale, getCountry },
  } = props;
  const [globalState] = useContext(GlobalContext)();
  const [flightFrom, setFlightFrom] = useState("");
  const [flightTo, setFlightTo] = useState("");
  const [dateBegin, setDateBegin] = useState("06/07/2020");
  const [dateEnd, setDateEnd] = useState("18/07/2020");
  const [places, setPlaces] = useState([]);
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);

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

  const _handleChangeFrom = async (val: string) => {
    setFlightFrom(val);

    if (val.length >= 3) {
      const c = getCountry(locale);
      console.log(
        "go to search places",
        JSON.stringify({
          queryParameter: val,
          locale,
          currency: c.currency,
          country: c.iso2,
        }),
      );
      // const p = await listPlaces({
      //   queryParameter: val,
      //   locale,
      //   currency: c.currency || "",
      //   country: c.iso2,
      // });

      const p = await fetch(
        "http://localhost:9091/listPlaces",
        // {
        //   url: "http://localhost:9091/listPlaces",
        //   // bodyUsed: true,
        //   cache: "no-cache",
        //   body: JSON.stringify({
        //     queryParameter: val,
        //     locale,
        //     currency: c.currency || "",
        //     country: c.iso2,
        //   }),
        //   // body: new TextEncoder("utf-8").encode(
        //   //   JSON.stringify({
        //   //     queryParameter: val,
        //   //     locale,
        //   //     currency: c.currency || "",
        //   //     country: c.iso2,
        //   //   }),
        //   // ),
        // },
        {
          method: "POST",
          keepalive: true,
          // mode: "no-cors",
          // mode: "navigate",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            queryParameter: val,
            locale,
            currency: c.currency || "",
            country: c.iso2,
          }),
          // body: new TextEncoder("utf-8").encode(
          //   JSON.stringify({
          //     queryParameter: val,
          //     locale,
          //     currency: c.currency || "",
          //     country: c.iso2,
          //   }),
          // ),
        },
      );
      console.log(p);
    }
  };

  const handleButtonSearch = () => {
    console.log("Enviar os valores para a API e atualizar a pagina");
  };

  const _handleSubmitQuery = id => {
    console.log(id);
    // if (!Array.isArray(list)) return;
    //
    // let item;
    // let target = !isString(searchQuery) ? query : searchQuery;
    //
    // if (
    //   isObject(id) &&
    //   isObject(id.nativeEvent) &&
    //   isString(id.nativeEvent.text)
    // ) {
    //   target = id.nativeEvent.text;
    // }
    //
    // if (isNumber(id)) {
    //   item = list.find(m => String(m[searchId]) === String(id));
    // } else {
    //   item = list.find(m => normalize(m[searchKey]) === normalize(target));
    // }
    //
    // if (typeof item !== "undefined") {
    //   const q = item[searchKey]
    //     .split(" ")
    //     .map(w => w.charAt(0).toUpperCase() + w.toLowerCase().slice(1))
    //     .join(" ");
    //
    //   setQuery(q);
    //   setSearchQuery("");
    //   setFilteredList([]);
    //
    //   onSubmit && onSubmit(item);
    //   onChange && onChange([{ ...item }]);
    //   searchInput.blur();
    // }
  };

  // @ts-ignore
  const _renderItem = ({ item: { PlaceId, PlaceName } }) => (
    <ListItemContainer onPress={() => _handleSubmitQuery(PlaceId)}>
      {isString(PlaceName) && <ListItemText>{PlaceName}</ListItemText>}
    </ListItemContainer>
  );

  return (
    <ScrollContainer paddingHorizontal={0} justifyContent="flex-start">
      <ContainerPurple>
        <ContainerPrimary>
          <Text style={{ marginBottom: 10, fontSize: 20 }}>
            {t("Tickets-Title")}
          </Text>

          <Text>{t("Tickets-From")}</Text>
          <Input
            containerStyle={{ paddingHorizontal: 0 }}
            placeholderTextColor={colors.COLOR_GRAY}
            inputStyle={{ color: colors.COLOR_WHITE, paddingHorizontal: 5 }}
            placeholder={t("Tickets-From-Placeholder")}
            onChangeText={_handleChangeFrom}
          />
          {/* {keyboardIsOpen && flightFrom !== "" && ( */}
          {/*  <ContainerBottomSearchBox> */}
          {/*    <ShadowFix /> */}
          {/*    /!* @ts-ignore *!/ */}
          {/*    <ShadowContainer borderRadius={10} bottomRadius> */}
          {/*      <List */}
          {/*        data={places} */}
          {/*        keyExtractor={(item: { PlaceId: any }) => `${item.PlaceId}`} */}
          {/*        getItem={(data: any[], index: number) => data[index]} */}
          {/*        getItemCount={(data: string | any[]) => data.length} */}
          {/*        renderItem={_renderItem} */}
          {/*      /> */}
          {/*    </ShadowContainer> */}
          {/*  </ContainerBottomSearchBox> */}
          {/* )} */}
          <Text>{t("Tickets-To")}</Text>
          <Input
            containerStyle={{ paddingHorizontal: 0 }}
            placeholderTextColor={colors.COLOR_GRAY}
            inputStyle={{ color: colors.COLOR_WHITE, paddingHorizontal: 5 }}
            placeholder={t("Tickets-To-Placeholder")}
            onChangeText={val => setFlightTo(val)}
          />
          <Text>{t("Tickets-StartDate")}</Text>
          <Input
            containerStyle={{ paddingHorizontal: 0 }}
            placeholderTextColor={colors.COLOR_GRAY}
            inputStyle={{ color: colors.COLOR_WHITE, paddingHorizontal: 5 }}
            leftIcon={<Icon iconName="calendar" size={24} color="white" />}
            placeholder={t("Tickets-StartDate-Placeholder")}
            onChangeText={val => setDateBegin(val)}
          />
          <Text>{t("Tickets-EndDate")}</Text>
          <Input
            containerStyle={{ paddingHorizontal: 0 }}
            placeholderTextColor={colors.COLOR_GRAY}
            inputStyle={{ color: colors.COLOR_WHITE, paddingHorizontal: 5 }}
            leftIcon={<Icon iconName="calendar" size={24} color="white" />}
            placeholder={t("Tickets-EndDate-Placeholder")}
            onChangeText={val => setDateEnd(val)}
          />

          <View>
            <Button onPress={() => handleButtonSearch()}>
              <ButtonText>{t("Tickets-Search")}</ButtonText>
            </Button>
          </View>
          <Text>
            TESTE - Origem: {flightFrom} e Destino: {flightTo}. Horário ida:{" "}
            {dateBegin} e Horário volta: {dateEnd}
          </Text>
        </ContainerPrimary>
      </ContainerPurple>
    </ScrollContainer>
  );
};

export default Tickets;
