// eslint-disable-next-line no-unused-vars,import/named
import { CheckStatusBody, CheckStatusResponse } from "../../../helpers/types";
// eslint-disable-next-line import/named
import { request } from "../../../../utils/request/api";
import constants from "../../../../config/constants";
import alert from "../../../../utils/alert";

export const checkStatus = async (
  data: CheckStatusBody,
  showMessage: boolean = true,
): Promise<boolean | CheckStatusResponse> => {
  try {
    return request(
      constants.BASE_URL_CONSUMER,
      "POST",
      constants.API.CHECK_STATUS,
      data,
    );
  } catch (e) {
    // continue
    // eslint-disable-next-line no-console
    console.log("error", e);
  }

  if (showMessage) {
    alert(
      "Oops...",
      "Houve um problema ao tentar conferir o status do seu pedido. Por favor, tente novamente.",
    );
  }
  return false;
};
