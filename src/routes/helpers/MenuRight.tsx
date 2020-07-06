import React, { useContext, useEffect, useState } from "react";
import { View, Image, TouchableOpacity, Platform } from "react-native";
import { Badge } from "react-native-elements";

// eslint-disable-next-line no-unused-vars,import/named
import { ScreenProps } from "../../App";
import { GlobalContext } from "../../config/sharedState";
import { colors } from "../../config/theme";
import Flags from "../../utils/Flags";
import SelectPicker from "../../components/SelectPicker";
import Icon from "../../styled/Icon";
import isObject from "../../utils/object/isObject";
import navigationService from "../../utils/navigationService";
import constants from "../../config/constants";

const MenuRight = (props: MenuRightProps) => {
  const { getCountries, getCountry, t, setLocale, locale, tintColor } = props;
  const [globalState] = useContext(GlobalContext)();
  const [countries] = useState(
    getCountries().map((c, i) => ({ ...c, id: `${i}` })),
  );
  const [country, setCountry] = useState({ id: -1 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const l = countries.find(c => {
      if (Array.isArray(c.locales) && c.locales.find(lc => lc === locale))
        return c;
      return undefined;
    });
    if (isObject(l)) {
      // @ts-ignore
      setCountry(l);
    }
  }, [countries, locale]);

  const renderModal = () => {
    if (!isVisible || !Array.isArray(countries)) return null;
    const style =
      Platform.OS === "web"
        ? {
            display: "block",
            position: "fixed",
            width: "100vw",
            height: "100vh",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }
        : {};

    return (
      // @ts-ignore
      <View style={{ ...style }}>
        <SelectPicker
          titleIOS={t("country")}
          titleAndroid={t("country")}
          isVisible={isVisible}
          value={`${country.id}`}
          list={countries}
          onChange={(value: any) => {
            // @ts-ignore
            // eslint-disable-next-line radix
            setLocale(countries[parseInt(value)].locale);
          }}
          onCancel={() => setIsVisible(false)}
        />
      </View>
    );
  };

  return (
    <>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Icon
          name="person"
          color={colors.COLOR_GRAY_BLACK}
          onPress={() => navigationService.navigate(constants.ROUTES.ORDERS)}
          style={{ marginRight: 15 }}
        />
        <Icon
          name="basket"
          color={
            globalState.flights.length ? tintColor : colors.COLOR_GRAY_BLACK
          }
          onPress={() => navigationService.navigate(constants.ROUTES.CHECKOUT)}
          style={{ marginRight: 5 }}
        >
          {!!globalState.flights.length && Platform.OS === "web" && (
            <Badge
              value={
                globalState.flights.length > 9
                  ? "9+"
                  : `${globalState.flights.length}`
              }
              status="error"
              containerStyle={{
                position: "absolute",
                marginTop: -5,
                marginLeft: -8,
              }}
            />
          )}
        </Icon>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            paddingHorizontal: 10,
          }}
          onPress={() => setIsVisible(true)}
        >
          <Image
            style={{
              width: 30,
              height: 20,
              marginRight: 5,
            }}
            source={Flags.get(getCountry(locale).iso2)}
            resizeMode="contain"
          />
          <Icon name="arrow-dropdown" color={colors.COLOR_GRAY_BLACK} />
        </TouchableOpacity>
      </View>
      {renderModal()}
    </>
  );
};

interface MenuRightProps extends ScreenProps {
  tintColor: string;
}

export default MenuRight;
