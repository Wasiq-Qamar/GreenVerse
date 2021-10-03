import React, { useContext } from "react";
import { Dimensions, Image, StyleSheet, ScrollView } from "react-native";
import { LinearProgress } from "react-native-elements";
import { Badge, Button, Block, Text, Divider } from "../components/elements";
import Spacer from "../components/Spacer";
import ChatBox from "../components/ChatBox";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { theme, mocks } from "../constants";
const { width } = Dimensions.get("window");
import { Context as AuthContext } from "../context/AuthContext";
import { Context as TaskContext } from "../context/TaskContext";

const DonationChannelScreen = ({ route }) => {
  const { name, amount, date } = route.params;
  const {
    state: { imageUri, email },
  } = useContext(AuthContext);
  const { state } = useContext(TaskContext);
  const users = ["Wasiq Qamar", "Sufyan Khan", "Other User", "Test User"];

  const updates = [
    {
      time: "15-06-2021  12:45",
      text: "Donation Recevied by organization",
    },
    {
      time: "16-06-2021  10:06",
      text: "Items bought with donation amount tobe donated",
    },
    {
      time: "17-06-2021 10:33",
      text: "Donation Items sent to Receiver",
    },
    {
      time: "17-06-2021  16:24",
      text: "Donation Items Delivered and Received",
    },
  ];

  return (
    <Block white>
      <Block flex={false} row center space="between" style={styles.header}>
        <Text style={{ width: width * 0.6 }} primary h1 bold>
          Donation Channel
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

      <ScrollView showsVerticalScrollIndicator={false}>
        <Block flex={1} column style={styles.tasks}>
          <Block flex={false} column>
            <Block row flex={false} space="around">
              <Badge margin={[0, 0, 15]} size={60}>
                <Image
                  source={require("../../assets/images/edhi_icon.jpg")}
                  style={styles.image}
                />
              </Badge>
              <Block column flex={false} margin={[0, 0]}>
                <Text h2 bold primary style={{ width: width / 2 }}>
                  {name}
                </Text>
                <Text h3 bold primary style={{ width: width / 2 }}>
                  Rs. {amount}
                </Text>
                <Text h4 bold primary style={{ width: width / 2 }}>
                  {date}
                </Text>
              </Block>
            </Block>
            <Divider />
            <Block padding={[20, 0]}>
              <Text h2 bold>
                Donation Progress
              </Text>
              {updates.map((update, index) => (
                <Block key={index}>
                  <Spacer>
                    <Block row space="around" style={styles.updateContainer}>
                      <Text style={{ width: width * 0.2 }}>{update.time}</Text>
                      <Text style={{ width: width * 0.1 }}>|</Text>
                      <Text style={{ width: width * 0.5 }}>{update.text}</Text>
                    </Block>
                  </Spacer>
                </Block>
              ))}
            </Block>
          </Block>
        </Block>
        <>
          <ChatBox messagesList={mocks.donationMessages} />
        </>
      </ScrollView>
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
  tasks: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingVertical: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5,
  },
  topButtons: {
    width: width * 0.1,
    borderRadius: 25,
  },
  task: {
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 1,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 1,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 1,
  },
  taskText: {
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 1.5,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 1.5,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 1.5,
  },
  image: { width: 65, height: 65, borderRadius: 50 },
  progress: {
    width: width / 4,
    marginTop: 8,
  },
  updateContainer: {
    borderLeftColor: theme.colors.primary,
    borderLeftWidth: 2,
    paddingHorizontal: 15,
  },
});
export default DonationChannelScreen;
