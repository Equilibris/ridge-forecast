import { useColorScheme } from "@/hooks/useColorScheme"
import React, { ReactNode, useMemo } from "react"
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as RNTheme,
} from "@react-navigation/native"
import { ThemeProvider as ETheme } from "@emotion/react"
import {
  MD3DarkTheme,
  PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper"

const theme = {
  ...MD3DarkTheme, // or MD3DarkTheme
  roundness: 2,
  colors: {
    ...MD3DarkTheme.colors,
  },
  padding: (entry: number) => `${entry * 8}px`,
}

/*
 * Grad end 536CAA
 * Grad start 212B44
 * Off colour ECF0F9
 * Dark 212B44
 *
 */

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // const colorScheme = useColorScheme();

  const rnTheme = useMemo(
    () =>
      adaptNavigationTheme({
        reactNavigationDark: DarkTheme,
        materialDark: theme,
      }),
    [],
  )
  // const rnTheme = useMemo(
  //   () => (colorScheme === "dark" ? DarkTheme : DefaultTheme),
  //   [colorScheme],
  // );

  return (
    <ETheme theme={theme}>
      <PaperProvider theme={theme}>
        <RNTheme value={rnTheme.DarkTheme}>{children}</RNTheme>
      </PaperProvider>
    </ETheme>
  )
}
