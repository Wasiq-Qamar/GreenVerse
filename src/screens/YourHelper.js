import React, { useContext, useState, useEffect, useCallback } from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import { Block, Button, Text } from "../components/elements";
import { theme } from "../constants";
import { Context as AuthContext } from "../context/AuthContext";
import { View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { Dialogflow_V2 } from "react-native-dialogflow";
import dialogflowConfig from "../../config.json";

const BOT_USER = {
  _id: 2,
  name: "Your Helper",
  avatar:
    "https://media.istockphoto.com/vectors/chat-bot-robot-avatar-in-circle-round-shape-isolated-on-white-stock-vector-id1250000899?k=20&m=1250000899&s=170667a&w=0&h=PmKAjrRbSAwobkDCOh55X4GeMXIvLHAHKOIlFc41D7k=",
};

const YourHelper = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);
  const {
    state: { imageUri, userId, email, userName },
  } = useContext(AuthContext);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hi, I am Your Helper. Welcome to Greenverse. How may I help you?",
        createdAt: new Date(),
        user: BOT_USER,
      },
    ]);
  }, []);

  useEffect(() => {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id
    );
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    let message = messages[0].text;
    Dialogflow_V2.requestQuery(
      message,
      (result) => handleResponse(result),
      (error) => console.log(error)
    );
  }, []);

  const handleResponse = (result) => {
    // console.log(result);
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    let id = result.responseId;
    // let payload = result.queryResult.webhookPayload;
    showResponse(text, id);
  };

  const showResponse = useCallback((text, id) => {
    let msg = {
      _id: id,
      text,
      createdAt: new Date(),
      user: BOT_USER,
    };
    // if (payload && payload.is_url) {
    //   msg.text = "image";
    //   msg.image = text;
    // }
    setMessages((previousMessages) => GiftedChat.append(previousMessages, msg));
  }, []);

  return (
    <Block white>
      <Block flex={false} row center space="between" style={styles.header}>
        <Text primary h1 bold>
          Your Helper
        </Text>
        <Button onPress={() => navigation.navigate("Settings")}>
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

      <View style={styles.container}>
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </View>
    </Block>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  avatar: {
    height: theme.sizes.base * 3,
    width: theme.sizes.base * 3,
    borderRadius: 50,
  },
  container: {
    flex: 1,
  },
});
export default YourHelper;
