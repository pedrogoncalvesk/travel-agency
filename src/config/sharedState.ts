import React from "react";

// eslint-disable-next-line no-unused-vars
import { Place } from "../routes/helpers/types";
import stateManager from "../utils/StateManager";
import constants from "./constants";

export const initialState: GlobalStateProps = {
  isDrawerOpen: false,
  isLoading: false,
  loadingMessage: "",
  locale: "pt-BR",
  flightFrom: {},
  flightTo: {},
  dateBegin: "",
  dateEnd: "",
  flights: [],
};

const useGlobalState = stateManager(initialState, {
  local: `${constants.STORAGE_PREFIX_KEY}root`,
  blacklist: ["isLoading", "loadingMessage", "isDrawerOpen"],
});

export const GlobalContext = React.createContext(useGlobalState);

export interface GlobalStateProps {
  isDrawerOpen: boolean;
  isLoading: boolean;
  loadingMessage: string;
  locale: string;
  flightFrom: object | Place;
  flightTo: object | Place;
  flights: Array<any>;
  dateBegin: string;
  dateEnd: string;
}
