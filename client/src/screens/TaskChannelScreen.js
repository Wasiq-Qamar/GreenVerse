import React, { useContext, useState, useEffect } from "react";
import { Dimensions, Image, StyleSheet, ScrollView, Alert } from "react-native";
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
import DateTimePicker from "@react-native-community/datetimepicker";

import { theme, mocks } from "../constants";
const { width, height } = Dimensions.get("window");
import { Context as AuthContext } from "../context/AuthContext";
import { Context as TaskContext } from "../context/TaskContext";

const TaskChannelScreen = ({ route, navigation }) => {
  const {
    taskId,
    campaign,
    manager,
    description,
    location,
    fromTime,
    toTime,
    peopleNeeded,
    taskName,
    messages,
  } = route.params;

  const [name, setName] = useState(route.params.taskName);
  const [date, setDate] = useState(route.params.date);
  const [people, setPeople] = useState(route.params.peopleNeeded);
  const [peopleEnlisted, setPeopleEnlisted] = useState(
    route.params.peopleEnlisted
  );
  const [selectedUser, setSelectedUser] = useState("");

  const {
    state: { imageUri, email, userId, userName, userType },
  } = useContext(AuthContext);
  const { state, assignJob, removeFromTask, editTask, addMessage } =
    useContext(TaskContext);

  const [changePicture, setChangePicture] = useState(false);
  const [image, setImage] = useState(null);
  const [jobText, setJobText] = useState("");

  const [showAlertJob, setShowAlertJob] = useState(false);
  const [showAlertViewJob, setShowAlertViewJob] = useState(false);
  const [currentJob, setCurrentJob] = useState(false);
  const [showAlertImage, setShowAlertImage] = useState(false);
  const [showAlertViewImage, setShowAlertViewImage] = useState(false);
  const [currentImage, setCurrentImage] = useState(false);
  const [showAlertUser, setShowAlertUser] = useState(false);
  const [showAlertEdit, setShowAlertEdit] = useState(false);

  const handleAssignJob = () => {
    setShowAlertJob(!showAlertJob);
    assignJob({ id: taskId, userId, job: jobText });
  };

  const handleRemoveUser = () => {
    let filteredUsers = peopleEnlisted.filter(
      (item) => item.user._id !== selectedUser
    );
    setPeopleEnlisted(filteredUsers);
    setShowAlertUser(!showAlertUser);
    removeFromTask({ id: taskId, userId: selectedUser });
  };

  const handleEditTask = () => {
    editTask({ id: taskId, date, taskName: name });
  };

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
              <Badge margin={[0, 0, 12]} size={60}>
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
              <Block column flex={false} style={{ marginBottom: 15 }}>
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

              {userType === "Manager" ? (
                <Block row style={{ marginLeft: -10 }}>
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
              ) : null}
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
                {peopleEnlisted.map((item, index) => (
                  <Block key={index}>
                    <Block row space="between">
                      <Block column>
                        <Block row>
                          <Text h3>{index}. </Text>
                          <Text h3>
                            {item.user.userName
                              ? item.user.userName
                              : item.user.email}
                          </Text>
                        </Block>
                        <LinearProgress
                          color={theme.colors.accent}
                          value={item.jobImage ? 100 : 10}
                          variant="determinate"
                          style={styles.progress}
                        />
                      </Block>

                      <Button
                        style={[styles.userButtons, { marginTop: -15 }]}
                        color={theme.colors.primary}
                        onPress={
                          userType !== "Manager"
                            ? () => {
                                setCurrentJob(item.jobAssigned);
                                setShowAlertViewJob(!showAlertViewJob);
                              }
                            : () => setShowAlertJob(!showAlertJob)
                        }
                      >
                        <Text h4 white center>
                          <MaterialIcons
                            name="assignment"
                            size={20}
                            color="white"
                          />
                        </Text>
                      </Button>
                      {/* {userType === "Manager" ? (
                        <Button
                          style={[styles.userButtons, { marginTop: -15 }]}
                          color={theme.colors.primary}
                          onPress={() => {
                            setCurrentImage(item.jobImage);
                            setShowAlertViewImage(!showAlertViewImage);
                          }}
                        >
                          <Text h4 white center>
                            <Entypo name="image" size={20} color="white" />
                          </Text>
                        </Button>
                      ) : ( */}
                      <Button
                        style={[styles.userButtons, { marginTop: -15 }]}
                        color={theme.colors.primary}
                        onPress={
                          item.user._id === userId
                            ? () => setShowAlertImage(!showAlertImage)
                            : () => {
                                setCurrentImage(item.jobImage);
                                setShowAlertViewImage(!showAlertViewImage);
                              }
                        }
                      >
                        <Text h4 white center>
                          <Entypo name="image" size={20} color="white" />
                        </Text>
                      </Button>
                      {/* )} */}
                      {userType === "Manager" ? (
                        <Button
                          style={[styles.userButtons, { marginTop: -15 }]}
                          color={theme.colors.primary}
                          onPress={() => {
                            setSelectedUser(item.user._id);
                            setShowAlertUser(!showAlertUser);
                          }}
                        >
                          <Text h4 white center style>
                            <AntDesign
                              name="deleteuser"
                              size={20}
                              color="white"
                            />
                          </Text>
                        </Button>
                      ) : null}
                    </Block>
                    <Divider />
                  </Block>
                ))}
              </Spacer>
            </Block>
          </Block>
        </Block>
        <>
          <ChatBox
            messagesList={messages}
            id={taskId}
            userName={userName}
            navigation={navigation}
            addMessage={addMessage}
          />
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
              onChangeText={setJobText}
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
        onConfirmPressed={handleAssignJob}
        contentContainerStyle={{ width: width * 0.8 }}
      />

      {/* JOB VIEW MODAL */}
      <AwesomeAlert
        show={showAlertViewJob}
        showProgress={false}
        title="Assigned Task"
        customView={
          <>
            <Text>{currentJob}</Text>
          </>
        }
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="Ok"
        confirmButtonColor={theme.colors.accent}
        cancelButtonColor="#ff0e0e"
        onConfirmPressed={() => setShowAlertViewJob(!showAlertViewJob)}
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

      {/* IMAGE VIEW MODAL */}
      <AwesomeAlert
        show={showAlertViewImage}
        showProgress={false}
        title="User Task Image"
        customView={
          <>
            {currentImage ? (
              <Image source={{ uri: currentImage }} style={styles.modalImage} />
            ) : (
              <Image
                source={require("../../assets/blank-image.png")}
                style={styles.modalImage}
              />
            )}
          </>
        }
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor={theme.colors.accent}
        cancelButtonColor="#ff0e0e"
        onConfirmPressed={() => {
          setShowAlertViewImage(!showAlertViewImage);
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
        onConfirmPressed={handleRemoveUser}
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
              placeholder="Name of task"
            />
            <Input
              defaultValue={people}
              style={{ width: width * 0.7, paddingHorizontal: 15 }}
              onChangeText={setPeople}
              placeholder="No. of people needed for task"
              number
            />
            <Input
              defaultValue={date}
              style={{
                width: width * 0.7,
                paddingHorizontal: 15,
              }}
              onChangeText={setDate}
              placeholder="Date"
              number
            />
          </>
        }
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={
          name.length > 0 &&
          parseInt(people) >= peopleEnlisted.length &&
          date.length == 8
        }
        cancelText="Cancel"
        confirmText="Update"
        cancelButtonColor="#ff0e0e"
        confirmButtonColor={theme.colors.accent}
        onCancelPressed={() => {
          setShowAlertEdit(!showAlertEdit);
        }}
        onConfirmPressed={() => {
          handleEditTask();
          setShowAlertEdit(!showAlertEdit);
        }}
        contentContainerStyle={{ width: width * 0.8, height: height * 0.4 }}
      />

      <ImageSelecter2
        image={image}
        setImage={setImage}
        setChangePicture={setChangePicture}
        changePicture={changePicture}
        taskId={taskId}
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
    width: width * 0.12,
    marginHorizontal: 2,
    borderRadius: 25,
  },
  userButtons: {
    marginHorizontal: 2,
    width: width * 0.12,
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
  modalImage: {
    width: 100,
    height: 100,
  },
});
export default TaskChannelScreen;
