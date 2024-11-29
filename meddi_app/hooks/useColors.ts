export function useColors() {
  return Colors;
}

const tintColor = "#0a7ea4";
const errorColor = "#FF0000";

const Colors = {
  text: "#11181C",
  background: "#fff",
  tint: tintColor,
  icon: "#687076",
  tabIconDefault: "#687076",
  tabIconSelected: tintColor,
  buttonBackground: "#829ab1",
  error: errorColor,
  link: "#0a7ea4",
  button: {
    background: "#11181C",
    text: "#fff",
  },
  input: {
    border: "#11181C",
    error: errorColor,
    hint: "#11181C",
    disabled: "#11181C99",
  },
};

export const spacing = (x: number) => x * 4;
