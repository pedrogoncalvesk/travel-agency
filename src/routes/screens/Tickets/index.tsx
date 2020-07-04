import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { Input } from "react-native-elements";

// eslint-disable-next-line no-unused-vars
import { DefaultProps } from "../../../App";
import { GlobalContext } from "../../../config/sharedState";
import ContainerPurple from "../../../styled/ContainerPurple";
import ContainerPrimary from "../../../styled/ContainerPrimary";
import Icon from "../../../styled/Icon";
import { colors } from "../../../config/theme";
import { ScrollContainer } from "../../../styled/ScrollContainer";
import { Text, Button, ButtonText } from "./styled";

const Tickets = (props: DefaultProps) => {
  const {
    screenProps: { t },
  } = props;
  const [globalState] = useContext(GlobalContext)();
  const [flightFrom, setFlightFrom] = useState("São Paulo");
  const [flightTo, setFlightTo] = useState("Belo Horizonte");
  const [dateBegin, setDateBegin] = useState("06/07/2020");
  const [dateEnd, setDateEnd] = useState("18/07/2020");

  useEffect(() => {
    console.log(globalState);
  }, [globalState]);

  const handleButtonSearch = () => {
    console.log("Enviar os valores para a API e atualizar a pagina");
  };

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
            onChangeText={val => setFlightFrom(val)}
          />
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
