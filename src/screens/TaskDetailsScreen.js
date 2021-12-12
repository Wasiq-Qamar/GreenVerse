import React, { useContext, useState } from "react";
import { Dimensions, Image, StyleSheet, ScrollView } from "react-native";
import { Badge, Button, Block, Text } from "../components/elements";
import Spacer from "../components/Spacer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { theme } from "../constants";
const { width } = Dimensions.get("window");
import { Context as AuthContext } from "../context/AuthContext";
import { Context as TaskContext } from "../context/TaskContext";
import AwesomeAlert from "react-native-awesome-alerts";

const TaskDetailsScreen = ({ route, navigation }) => {
  let { id } = route.params;
  const [showAlert, setShowAlert] = useState(false);

  const {
    state: { imageUri, email, userId, userName },
  } = useContext(AuthContext);
  const { state, enlistInTask, deleteTask } = useContext(TaskContext);

  const checkPeopleEnlisted = (arr) => {
    let flag = false;
    arr.forEach((obj) => {
      if (obj.user._id === userId) {
        flag = true;
      }
    });
    return flag ? true : false;
  };

  return (
    <Block white>
      <Block flex={false} row center space="between" style={styles.header}>
        <Text style={{ width: width * 0.4 }} primary h1 bold>
          Task Details
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
          {state.tasks
            .filter((item) => item._id === id)
            .map((item, index) => (
              <Block flex={false} column key={index}>
                <Block row flex={false} space="around">
                  <Badge margin={[0, 0, 15]} size={60}>
                    {item.campaign === "garbageRecycling" ? (
                      <Image
                        source={require("../../assets/icons/recycle.png")}
                        style={styles.image}
                      />
                    ) : item.campaign === "treePlantation" ? (
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
                  <Block column flex={false}>
                    <Text h2 bold primary style={{ width: width / 2.2 }}>
                      {item.taskName}
                    </Text>
                    <Text h3 bold primary style={{ width: width / 2.2 }}>
                      {item.location}
                    </Text>
                  </Block>
                  {item.manager._id === userId ? (
                    <Block column flex={false}>
                      <Button
                        style={styles.topButtons}
                        color="#800000"
                        onPress={() => setShowAlert(true)}
                      >
                        <AntDesign name="delete" size={24} color="white" />
                      </Button>
                    </Block>
                  ) : null}
                </Block>
                {item.campaign === "garbageRecycling" ? null : (
                  <Block row flex={false} padding={[20, 0]}>
                    <Text h3 bold style={{ width: width * 0.3 }}>
                      Manager Name:
                    </Text>
                    <Text h3>{item.manager.userName}</Text>
                  </Block>
                )}

                <Block flex={false}>
                  <Text h3 bold>
                    Description:
                  </Text>
                  <Spacer>
                    <Text h3>{item.description}</Text>
                  </Spacer>
                </Block>
                <Block margin={[15, 0, 0, 0]} column flex={false}>
                  <Text h3 bold>
                    Details:
                  </Text>
                  <Spacer>
                    <Text h3 primary style={{ width: width / 2 }}>
                      Date: {"  "}
                      {item.date}
                    </Text>
                    <Text h3 primary style={{ width: width / 2 }}>
                      Time: {"  "}
                      {item.fromTime + " - " + item.toTime}
                    </Text>
                    <Text h3 primary style={{ width: width / 2 }}>
                      Persons Needed: {"  "}
                      {item.peopleNeeded}
                    </Text>
                  </Spacer>
                </Block>
                <Block flex={false} center>
                  {checkPeopleEnlisted(item.peopleEnlisted) ? (
                    <Button
                      style={{
                        width: width * 0.5,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                      color={theme.colors.primary}
                      disabled
                    >
                      <MaterialCommunityIcons
                        name="check"
                        size={24}
                        color="white"
                      />
                      <Text h3 style={{ width: width * 0.2 }} bold white center>
                        Enlisted
                      </Text>
                    </Button>
                  ) : (
                    <Button
                      style={{ width: width * 0.5 }}
                      color={theme.colors.accent}
                      onPress={() => enlistInTask(item._id, email)}
                    >
                      <Text h3 bold white center>
                        Enlist
                      </Text>
                    </Button>
                  )}
                </Block>
              </Block>
            ))}
        </Block>
      </ScrollView>

      {/* REMOVE TASK MODAL */}
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Delete Task"
        message="Are you sure you want to delete this task?"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Cancel"
        confirmText="Remove"
        cancelButtonColor={theme.colors.accent}
        confirmButtonColor="#ff0e0e"
        onCancelPressed={() => {
          setShowAlert(!showAlert);
        }}
        onConfirmPressed={() => {
          deleteTask(id, () => navigation.navigate("TasksList"));
          setShowAlert(!showAlert);
        }}
        contentContainerStyle={{ width: width * 0.8 }}
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
  image: { width: 80, height: 80, borderRadius: 50 },
  topButtons: {
    width: width * 0.11,
    borderRadius: 25,
    paddingLeft: 10,
  },
});
export default TaskDetailsScreen;
