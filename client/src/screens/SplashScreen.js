import React, { useContext, useEffect } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { Image, View } from "react-native";
import { Block } from "../components/elements";

const SplashScreen = () => {
  const {
    clearIsLoading,
    state: { token },
  } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      clearIsLoading();
    }
  }, []);

  return (
    <Block
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f8f8",
      }}
    >
      <Image source={require("../../assets/splash.png")} />
    </Block>
  );
};

export default SplashScreen;
