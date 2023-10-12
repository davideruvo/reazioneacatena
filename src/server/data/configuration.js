import { dataObject } from "#server/data/dataManager";

const defaultValue = { useDarkTheme: false };

const configuration = new dataObject({
  key: "configuration",
  defaultValue,
  functions: {},
});

export default configuration;
