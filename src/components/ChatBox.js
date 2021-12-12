import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import NavLink from "./NavLink";
import { Button, Block, Input, Text } from "./elements";
import Spacer from "./Spacer";
import io from "socket.io-client";
import { theme, mocks } from "../constants";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");

let socket;

const ChatBox = (props) => {
  const { id, userName, navigation, addMessage, messagesList } = props;
  const [msg, setMsg] = useState("");
  // const [messages, setMessages] = useState(props.messagesList);
  const [visible, setVisible] = useState(true);

  const handlePress = () => {
    setMessages([...messages, { text: msg, user: "sufyan" }]);
    setMsg("");
  };

  const [chatUserName, setChatUserName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(messagesList);
  const ENDPOINT = "https://greenverse-chat.herokuapp.com/";

  useEffect(() => {
    const disconnect = navigation.addListener("blur", () => {
      socket.disconnect();
    });

    return disconnect;
  }, [navigation]);

  useEffect(() => {
    socket = io(ENDPOINT);

    setChatUserName(userName);
    setRoom(id);
    console.log("join room :", userName, id);

    socket.emit("join", { name: userName, room: id }, (error) => {
      if (error) {
        Alert.alert(error);
      }
    });
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("message to send: ", message);
    if (message) {
      socket.emit("sendMessage", message, () => {
        setMessage("");
        addMessage({ id, user: userName, text: message });
      });

      console.log("message to send: ", message);
    }
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
                      message.user.toLowerCase().trim() !==
                      userName.toLowerCase().trim()
                        ? styles.leftContainer
                        : styles.rightContainer
                    }
                    key={index}
                  >
                    <Text style={styles.username}>
                      {message.user.toLowerCase().trim()}
                    </Text>
                    <Text
                      style={
                        message.user.toLowerCase().trim() !==
                        userName.toLowerCase().trim()
                          ? null
                          : styles.white
                      }
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
              onChangeText={setMessage}
              defaultValue={message}
            />
            <TouchableOpacity onPress={sendMessage}>
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
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginTop: 3,
    backgroundColor: theme.colors.accent,
    borderRadius: 10,
  },
  rightContainer: {
    alignSelf: "flex-end",
    width: width * 0.45,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginTop: 3,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
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
    marginBottom: 3,
    alignSelf: "flex-end",
  },
});

export default ChatBox;
