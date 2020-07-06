import React, { useState } from "react";
import { View } from "react-native";
import { Input } from "react-native-elements";

// eslint-disable-next-line no-unused-vars
import { DefaultProps } from "../../../App";
import { colors } from "../../../config/theme";
import ContainerPurple from "../../../styled/ContainerPurple";
import ContainerPrimary from "../../../styled/ContainerPrimary";
import { ScrollContainer } from "../../../styled/ScrollContainer";
import { Container, Text, Button, ButtonText } from "./helpers/styled";

import { moreInformation } from "./helpers/moreInformation";

const Discover = (props: DefaultProps) => {
  const {
    screenProps: { t },
  } = props;
  const [infoAbout, setInfoAbout] = useState("");
  const [name, setName] = useState("");
  const [currency, setCurrency] = useState("");
  const [language, setLanguage] = useState("");
  const [capital, setCapital] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [showInfo, setShowInfo] = useState(false);

  const _handleButtonInfo = () => {
    if (!showInfo) {
      setShowInfo(true);
    }
  };

  const _makeRequestAbout = async (val: string) => {
    const i = await moreInformation({
      information: val,
    });
    if (typeof i === "boolean") return;
    // @ts-ignore
    setName(i.name);
    setCurrency(i.currency);
    setLanguage(i.language);
    setCapital(i.capital);
    setPhoneCode(i.phoneCode);
  };

  const _handleChangeAbout = async (val: string) => {
    setInfoAbout(val);

    if (val.length >= 3) {
      await _makeRequestAbout(val);
    }
  };

  const _renderSearch = () => {
    return (
      <>
        <Text style={{ marginBottom: 10, fontSize: 20 }}>
          {t("Discover-Title")}
        </Text>

        <Container style={{ zIndex: 3 }}>
          <Text>{t("Discover-Place")}</Text>
          <Input
            containerStyle={{ paddingHorizontal: 0 }}
            placeholderTextColor={colors.COLOR_GRAY}
            inputStyle={{ color: colors.COLOR_WHITE, paddingHorizontal: 5 }}
            placeholder={t("Discover-Placeholder")}
            onChangeText={_handleChangeAbout}
            value={infoAbout}
          />
        </Container>
      </>
    );
  };

  return (
    <ScrollContainer>
      <ContainerPurple>
        <ContainerPrimary>
          {_renderSearch()}
          <View>
            <Button onPress={() => _handleButtonInfo()}>
              <ButtonText>{t("Discover-Search")}</ButtonText>
            </Button>
          </View>
          {showInfo ? (
            <Text style={{ fontSize: 25, textAlign: "center" }}>
              {" "}
              {t("Discover-Name")}: {name}. {t("Discover-Capital")}: {capital}.{" "}
              {t("Discover-Language")}: {language}. {t("Discover-Currency")}:{" "}
              {currency}. {t("Discover-PhoneCode")}: {phoneCode}.
            </Text>
          ) : null}
        </ContainerPrimary>
      </ContainerPurple>
    </ScrollContainer>
  );
};

export default Discover;
