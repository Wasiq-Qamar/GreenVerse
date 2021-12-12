import React, { useState, useContext } from "react";
import { StyleSheet } from "react-native";
import NavLink from "./NavLink";
import { Button, Block, Input, Text } from "./elements";
import Spacer from "./Spacer";
import { theme } from "../constants";

const AuthForm = ({
  headerText,
  errorMessage,
  onSubmit,
  submitButtonText,
  navText,
  navRoute,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hasErrors = () => (errorMessage ? styles.hasErrors : null);

  return (
    <Block padding={[0, theme.sizes.base * 2]} white>
      <Text h1 bold>
        {headerText}
      </Text>
      <Block middle>
        <Input
          label="Email"
          error={hasErrors()}
          style={[styles.input, hasErrors()]}
          defaultValue={email}
          onChangeText={setEmail}
        />
        <Input
          secure
          label="Password"
          error={hasErrors()}
          style={[styles.input, hasErrors()]}
          defaultValue={password}
          onChangeText={setPassword}
        />
        {errorMessage ? (
          <Spacer>
            <Text style={styles.error}>{errorMessage}</Text>
          </Spacer>
        ) : null}
        <Button gradient onPress={() => onSubmit({ email, password })}>
          <Text bold white center>
            {submitButtonText}
          </Text>
        </Button>

        {submitButtonText === "Signin" ? (
          <Button>
            <Text
              gray
              caption
              center
              style={{ textDecorationLine: "underline" }}
            >
              Forgot your password?
            </Text>
          </Button>
        ) : null}

        <NavLink text={navText} routeName={navRoute} />
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
  error: {
    color: "red",
    textAlign: "center",
  },
});

export default AuthForm;
