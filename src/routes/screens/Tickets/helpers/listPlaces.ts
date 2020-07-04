import api from "../../../../utils/request/api";
import constants from "../../../../config/constants";
import alert from "../../../../utils/alert";

export const listPlaces = async (
  data: ListPlacesBody,
  showMessage: boolean = false,
): Promise<boolean | Array<any>> => {
  try {
    const result = await api.post(constants.API.PLACES, data);
    console.log(result);
    return result;
  } catch (e) {
    // continue
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
