import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import moment from "moment";

// eslint-disable-next-line no-unused-vars
import { DefaultProps } from "../../../App";
// eslint-disable-next-line no-unused-vars
import { History, Quote } from "../../helpers/types";
import { GlobalContext } from "../../../config/sharedState";
import alert from "../../../utils/alert";
import ContainerPurple from "../../../styled/ContainerPurple";
import ContainerPrimary from "../../../styled/ContainerPrimary";
import { ScrollContainer } from "../../../styled/ScrollContainer";
import { WhiteText, Button, ButtonText } from "../Tickets/helpers/styled";
import TicketCard from "../Tickets/components/TicketCard";
import { checkStatus } from "./helpers/checkStatus";

const Orders = (props: DefaultProps) => {
  const {
    screenProps: { t, locale },
  } = props;
  const [globalState, setGlobalState] = useContext(GlobalContext)();
  const [isCartEmpty, setIsCartEmpty] = useState(true);

  useEffect(() => {
    setIsCartEmpty(!Object.keys(globalState.history).length);
  }, [globalState.history]);

  useEffect(() => {
    moment.locale(locale);
  }, [locale]);

  const _handleCheckStatus = async (idCheckout: string) => {
    const res = await checkStatus({ idCheckout });
    if (typeof res !== "boolean" && "status" in res) {
      const { status } = res;
      alert(
        "Status do pedido",
        `O seu pedido com o id ${idCheckout} está com o status ${t(status)}`,
      );
      setGlobalState({
        ...globalState,
        history: {
          ...globalState.history,
          [idCheckout]: {
            ...globalState.history[idCheckout],
            status,
          },
        },
      });
    } else {
      alert(
        "Oops...",
        "Sua requisição não pôde ser processada... Por favor, tente novamente.",
      );
    }
  };

  const _handleClearOne = (id: string) => {
    const history: History = {};
    // @ts-ignore
    Object.keys(globalState.history).reduce((acc: History, idx: string) => {
      if (idx !== id) return { ...acc, [idx]: globalState.history[idx] };
      return acc;
    }, history);
    setGlobalState({
      ...globalState,
      history,
    });
  };

  const _handleClear = () => {
    setGlobalState({
      ...globalState,
      history: {},
    });
  };

  const _renderCard = () => {
    return isCartEmpty ? (
      <WhiteText style={{ fontSize: 25, textAlign: "center", margin: 20 }}>
        {t("Orders-Empty")}
      </WhiteText>
    ) : (
      <>
        <WhiteText style={{ fontSize: 25, textAlign: "center", margin: 20 }}>
          {t("Orders-Title")}
        </WhiteText>
        {/* @ts-ignore */}
        {Object.keys(globalState.history).map((idCheckout: string) => {
          return (
            <View key={idCheckout}>
              {globalState.history[idCheckout].flights.map(
                (quote: Quote, index) => (
                  <TicketCard
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${index}-${quote.QuoteId}`}
                    q={quote}
                    t={t}
                    moment={moment}
                  />
                ),
              )}
              <View>
                <Button onPress={() => _handleCheckStatus(idCheckout)}>
                  <ButtonText>{t("Orders-GetStatus")}</ButtonText>
                </Button>
              </View>
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => _handleClearOne(idCheckout)}
                  style={{ paddingVertical: 5 }}
                >
                  <WhiteText>{t("Orders-ClearOne")}</WhiteText>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={_handleClear}
            style={{ paddingVertical: 5 }}
          >
            <WhiteText>{t("Orders-Clear")}</WhiteText>
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
            {t("Orders-TicketInfo")}
          </WhiteText>
          {_renderCard()}
        </ContainerPrimary>
      </ContainerPurple>
    </ScrollContainer>
  );
};

export default Orders;
