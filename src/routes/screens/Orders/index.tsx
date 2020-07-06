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
import ContainerSecondary from "../../../styled/ContainerSecondary";
import { ScrollContainer } from "../../../styled/ScrollContainer";
import {
  WhiteText,
  Button,
  ButtonText,
  InlineDeparture,
  StrongText,
  GrayText,
  StrongGrayText,
  StrongWhiteText,
} from "../Tickets/helpers/styled";
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
    let history: History = {};
    // @ts-ignore
    history = Object.keys(globalState.history).reduce((acc: History, idx: string) => {
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
      <GrayText style={{ fontSize: 25, textAlign: "center", margin: 20 }}>
        {t("Orders-Empty")}
      </GrayText>
    ) : (
      <>
        {/* @ts-ignore */}
        {Object.keys(globalState.history).map(
          (idCheckout: string, index: number) => {
            const Container = index % 2 ? ContainerSecondary : ContainerPrimary;
            return (
              <Container
                key={idCheckout}
                style={{ marginBottom: index % 2 ? 0 : 15 }}
              >
                <InlineDeparture>
                  <WhiteText
                    style={{
                      fontSize: 12,
                      textAlign: "center",
                      marginBottom: 5,
                    }}
                  >
                    {`${t("Orders-Title")} ${idCheckout}`}
                  </WhiteText>
                </InlineDeparture>
                <InlineDeparture>
                  <StrongWhiteText
                    style={{
                      fontSize: 12,
                      textAlign: "center",
                      marginBottom: 10,
                    }}
                  >
                    {`${t("Orders-Status")} ${t(
                      globalState.history[idCheckout].status,
                    )}`}
                  </StrongWhiteText>
                </InlineDeparture>
                {globalState.history[idCheckout].flights.map(
                  (quote: Quote, i) => (
                    <TicketCard
                      // eslint-disable-next-line react/no-array-index-key
                      key={`${i}-${quote.QuoteId}`}
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
              </Container>
            );
          },
        )}
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={_handleClear}
            style={{ paddingVertical: 5 }}
          >
            <StrongGrayText style={{ marginVertical: 15 }}>
              {t("Orders-Clear")}
            </StrongGrayText>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <ScrollContainer paddingHorizontal={0} justifyContent="flex-start">
      <ContainerPurple>
        <StrongText
          style={{
            fontSize: 18,
            textAlign: "center",
            marginBottom: 15,
          }}
        >
          {t("Orders-TicketInfo")}
        </StrongText>
        {_renderCard()}
      </ContainerPurple>
    </ScrollContainer>
  );
};

export default Orders;
