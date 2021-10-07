import React, { useContext, useState } from "react";
import { Dimensions, Image, StyleSheet, ScrollView } from "react-native";
import { LinearProgress } from "react-native-elements";
import {
  Badge,
  Button,
  Block,
  Text,
  Divider,
  Input,
} from "../components/elements";
import ImageSelecter2 from "../components/ImageSelecter2";
import Spacer from "../components/Spacer";
import ChatBox from "../components/ChatBox";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import AwesomeAlert from "react-native-awesome-alerts";

import { theme, mocks } from "../constants";
const { width } = Dimensions.get("window");
import { Context as AuthContext } from "../context/AuthContext";
import { Context as TaskContext } from "../context/TaskContext";

const TaskChannelScreen = ({ route, navigation }) => {
  const {
    campaign,
    manager,
    description,
    location,
    fromTime,
    toTime,
    peopleNeeded,
    peopleEnlisted,
  } = route.params;
  const [name, setName] = useState(route.params.name);
  const [date, setDate] = useState(route.params.date);
  const {
    state: { imageUri, email },
  } = useContext(AuthContext);
  const { state } = useContext(TaskContext);
  const [users, setUsers] = useState([
    "Wasiq Qamar",
    "Sufyan Khan",
    "Other User",
    "Test User",
  ]);

  const [changePicture, setChangePicture] = useState(false);
  const [image, setImage] = useState(null);

  const [showAlertJob, setShowAlertJob] = useState(false);
  const [showAlertImage, setShowAlertImage] = useState(false);
  const [showAlertUser, setShowAlertUser] = useState(false);
  const [showAlertEdit, setShowAlertEdit] = useState(false);

  return (
    <Block white>
      <Block flex={false} row center space="between" style={styles.header}>
        <Text style={{ width: width * 0.4 }} primary h1 bold>
          Task Channel
        </Text>
        <Button onPress={() => navigation.navigate("SettingsScreen")}>
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <Block flex={1} column style={styles.tasks}>
          <Block flex={false} column>
            <Block row flex={false}>
              <Badge margin={[0, 0, 15]} size={60}>
                {campaign === "garbageRecycling" ? (
                  <Image
                    source={require("../../assets/icons/recycle.png")}
                    style={styles.image}
                  />
                ) : campaign === "treePlantation" ? (
                  <Image
                    source={require("../../assets/icons/plant.jpg")}
                    style={styles.image}
                  />
                ) : (
                  <Image
                    source={require("../../assets/icons/default.jpg")}
                    style={styles.image}
                  />
                )}
              </Badge>
              <Block column flex={false} margin={[5, 0]} padding={[0, 0, 0, 5]}>
                <Text h2 bold primary style={{ width: width / 2 }}>
                  {name}
                </Text>
                <Text h3 bold primary style={{ width: width / 2 }}>
                  {location}
                </Text>
                <Text h4 bold primary style={{ width: width / 2 }}>
                  {manager}
                </Text>
              </Block>
              <Block row space="between">
                <Button
                  style={styles.topButtons}
                  color={theme.colors.accent}
                  onPress={() => setShowAlertEdit(!showAlertEdit)}
                >
                  <Text h4 white center>
                    <Feather name="edit" size={28} color="black" />
                  </Text>
                </Button>
                <Button style={styles.topButtons} color={theme.colors.accent}>
                  <Text h4 white center>
                    <AntDesign name="shoppingcart" size={28} color="black" />
                  </Text>
                </Button>
              </Block>
            </Block>
            <Block flex={false}>
              <Text h3 bold>
                Description:
              </Text>
              <Spacer>
                <Text h4>{description}</Text>
              </Spacer>
            </Block>
            <Block column flex={false}>
              <Text h3 bold>
                Details:
              </Text>
              <Spacer>
                <Text h4 primary style={{ width: width / 2 }}>
                  Date: {"  "}
                  {date}
                </Text>
                <Text h4 primary style={{ width: width / 2 }}>
                  Time: {"  "}
                  {fromTime + " - " + toTime}
                </Text>
                <Text h4 primary style={{ width: width / 2 }}>
                  Persons Needed: {"  "}
                  {peopleNeeded}
                </Text>
              </Spacer>
            </Block>
            <Block>
              <Text h3 bold>
                Current Users:
              </Text>
              <Spacer>
                {peopleEnlisted.map((user, index) => (
                  <Block key={index}>
                    <Block row space="between">
                      <Block column>
                        <Block row>
                          <Text h3>{index}. </Text>
                          <Text h3>{user}</Text>
                        </Block>
                        <LinearProgress
                          color="primary"
                          value={index / 10 + 0.1}
                          variant="determinate"
                          style={styles.progress}
                        />
                      </Block>

                      <Button
                        style={[styles.userButtons, { marginTop: -15 }]}
                        color={theme.colors.primary}
                        onPress={() => setShowAlertJob(!showAlertJob)}
                      >
                        <Text h4 white center>
                          <MaterialIcons
                            name="assignment"
                            size={20}
                            color="white"
                          />
                        </Text>
                      </Button>
                      <Button
                        style={[styles.userButtons, { marginTop: -15 }]}
                        color={theme.colors.primary}
                        onPress={() => setShowAlertImage(!showAlertImage)}
                      >
                        <Text h4 white center>
                          <Entypo name="image" size={20} color="white" />
                        </Text>
                      </Button>
                      <Button
                        style={[styles.userButtons, { marginTop: -15 }]}
                        color={theme.colors.primary}
                        onPress={() => setShowAlertUser(!showAlertUser)}
                      >
                        <Text h4 white center style>
                          <AntDesign
                            name="deleteuser"
                            size={20}
                            color="white"
                          />
                        </Text>
                      </Button>
                    </Block>
                    <Divider />
                  </Block>
                ))}
              </Spacer>
            </Block>
          </Block>
        </Block>
        <>
          <ChatBox messagesList={mocks.taskMessages} />
        </>
      </ScrollView>

      {/* JOB ASSIGN MODAL */}
      <AwesomeAlert
        show={showAlertJob}
        showProgress={false}
        title="Assign Task"
        customView={
          <>
            <Input
              placeholder="Type Job description here..."
              style={{ width: width * 0.7, paddingHorizontal: 15 }}
            />
          </>
        }
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Cancel"
        confirmText="Assign"
        confirmButtonColor={theme.colors.accent}
        cancelButtonColor="#ff0e0e"
        onCancelPressed={() => {
          setShowAlertJob(!showAlertJob);
        }}
        onConfirmPressed={() => {
          setShowAlertJob(!showAlertJob);
        }}
        contentContainerStyle={{ width: width * 0.8 }}
      />

      {/* IMAGE UPLOAD MODAL */}
      <AwesomeAlert
        show={showAlertImage}
        showProgress={false}
        title="Upload Image"
        customView={
          <>
            <Button
              style={styles.uploadButton}
              onPress={() => setChangePicture(true)}
            >
              <Text style={{ color: theme.colors.white }}>Select Image</Text>
            </Button>
          </>
        }
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Cancel"
        confirmText="Upload"
        confirmButtonColor={theme.colors.accent}
        cancelButtonColor="#ff0e0e"
        onCancelPressed={() => {
          setShowAlertImage(!showAlertImage);
        }}
        onConfirmPressed={() => {
          setShowAlertImage(!showAlertImage);
        }}
        contentContainerStyle={{ width: width * 0.8 }}
      />

      {/* REMOVE USER MODAL */}
      <AwesomeAlert
        show={showAlertUser}
        showProgress={false}
        title="Remove User"
        message="Are you sure you want to remove"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Cancel"
        confirmText="Remove"
        cancelButtonColor={theme.colors.accent}
        confirmButtonColor="#ff0e0e"
        onCancelPressed={() => {
          setShowAlertUser(!showAlertUser);
        }}
        onConfirmPressed={() => {
          setUsers(users.filter((user) => user !== "Wasiq Qamar"));
          setShowAlertUser(!showAlertUser);
        }}
        contentContainerStyle={{ width: width * 0.8 }}
      />

      {/*EDIT TASK MODAL */}
      <AwesomeAlert
        show={showAlertEdit}
        showProgress={false}
        title="Edit Task"
        customView={
          <>
            <Input
              defaultValue={name}
              style={{ width: width * 0.7, paddingHorizontal: 15 }}
              onChangeText={setName}
            />
            <Input
              defaultValue={date}
              style={{ width: width * 0.7, paddingHorizontal: 15 }}
              onChangeText={setDate}
            />
          </>
        }
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Cancel"
        confirmText="Update"
        cancelButtonColor="#ff0e0e"
        confirmButtonColor={theme.colors.accent}
        onCancelPressed={() => {
          setShowAlertEdit(!showAlertEdit);
        }}
        onConfirmPressed={() => {
          setUsers(users.filter((user) => user !== "Wasiq Qamar"));
          setShowAlertEdit(!showAlertEdit);
        }}
        contentContainerStyle={{ width: width * 0.8 }}
      />

      <ImageSelecter2
        image={image}
        setImage={setImage}
        setChangePicture={setChangePicture}
        changePicture={changePicture}
      />
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
    width: width * 0.11,
    marginRight: 1,
    borderRadius: 25,
  },
  userButtons: {
    marginRight: 1,
    width: width * 0.11,
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
  image: { width: 50, height: 50, borderRadius: 50 },
  progress: {
    width: width / 3,
    marginTop: 8,
  },
  uploadButton: {
    width: width * 0.5,
    paddingHorizontal: 15,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
  },
});
export default TaskChannelScreen;
