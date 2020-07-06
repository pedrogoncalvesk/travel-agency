import React from "react";

// eslint-disable-next-line no-unused-vars
import { Carrier, Quote } from "../../../helpers/types";
import isObject from "../../../../utils/object/isObject";
import IconMaterial from "../../../../styled/IconMaterial";
import { colors } from "../../../../config/theme";
import {
  Button,
  ButtonText,
  CardColumn,
  CardSection,
  CardSectionRow,
  ContainerCard,
  GrayText,
  InlineDeparture,
  StrongGrayText,
  StrongText,
} from "../helpers/styled";

const TicketCard = (props: TicketCardProps) => {
  const { q, t, handleBuy, moment } = props;
  return (
    <ContainerCard>
      <CardSection>
        <StrongText>{t("Tickets-Carriers")}</StrongText>
        <GrayText>
          {Array.isArray(q.CarriersInfo) &&
            q.CarriersInfo.map((c: Carrier) => c.Name).join(",")}
        </GrayText>
      </CardSection>
      <CardSectionRow>
        {isObject(q.OutboundLeg) && (
          <CardColumn style={{ marginRight: 40 }}>
            <InlineDeparture>
              <IconMaterial
                name="airplane-takeoff"
                size={15}
                color={colors.COLOR_GRAY_BLACK}
                style={{ marginRight: 7.5 }}
              />
              <StrongGrayText style={{ marginRight: 5 }}>
                {t("Tickets-Outbound")}
              </StrongGrayText>
              {/* @ts-ignore */}
              <GrayText>{`${q.OutboundLeg.Origin.IataCode}-${q.OutboundLeg.Destination.IataCode}`}</GrayText>
            </InlineDeparture>
            <StrongText style={{ fontSize: 16 }}>
              {`${moment(q.OutboundLeg.DepartureDate).format(
                "ddd D MMM YYYY",
              )}`}
            </StrongText>
            <GrayText>{`${moment(q.OutboundLeg.DepartureDate).format(
              "HH:mm",
            )} - ${
              q.Direct ? t("Tickets-Direct") : t("Tickets-Scale")
            }`}</GrayText>
          </CardColumn>
        )}
        {isObject(q.InboundLeg) && (
          <CardColumn>
            <InlineDeparture>
              <IconMaterial
                name="airplane-landing"
                size={15}
                color={colors.COLOR_GRAY_BLACK}
                style={{ marginRight: 7.5 }}
              />
              <StrongGrayText style={{ marginRight: 5 }}>
                {t("Tickets-Inbound")}
              </StrongGrayText>
              {/* @ts-ignore */}
              <GrayText>{`${q.InboundLeg.Origin.IataCode}-${q.InboundLeg.Destination.IataCode}`}</GrayText>
            </InlineDeparture>
            <StrongText style={{ fontSize: 16 }}>
              {`${moment(q.InboundLeg.DepartureDate).format("ddd D MMM YYYY")}`}
            </StrongText>
            <GrayText>{`${moment(q.InboundLeg.DepartureDate).format(
              "HH:mm",
            )} - ${
              q.Direct ? t("Tickets-Direct") : t("Tickets-Scale")
            }`}</GrayText>
          </CardColumn>
        )}
      </CardSectionRow>
      <CardSectionRow
        style={{ justifyContent: "space-between", borderBottomWidth: 0 }}
      >
        <CardColumn>
          <GrayText>{t("Tickets-MinPrice")}</GrayText>
          <StrongText style={{ fontSize: 22.5 }}>{q.Price}</StrongText>
        </CardColumn>
        <CardColumn>
          <Button
            style={{
              backgroundColor: colors.COLOR_PRIMARY,
              borderColor: colors.COLOR_PRIMARY,
            }}
            onPress={() => handleBuy(q)}
          >
            <ButtonText
              style={{ paddingHorizontal: 22.5, paddingVertical: 2.5 }}
            >
              {t("Tickets-Buy")}
            </ButtonText>
          </Button>
        </CardColumn>
      </CardSectionRow>
    </ContainerCard>
  );
};

interface TicketCardProps {
  q: Quote;
  handleBuy: (quote: Quote) => void;
  t: any;
  moment: any;
}

export default TicketCard;
