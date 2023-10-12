import React from "react";

import { STATUS } from "#utils/constants";

const appContextReducer = (appContext, action) => {
  switch (action.type) {
    case "update":
      return { ...appContext, ...action.newValues };
    default:
      return appContext;
  }
};

const defaultContext = {
  status: STATUS.complete,
};

const AppContext = React.createContext();

const AppContextProvider = ({ children }) => {
  const [appContext, dispatch] = React.useReducer(
    appContextReducer,
    defaultContext
  );
  const contextValue = { appContext, dispatch };
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

const useAppContext = () => {
  const { appContext, dispatch: _dispatch } = React.useContext(AppContext);
  return {
    appContext,
    dispatch: (newValues) => _dispatch({ type: "update", newValues }),
  };
};

export { AppContextProvider, useAppContext };
