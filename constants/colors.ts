type Theme = {
  primary: any;
  secondary: any;
  thirdly: any;
  background: any;
  text: any;
  focused: any;
  activated: any;
  delete: any;
};

const DarkTheme = {
  primary: "#1e2124",
  secondary: "#282b30",
  thirdly: "#36393e",
  background: "#1e2124",
  text: "#ffffff",
  focused: "#000000",
  activated: "#5A8F4A",
  delete: "white",
};

const LightTheme = {
  primary: "#ffffff",
  secondary: "#ffffff",
  thirdly: "#ffffff",
  background: "#efefef",
  text: "#000000",
  focused: "#000000",
  activated: "#C6F9B7",
  delete: "black",
};

export { LightTheme, DarkTheme, Theme };
