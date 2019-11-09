import React from "react";
import { Platfrom } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";
import styles from "../styles";
import NavIcon from "./NavIcon";
import { Platform } from "@unimodules/core";

const Container = styled.TouchableOpacity`
  padding-right: 20px;
`;

export default withNavigation(({ navigation }) => (
  <Container onPress={() => navigation.navigate("MessageNavigation")}>
    <NavIcon
      name={(Platform.OS = "ios" ? "ios-paper-plane" : "md-paper-plane")}
    />
  </Container>
));
