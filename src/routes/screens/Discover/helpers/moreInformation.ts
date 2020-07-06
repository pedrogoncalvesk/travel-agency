// eslint-disable-next-line no-unused-vars,import/named
import { MoreInformationBody, MoreInformationResponse, } from "../../../helpers/types";
import api from "../../../../utils/request/api";
import constants from "../../../../config/constants";
import alert from "../../../../utils/alert";

export const moreInformation = async (
  data: MoreInformationBody,
  showMessage: boolean = true,
): Promise<boolean | MoreInformationResponse> => {
  try {
    return api.post(constants.API.INFORMATION, data);
  } catch (e) {
    // continue
    // eslint-disable-next-line no-console
    console.log("error", e);
  }

  if (showMessage) {
    alert(
      "Oops...",
      "Houve um problema ao tentar buscar mais informações do país. Por favor, tente novamente.",
    );
  }
  return false;
};
