// eslint-disable-next-line no-unused-vars
import { BrowseQuotesBody, BrowseQuotesResponse } from "../../../helpers/types";
import api from "../../../../utils/request/api";
import constants from "../../../../config/constants";
import alert from "../../../../utils/alert";

export const browseQuotes = async (
  data: BrowseQuotesBody,
  showMessage: boolean = false,
): Promise<boolean | BrowseQuotesResponse> => {
  try {
    return api.post(constants.API.QUOTES, data);
  } catch (e) {
    // continue
    // eslint-disable-next-line no-console
    console.log("error", e);
  }

  if (showMessage) {
    alert(
      "Oops...",
      "Houve um problema ao tentar buscar as rotas. Por favor, tente novamente.",
    );
  }
  return false;
};
