// eslint-disable-next-line no-unused-vars
import { CheckoutBody, CheckoutResponse } from "../../../helpers/types";
import api from "../../../../utils/request/api";
import constants from "../../../../config/constants";
import alert from "../../../../utils/alert";

export const checkout = async (
  data: CheckoutBody,
  showMessage: boolean = true,
): Promise<boolean | string | CheckoutResponse> => {
  try {
    return api.post(constants.API.CHECKOUT, data);
  } catch (e) {
    // continue
    // eslint-disable-next-line no-console
    console.log("error", e);
  }

  if (showMessage) {
    alert(
      "Oops...",
      "Houve um problema ao tentar processar sua compra. Por favor, tente novamente.",
    );
  }
  return false;
};
