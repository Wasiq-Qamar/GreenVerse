import React, { useState, useContext } from "react";
import {
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  Modal,
  Alert,
} from "react-native";
import { Tooltip } from "react-native-elements";

import { Divider, Button, Block, Text, Input } from "../components/elements";
import { theme, mocks } from "../constants";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

import { Context as AuthContext } from "../context/AuthContext";

const { width, height } = Dimensions.get("window");

const SettingsScreen = () => {
  const profile = mocks.profile;
  const { signout } = useContext(AuthContext);
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [password, setPassword] = useState(profile.password);
  const [changePicture, setChangePicture] = useState(false);

  const ButtonAlert = () =>
    Alert.alert("Change Profile Picture", "Select new Image", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  const renderModal = () => {
    return (
      <Modal
        animationType="fade"
        visible={changePicture}
        onRequestClose={() => setChangePicture(false)}
      >
        <Block>
          <Block flex={5}>
            <Block>
              <Image
                source={require("../../assets/images/avatar.png")}
                style={{ height: height, width: width }}
              />
            </Block>
          </Block>

          <Block bottom center flex={1}>
            <Block row>
              <Button
                style={{ width: width * 0.4, marginRight: 15 }}
                color={theme.colors.black}
                onPress={ButtonAlert}
              >
                <Text bold white center>
                  Upload Image
                </Text>
              </Button>
              <Button
                style={{ width: width * 0.4 }}
                color={theme.colors.black}
                onPress={ButtonAlert}
              >
                <Text bold white center>
                  Remove Image
                </Text>
              </Button>
            </Block>
            <Button
              style={{ width: width * 0.85 }}
              onPress={() => setChangePicture(false)}
              color={theme.colors.black}
            >
              <Text bold center white>
                Done
              </Text>
            </Button>
          </Block>
        </Block>
      </Modal>
    );
  };

  return (
    <Block white paddingTop={50}>
      <Block flex={false} row center space="between" style={styles.header}>
        <Block flex={3}>
          <Text h1 bold primary>
            Settings.
          </Text>
        </Block>
        <Block flex={1} row space="between">
          <Button onPress={signout}>
            <Tooltip
              backgroundColor={theme.colors.gray2}
              popover={<Text>Logout</Text>}
            >
              <SimpleLineIcons name="logout" size={24} color="black" />
            </Tooltip>
          </Button>
          <Button onPress={() => setChangePicture(true)}>
            <Image
              source={require("../../assets/images/avatar.png")}
              style={styles.avatar}
            />
          </Button>
        </Block>
      </Block>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Block style={styles.inputs}>
          <Block row center space="between">
            <Text primary>Username:</Text>
            <Input
              defaultValue={name}
              onChangeText={setName}
              style={styles.input}
            />
          </Block>

          <Block row center space="between">
            <Text primary>Email:</Text>
            <Input
              defaultValue={email}
              onChangeText={setEmail}
              style={styles.input}
            />
          </Block>

          <Block row center space="between">
            <Text primary>Password:</Text>
            <Input
              secure
              defaultValue={password}
              onChangeText={setPassword}
              style={[styles.input, { padding: 0 }]}
            />
          </Block>
        </Block>

        <Divider margin={[theme.sizes.base, theme.sizes.base * 2]} />
      </ScrollView>
      {renderModal()}
    </Block>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  avatar: {
    height: theme.sizes.base * 3,
    width: theme.sizes.base * 3,
    borderRadius: 50,
  },
  inputs: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  input: {
    width: width * 0.7,
    paddingHorizontal: 10,
    overflow: "scroll",
  },
  sliders: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  thumb: {
    width: theme.sizes.base,
    height: theme.sizes.base,
    borderRadius: theme.sizes.base,
    borderColor: "white",
    borderWidth: 3,
    backgroundColor: theme.colors.secondary,
  },
  toggles: {
    paddingHorizontal: theme.sizes.base * 2,
  },
});
