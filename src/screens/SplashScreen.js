import React, { useContext, useEffect } from "react";
import { Context as AuthContext } from "../context/AuthContext";

const SplashScreen = () => {
  const { clearIsLoading } = useContext(AuthContext);

  useEffect(() => {
    clearIsLoading();
  }, []);

  return null;
};

export default SplashScreen;
