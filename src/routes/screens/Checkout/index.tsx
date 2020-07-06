import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Input } from "react-native-elements";
import moment from "moment";
import * as _ from "lodash";

// eslint-disable-next-line no-unused-vars
import { DefaultProps } from "../../../App";
// eslint-disable-next-line no-unused-vars
import { Quote } from "../../helpers/types";
import { GlobalContext } from "../../../config/sharedState";
import alert from "../../../utils/alert";
import ContainerPurple from "../../../styled/ContainerPurple";
import ContainerPrimary from "../../../styled/ContainerPrimary";
import { ScrollContainer } from "../../../styled/ScrollContainer";
import { colors } from "../../../config/theme";
import { WhiteText, Button, ButtonText } from "../Tickets/helpers/styled";
import TicketCard from "../Tickets/components/TicketCard";
import { checkout } from "./helpers/checkout";
import navigationService from "../../../utils/navigationService";
import constants from "../../../config/constants";

const Checkout = (props: DefaultProps) => {
  const {
    screenProps: { t, locale },
  } = props;
  const [globalState, setGlobalState] = useContext(GlobalContext)();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [isCartEmpty, setIsCartEmpty] = useState(true);

  useEffect(() => {
    setIsCartEmpty(!globalState.flights.length);
  }, [globalState.flights]);

  useEffect(() => {
    moment.locale(locale);
  }, [locale]);

  const _handleClear = (clearGlobal = true) => {
    if (clearGlobal) {
      setGlobalState({
        ...globalState,
        flights: [],
        places: [],
      });
    }
    setName("");
    setLastName("");
    setCardNumber("");
    setCvv("");
    setExpirationDate("");
  };

  const _handleButtonBuy = async () => {
    // TODO: checks
    const res = await checkout({
      name,
      lastName,
      cardNumber,
      cvv,
      expirationDate,
      quotes: globalState.flights[0],
      placesQuoteApi: globalState.places[0],
    });
    if (typeof res !== "boolean" && "idCheckout" in res) {
      const { idCheckout } = res;
      alert(
        "Pronto!",
        `Sua requisição está sendo processada e possui o id: ${idCheckout}`,
      );
      setGlobalState({
        ...globalState,
        history: {
          ...globalState.history,
          [idCheckout]: {
            status: "pending",
            flights: _.cloneDeep(globalState.flights),
            places: _.cloneDeep(globalState.places),
          },
        },
        flights: [],
        places: [],
      });
      _handleClear(false);
      setTimeout(
        () => navigationService.navigate(constants.ROUTES.ORDERS),
        2000,
      );
    } else {
      alert(
        "Oops...",
        "Sua requisição não pôde ser processada... Por favor, tente novamente.",
      );
    }
  };

  const _renderCard = () => {
    return isCartEmpty ? (
      <WhiteText style={{ fontSize: 25, textAlign: "center", margin: 20 }}>
        {t("Checkout-Empty")}
      </WhiteText>
    ) : (
      <>
        <WhiteText style={{ fontSize: 25, textAlign: "center", margin: 20 }}>
          {t("Checkout-CardInfo")}
        </WhiteText>
        <WhiteText>{t("Checkout-CardName")}</WhiteText>
        <Input
          style={{ justifyContent: "flex-start" }}
          placeholder={t("Checkout-CardName-Placeholder")}
          placeholderTextColor={colors.COLOR_GRAY}
          inputStyle={{ color: colors.COLOR_WHITE, paddingHorizontal: 5 }}
          onChangeText={val => setName(val)}
        />
        <WhiteText>{t("Checkout-CardLastName")}</WhiteText>
        <Input
          style={{ justifyContent: "flex-start" }}
          placeholder={t("Checkout-CardLastName-Placeholder")}
          placeholderTextColor={colors.COLOR_GRAY}
          inputStyle={{ color: colors.COLOR_WHITE, paddingHorizontal: 5 }}
          onChangeText={val => setLastName(val)}
        />
        <WhiteText>{t("Checkout-CardNumber")}</WhiteText>
        <Input
          placeholder={t("Checkout-CardNumber-Placeholder")}
          onChangeText={val => setCardNumber(val)}
          placeholderTextColor={colors.COLOR_GRAY}
          inputStyle={{ color: colors.COLOR_WHITE, paddingHorizontal: 5 }}
        />
        <WhiteText>{t("Checkout-Cvv")}</WhiteText>
        <Input
          placeholder={t("Checkout-Cvv-Placeholder")}
          onChangeText={val => setCvv(val)}
          placeholderTextColor={colors.COLOR_GRAY}
          inputStyle={{ color: colors.COLOR_WHITE, paddingHorizontal: 5 }}
        />
        <WhiteText>{t("Checkout-ExpireDate")}</WhiteText>
        <Input
          placeholder={t("Checkout-ExpireDate-Placeholder")}
          onChangeText={val => setExpirationDate(val)}
          placeholderTextColor={colors.COLOR_GRAY}
          inputStyle={{ color: colors.COLOR_WHITE, paddingHorizontal: 5 }}
        />
        {globalState.flights.map((quote: Quote, index) => (
          <TicketCard
            // eslint-disable-next-line react/no-array-index-key
            key={`${index}-${quote.QuoteId}`}
            q={quote}
            t={t}
            moment={moment}
          />
        ))}
        <View>
          <Button onPress={_handleButtonBuy}>
            <ButtonText>{t("Checkout-Buy")}</ButtonText>
          </Button>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => _handleClear(true)}
            style={{ paddingVertical: 5 }}
          >
            <WhiteText>{t("Checkout-Clear")}</WhiteText>
          </TouchableOpacity>
        </View>
      </>
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
