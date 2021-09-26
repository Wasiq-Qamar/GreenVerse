import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import NavLink from "./NavLink";
import { Button, Block, Input, Text } from "./elements";
import Spacer from "./Spacer";
import { theme, mocks } from "../constants";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");

const ChatBox = (props) => {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState(props.messagesList);
  const [visible, setVisible] = useState(true);

  const handlePress = () => {
    setMessages([...messages, { text: msg, user: "sufyan" }]);
    setMsg("");
  };

  return (
    <Block>
      <Block style={styles.titleContainer} row>
        <Text style={styles.title}>Chat Corner</Text>
        {visible ? (
          <TouchableOpacity onPress={() => setVisible(!visible)}>
            <AntDesign name="down" size={24} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setVisible(!visible)}>
            <AntDesign name="up" size={24} color="black" />
          </TouchableOpacity>
        )}
      </Block>
      {!visible ? null : (
        <>
          <Block style={styles.chatContainer}>
            <ScrollView nestedScrollEnabled={true}>
              {messages.map((message, index) => {
                return (
                  <Block
                    right
                    style={
                      message.user === "sufyan"
                        ? styles.leftContainer
                        : styles.rightContainer
                    }
                    key={index}
                  >
                    <Text style={styles.username}>{message.user}</Text>
                    <Text
                      style={message.user === "wasiq" ? styles.white : null}
                    >
                      {message.text}
                    </Text>
                  </Block>
                );
              })}
            </ScrollView>
          </Block>
          <Block style={styles.newMessageContainer} row>
            <TextInput
              placeholder="Type a Message"
              style={{ width: width * 0.8 }}
              onChangeText={setMsg}
              defaultValue={msg}
            />
            <TouchableOpacity onPress={handlePress}>
              <Feather
                name="send"
                size={24}
                color="black"
                style={{ width: width * 0.2 }}
              />
            </TouchableOpacity>
          </Block>
        </>
      )}
    </Block>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    borderTopWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -100,
    marginHorizontal: 10,
    height: height * 0.05,
    maxHeight: height * 0.05,
    backgroundColor: "#f3f3f3",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1.5,
    width: width * 0.8,
    textAlign: "center",
  },
  chatContainer: {
    // borderWidth: 1,
    padding: 15,
    overflow: "scroll",
    marginHorizontal: 10,
    height: height * 0.3,
  },
  leftContainer: {
    alignSelf: "flex-start",
    width: width * 0.45,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginTop: 3,
    backgroundColor: theme.colors.accent,
    borderRadius: 20,
  },
  rightContainer: {
    alignSelf: "flex-end",
    width: width * 0.45,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginTop: 3,
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
  },
  white: {
    color: theme.colors.white,
  },
  newMessageContainer: {
    // borderWidth: 1,
    padding: 15,
    marginBottom: 20,
    marginHorizontal: 10,
    height: height * 0.07,
    backgroundColor: "#f3f3f3",
    borderBottomWidth: 1,
  },
  input: {
    width: width * 0.7,
    overflow: "scroll",
  },
  username: {
    color: "#828282",
    fontSize: 12,
  },
});

export default ChatBox;
