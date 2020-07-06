import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { Input } from "react-native-elements";

// eslint-disable-next-line no-unused-vars
import { DefaultProps } from "../../../App";
import { GlobalContext } from "../../../config/sharedState";
import ContainerPurple from "../../../styled/ContainerPurple";
import ContainerPrimary from "../../../styled/ContainerPrimary";
import { ScrollContainer } from "../../../styled/ScrollContainer";
import { WhiteText, Button, ButtonText } from "../Tickets/helpers/styled";

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
      <WhiteText style={{ fontSize: 25, textAlign: "center", margin: 20 }}>
        {t("Checkout-Empty")}
      </WhiteText>
    ) : (
      [
        <WhiteText style={{ fontSize: 25, textAlign: "center", margin: 20 }}>
          {t("Checkout-CardInfo")}
        </WhiteText>,

        <WhiteText>{t("Checkout-CardName")}</WhiteText>,
        <Input
          style={{ justifyContent: "flex-start" }}
          placeholder={t("Checkout-CardName-Placeholder")}
          onChangeText={val => setName(val)}
        />,
        <WhiteText>{t("Checkout-CardNumber")}</WhiteText>,
        <Input
          placeholder={t("Checkout-CardNumber-Placeholder")}
          onChangeText={val => setCardNumber(val)}
        />,
        <WhiteText>{t("Checkout-Cvv")}</WhiteText>,
        <Input
          placeholder={t("Checkout-Cvv-Placeholder")}
          onChangeText={val => setCvv(val)}
        />,
        <WhiteText>{t("Checkout-ExpireDate")}</WhiteText>,
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
          <WhiteText
            style={{
              fontSize: 18,
              textAlign: "center",
            }}
          >
            {t("Checkout-TicketInfo")}
          </WhiteText>
          {_renderCard()}
        </ContainerPrimary>
      </ContainerPurple>
    </ScrollContainer>
  );
};

export default Checkout;
