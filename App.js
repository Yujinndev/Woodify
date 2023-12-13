import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import MainNavigation from "./navigation/MainNavigation";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Colors from "./constants/Colors";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: "always",
    },
  },
});

const App = () => {
  const [fontsLoaded] = useFonts({
    Montserrat: require("./assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-sb": require("./assets/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat-b": require("./assets/fonts/Montserrat-Bold.ttf"),
    Petemoss: require("./assets/fonts/Petemoss-Regular.ttf"),
    Inter: require("./assets/fonts/Inter.ttf"),
    Lora: require("./assets/fonts/Lora.ttf"),
    Poppins: require("./assets/fonts/Poppins-Bold.ttf"),
    Lilita: require("./assets/fonts/LilitaOne-Regular.ttf"),
    PaytoneOne: require("./assets/fonts/PaytoneOne-Regular.ttf"),
  });

  const theme = {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.primary,
      secondary: Colors.secondary,
    },
  };

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    async function initializeApp() {
      await prepare();
      SplashScreen.hideAsync();
    }

    initializeApp();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="auto" />
      <PaperProvider theme={theme}>
        <MainNavigation />
      </PaperProvider>
    </QueryClientProvider>
  );
};

export default App;
