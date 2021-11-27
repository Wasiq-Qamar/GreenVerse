import React, { useState, useContext, useEffect } from "react";
import {
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Button, Block, Text } from "../components/elements";
import { theme } from "../constants";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as TaskContext } from "../context/TaskContext";
import { DataTable } from "react-native-paper";

const { width, height } = Dimensions.get("window");

const ManageTasksScreen = ({ navigation }) => {
  const [currentUserTasks, setCurrentUserTasks] = useState([]);
  const {
    state: { imageUri, userId },
    signout,
  } = useContext(AuthContext);
  const {
    state: { tasks },
  } = useContext(TaskContext);

  return (
    <Block white paddingTop={20}>
      <Block flex={false} row center space="between" style={styles.header}>
        <Block flex={3}>
          <Text h1 bold primary>
            My Tasks
          </Text>
        </Block>
        <Block flex={1} row space="between">
          <Button onPress={signout}>
            <SimpleLineIcons name="logout" size={24} color="black" />
          </Button>
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
      </Block>

      <ScrollView showsVerticalScrollIndicator={false}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={{ flex: 2 }}>
              {" "}
              Campaign Name{" "}
            </DataTable.Title>
            <DataTable.Title style={{ flex: 2 }}>
              {" "}
              Manager Name{" "}
            </DataTable.Title>
            <DataTable.Title style={{ flex: 1.5 }}>
              {" "}
              Volunteers{" "}
            </DataTable.Title>
            <DataTable.Title style={{ flex: 1.5 }}> Date </DataTable.Title>
          </DataTable.Header>
          {tasks.map((task, index) => (
            <TouchableOpacity
              // onPress={() =>
              //   navigation.navigate("TaskChannel", {
              //     name: task.organization,
              //     amount: task.amount,
              //     date: task.taskDate.split("T")[0],
              //   })
              // }
              key={task._id}
            >
              <DataTable.Row
                key={task.id}
                style={index % 2 === 0 ? styles.evenRow : null}
              >
                <DataTable.Title style={{ flex: 2 }}>
                  {" "}
                  {task.taskName}{" "}
                </DataTable.Title>
                <DataTable.Title style={{ flex: 2 }}>
                  {task.manager.userName}
                </DataTable.Title>
                <DataTable.Title style={{ flex: 1.5 }}>
                  {task.peopleEnlisted.length}
                </DataTable.Title>
                <DataTable.Title style={{ flex: 1.5 }}>
                  {task.date}
                </DataTable.Title>
              </DataTable.Row>
            </TouchableOpacity>
          ))}
        </DataTable>
      </ScrollView>
    </Block>
  );
};

export default ManageTasksScreen;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  avatar: {
    height: theme.sizes.base * 3,
    width: theme.sizes.base * 3,
    borderRadius: 50,
  },
  evenRow: {
    backgroundColor: "#f3f1f1",
  },
});
