import React, { useState, useContext } from "react";
import { Image, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Divider, Button, Block, Text, Input } from "../components/elements";
import ImageSelecter from "../components/ImageSelecter";
import { theme } from "../constants";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Context as AuthContext } from "../context/AuthContext";

const { width, height } = Dimensions.get("window");

const SettingsScreen = () => {
  const {
    state: { email, imageUri, userName, userId, contact, userType },
    signout,
    updateInfo,
  } = useContext(AuthContext);
  const [newUserName, setName] = useState(userName);
  const [newEmail, setEmail] = useState(email);
  const [newContact, setContact] = useState(contact);
  const [changePicture, setChangePicture] = useState(false);
  const [image, setImage] = useState(null);

  const handleEdits = async () => {
    updateInfo(newUserName, newEmail, newContact, userId);
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
            <SimpleLineIcons name="logout" size={24} color="black" />
          </Button>
          <Button onPress={() => setChangePicture(true)}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.avatar} />
            ) : image ? (
              <Image source={{ uri: image }} style={styles.avatar} />
            ) : (
              <Image
                source={require("../../assets/blank-avatar.png")}
                style={styles.avatar}
              />
            )}
          </Button>
        </Block>
      </Block>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Block style={styles.inputs}>
          <Block row center space="between">
            <Text primary>User Type:</Text>
            <Text primary style={styles.input}>
              {userType}
            </Text>
          </Block>
        </Block>

        <Block style={styles.inputs}>
          <Block row center space="between">
            <Text primary>Username:</Text>
            <Input
              defaultValue={userName}
              style={styles.input}
              onChangeText={setName}
            />
          </Block>

          <Block row center space="between">
            <Text primary>Email:</Text>
            <Input
              defaultValue={email}
              style={styles.input}
              onChangeText={setEmail}
            />
          </Block>

          <Block row center space="between">
            <Text primary>Contact:</Text>
            <Input
              defaultValue={contact}
              style={[styles.input, { padding: 0 }]}
              onChangeText={setContact}
            />
          </Block>

          {newUserName !== userName ||
          newEmail !== email ||
          newContact !== contact ? (
            <Block center>
              <Button
                style={{ width: width * 0.4 }}
                color={theme.colors.black}
                onPress={handleEdits}
              >
                <Text bold white center>
                  Save
                </Text>
              </Button>
            </Block>
          ) : null}
        </Block>

        <Divider margin={[theme.sizes.base, theme.sizes.base * 2]} />
      </ScrollView>
      <ImageSelecter
        image={image}
        setImage={setImage}
        setChangePicture={setChangePicture}
        changePicture={changePicture}
      />
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
