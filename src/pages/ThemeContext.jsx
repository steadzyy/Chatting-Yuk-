
import { createContext, useState } from "react";

const themes = {
  light: "pastel",
  dark: "luxury",
};

export const themeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
  themes,
});

export default function ThemeProvider(props) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <themeContext.Provider
      value={{
        theme: theme,
        toggleTheme,
        themes,
      }}
    >
      {props.children}
    </themeContext.Provider>
  );
}
// import { createContext, useState } from "react";

// const themes = {
//   ligh: {
//     bg: "",
//     text: "",
//   },
//   dark: {
//     bg: "",
//     text: "",
//   },
// };

// export const ThemeContext = createContext({
//   theme: "",
//   setTheme: () => {
//     themes;
//   },
// });

// export default function ThemeProvide(props) {
//     const [theme, setTheme] = useState("light");
//     return (
//         <>
//             <ThemeContext.Provider>
//         </>
//     )
// }