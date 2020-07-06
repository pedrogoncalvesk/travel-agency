// eslint-disable-next-line no-unused-vars
import { Carrier, Leg, PlaceResult } from "../../../helpers/types";
import isObject from "../../../../utils/object/isObject";

export const formatLeg = (
  InOuLeg: Leg,
  Carriers: Array<Carrier>,
  Places: Array<PlaceResult>,
) => {
  if (isObject(InOuLeg)) {
    let CarriersInfo = null;
    let Origin = null;
    let Destination = null;

    if ("CarrierIds" in InOuLeg) {
      CarriersInfo = InOuLeg.CarrierIds.reduce(
        (acc: Array<Carrier>, id: number | string) => {
          const carrier = Carriers.find(
            ({ CarrierId }) => `${CarrierId}` === `${id}`,
          );
          if (typeof carrier !== "undefined" && isObject(carrier)) {
            return [...acc, carrier];
          }
          return acc;
        },
        [],
      );
    }
    if ("OriginId" in InOuLeg) {
      const p = Places.find(
        ({ PlaceId }) => `${PlaceId}` === `${InOuLeg.OriginId}`,
      );
      if (typeof p !== "undefined") {
        Origin = { ...p };
      }
    }
    if ("DestinationId" in InOuLeg) {
      const p = Places.find(
        ({ PlaceId }) => `${PlaceId}` === `${InOuLeg.DestinationId}`,
      );
      if (typeof p !== "undefined") {
        Destination = { ...p };
      }
    }
    return { ...InOuLeg, CarriersInfo, Origin, Destination };
  }
  return InOuLeg;
};
