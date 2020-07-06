import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { Input } from "react-native-elements";

import { GlobalContext } from "../../../config/sharedState";
import ContainerPurple from "../../../styled/ContainerPurple";
import ContainerPrimary from "../../../styled/ContainerPrimary";
import Icon from "../../../styled/Icon";
import { ScrollContainer } from "../../../styled/ScrollContainer";
import { Text, Button, ButtonText } from "../Tickets/helpers/styled";
import { DefaultProps } from "../../../App";

const Checkout = (props: DefaultProps) => {
  const {
    screenProps: { t, locale, getCountry },
  } = props;
  const [globalState] = useContext(GlobalContext)();
  const [name, setName] = useState("Joao da Silva");
  const [cardNumber, setCardNumber] = useState("1234 5678 9876 5432");
  const [cvv, setCvv] = useState("123");
  const [expireDate, setExpireDate] = useState("01/20");
  const [isCartEmpty, setIsCartEmpty] = useState(true);

  useEffect(() => {
    console.log(globalState);
  }, [globalState]);

  const handleButtonBuy = () => {
    console.log("Finalizar a compra");
  };

  const _renderCard = () => {
    return isCartEmpty ? (
      <Text style={{ fontSize: 25, textAlign: "center", margin: 20 }}>
        {t("Checkout-Empty")}
      </Text>
    ) : (
      [
        <Text style={{ fontSize: 25, textAlign: "center", margin: 20 }}>
          Informações do seu cartão de crédito
        </Text>,
        <Text>{t("Checkout-CardName")}</Text>,
        <Input
          style={{ justifyContent: "flex-start" }}
          placeholder={t("Checkout-CardName-Placeholder")}
          onChangeText={val => setName(val)}
        />,
        <Text>{t("Checkout-CardNumber")}</Text>,
        <Input
          placeholder={t("Checkout-CardNumber-Placeholder")}
          onChangeText={val => setCardNumber(val)}
        />,
        <Text>{t("Checkout-Cvv")}</Text>,
        <Input
          placeholder={t("Checkout-Cvv-Placeholder")}
          onChangeText={val => setCvv(val)}
        />,
        <Text>{t("Checkout-ExpireDate")}</Text>,
        <Input
          placeholder={t("Checkout-ExpireDate-Placeholder")}
          onChangeText={val => setExpireDate(val)}
        />,

        <View>
          <Button onPress={() => handleButtonBuy()}>
            <ButtonText>{t("Checkout-Buy")}</ButtonText>
          </Button>
        </View>,
      ]
    );
  };

  return (
    <ScrollContainer paddingHorizontal={0} justifyContent="flex-start">
      <ContainerPurple>
        <ContainerPrimary>
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
            }}
          >
            {t("Checkout-TicketInfo")}
          </Text>
          {_renderCard()}
        </ContainerPrimary>
      </ContainerPurple>
    </ScrollContainer>
  );
};

export default Checkout;
