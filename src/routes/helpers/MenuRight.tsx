import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";

import { colors } from "../../config/theme";
// eslint-disable-next-line no-unused-vars
import { CountryType } from "../../utils/Country";
import Flags from "../../utils/Flags";
import SelectPicker from "../../components/SelectPicker";
import Icon from "../../styled/Icon";
import isObject from "../../utils/object/isObject";

const MenuRight = (props: MenuRightProps) => {
  const { getCountries, getCountry, t, setLocale, locale } = props;
  const [countries] = useState(getCountries().map((c, i) => ({ ...c, id: i })));
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

  return (
    <View>
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
        <Icon iconName="arrow-dropdown" color={colors.COLOR_GRAY_BLACK} />
      </TouchableOpacity>
      <View style={{ position: "absolute" }}>
        {isVisible && Array.isArray(countries) && (
          <SelectPicker
            titleIOS={t("country")}
            titleAndroid={t("country")}
            isVisible={isVisible}
            value={country.id}
            list={countries}
            onChange={(value: any) => {
              // @ts-ignore
              setLocale(countries[value].locale);
            }}
            onCancel={() => setIsVisible(false)}
          />
        )}
      </View>
    </View>
  );
};

interface MenuRightProps {
  getCountries(): Array<CountryType>;

  getCountry(l: string): CountryType;

  t(scope: string | string[]): string;

  setLocale(l: string): any;

  locale: string;
}

export default MenuRight;
