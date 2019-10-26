import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { AsyncStorage } from "react-native";
import { Asset } from "expo-asset";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import ApolloClient from "apollo-boost";
import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "react-apollo-hooks";
import apolloClientOptions from "./apollo";
import styles from "./styles";
import NavController from "./components/NavController";
import { AuthProvider } from "./AuthContext";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const preLoad = async () => {
    try {
      await Font.loadAsync({
        ...Ionicons.font
      });
      // font를 불러옴
      await Asset.loadAsync([require("./assets/logo.png")]);
      // 이미지를 불러옴

      const cache = new InMemoryCache(); // 현재는 비어져 있는 상태
      // 새로운 캐시를 만듬
      await persistCache({
        cache,
        storage: AsyncStorage // 폰에 있는 asyncStorage를 봄(웹사이트의 localStorage랑 비슷)
      });
      // persist cache는 memory cache에 이는 cache를 가져옴

      const client = new ApolloClient({
        cache,
        ...apolloClientOptions
      });
      // 캐쉬와 아폴로 옵션을 Apollo Provider에 필요한 client를 만듬

      // App에서 먼저 로그인 여부를 확인할 필요가 있음
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if (!isLoggedIn || isLoggedIn === "false") {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }

      setLoaded(true);
      setClient(client);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    preLoad(); //비동기
  }, []);

  return loaded && client && isLoggedIn !== null ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <AuthProvider isLoggedIn={isLoggedIn}>
          <NavController />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <AppLoading />
    // render를 하면 app의 splash screen을 보여주는 컴포넌트
  );
}
