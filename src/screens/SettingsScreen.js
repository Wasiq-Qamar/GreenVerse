import React, { useState, useContext, useEffect } from "react";
import { Image, StyleSheet, ScrollView, Dimensions } from "react-native";
import {
  Divider,
  Button,
  Block,
  Text,
  Input,
  LinkContainer,
} from "../components/elements";
import Spacer from "../components/Spacer";
import ImageSelecter from "../components/ImageSelecter";
import { theme } from "../constants";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as TaskContext } from "../context/TaskContext";

const { width, height } = Dimensions.get("window");

const SettingsScreen = ({ navigation }) => {
  const {
    state: {
      email,
      imageUri,
      userName,
      userId,
      contact,
      userType,
      errorMessage,
    },
    signout,
    updateInfo,
  } = useContext(AuthContext);
  const { fetchTasks } = useContext(TaskContext);

  const [newUserName, setName] = useState(userName);
  const [newEmail, setEmail] = useState(email);
  const [newContact, setContact] = useState(contact);
  const [changePicture, setChangePicture] = useState(false);
  const [image, setImage] = useState(null);

  const handleEdits = async () => {
    updateInfo(newUserName, newEmail, newContact, userId);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Block white paddingTop={50}>
      <Block flex={false} row center style={styles.header}>
        <Block flex={2.5}>
          <Text h1 bold primary>
            Settings
          </Text>
        </Block>
        <Block flex={1.5} row>
          <Button onPress={signout} style={{ marginRight: 15 }}>
            <SimpleLineIcons name="logout" size={24} color="black" />
          </Button>
          {userType !== "Manager" ? null : (
            <Button
              style={{ marginRight: 15 }}
              onPress={() => navigation.navigate("Store")}
            >
              <AntDesign
                name="shoppingcart"
                size={30}
                color={theme.colors.primary}
              />
            </Button>
          )}
          <Button onPress={() => setChangePicture(true)}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.avatar} />
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

          {errorMessage ? (
            <Spacer>
              <Text style={styles.error}>{errorMessage}</Text>
            </Spacer>
          ) : null}

          {newUserName !== userName ||
          newEmail !== email ||
          newContact !== contact ? (
            <Block center>
              <Button
                style={{ width: width * 0.4 }}
                color={theme.colors.primary}
                onPress={handleEdits}
              >
                <Text bold white center>
                  Save
                </Text>
              </Button>
            </Block>
          ) : null}
        </Block>

        <Divider margin={[theme.sizes.base * 0.5, theme.sizes.base * 2]} />

        <Block>
          <LinkContainer text="Manage Tasks" routeName="MyTasks" />
          <LinkContainer text="Manage Donations" routeName="MyDonations" />
        </Block>
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
  error: {
    color: "red",
    textAlign: "center",
  },
});
