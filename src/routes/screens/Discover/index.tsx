import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { Input } from "react-native-elements";

// eslint-disable-next-line no-unused-vars
import { DefaultProps } from "../../../App";
import { GlobalContext } from "../../../config/sharedState";
import ContainerPurple from "../../../styled/ContainerPurple";
import ContainerPrimary from "../../../styled/ContainerPrimary";
import { Text, Button } from "../Tickets/styled";

const Discover = (props: DefaultProps) => {
  const {
    screenProps: { t },
  } = props;
  const [globalState] = useContext(GlobalContext)();
  const [infoAbout, setInfoAbout] = useState("Lugar");
  const [currency, setCurrency] = useState("nao chamou");
  const [language, setLanguage] = useState("nao chamou");
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    console.log(globalState);
  }, [globalState]);

  function handleButtonInformations() {
    if (showInfo === false) {
      setShowInfo(true);
    }
    console.log(showInfo);
  }

  return (
    <ContainerPurple>
      <ContainerPrimary>
        <View
          style={{
            margin: 20,
          }}
        >
          <Text>{t("Discover-Title")}</Text>

          <Text>{t("Discover-Local")}</Text>
          <Input
            placeholder={t("Discover-Placeholder")}
            onChangeText={val => setInfoAbout(val)}
          />

          <View>
            <Button onPress={() => handleButtonInformations()}>
              <Text>{t("Discover-Search")}</Text>
            </Button>
          </View>
          {showInfo ? (
            <Text style={{ fontSize: 25, textAlign: "center" }}>
              {t("Discover-Currency")} {currency}. {" "} {t("Discover-Language")} {language}
            </Text>
          ) : null}

          <Text>TESTE - Informações de: {infoAbout}</Text>
        </View>
      </ContainerPrimary>
    </ContainerPurple>
  );
};

export default Discover;
