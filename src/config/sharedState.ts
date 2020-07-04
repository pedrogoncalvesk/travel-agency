import React from "react";

import stateManager from "../utils/StateManager";
import constants from "./constants";

const useGlobalState = stateManager(
  {
    isDrawerOpen: false,
    isLoading: false,
    loadingMessage: "",
    storageMetadata: {},
    flights: [],
  },
  {
    local: `${constants.STORAGE_PREFIX_KEY}root`,
    blacklist: ["isLoading", "loadingMessage", "isDrawerOpen"],
  },
);

export const GlobalContext = React.createContext(useGlobalState);
