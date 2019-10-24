import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Text, View, AsyncStorage } from "react-native";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo-hooks";
import apolloClientOptions from "./apollo";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const preLoad = async () => {
    try {
      await Font.loadAsync({
        ...Ionicons.font
      });
      await Asset.loadAsync([require("./assets/logo.png")]);

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
      setLoaded(true);
      setClient(client);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    preLoad(); //비동기
  }, []);
  return loaded && client ? (
    <ApolloProvider client={client}>
      <View>
        <Text>Hello</Text>
      </View>
    </ApolloProvider>
  ) : (
    <AppLoading />
    // render를 하면 app의 splash screen을 보여주는 컴포넌트
  );
}
