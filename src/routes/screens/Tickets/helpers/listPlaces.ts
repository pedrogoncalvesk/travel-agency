// eslint-disable-next-line no-unused-vars
import { Places } from "../../../helpers/types";
import api from "../../../../utils/request/api";
import constants from "../../../../config/constants";
import alert from "../../../../utils/alert";

export const listPlaces = async (
  data: ListPlacesBody,
  showMessage: boolean = false,
): Promise<boolean | Places> => {
  try {
    return api.post(constants.API.PLACES, data);
  } catch (e) {
    // continue
    // eslint-disable-next-line no-console
    console.log("error", e);
  }

  if (showMessage) {
    alert(
      "Oops...",
      "Houve um problema ao tentar buscar as cidades. Por favor, tente novamente.",
    );
  }
  return false;
};

export interface ListPlacesBody {
  locale: string;
  currency: string;
  country: string;
  queryParameter: string;
}
