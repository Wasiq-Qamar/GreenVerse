import { SimpleLineIcons } from "@expo/vector-icons";
import React, { useContext, useState, useEffect } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { DataTable } from "react-native-paper";
import { Block, Button, Text } from "../components/elements";
import { theme } from "../constants";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as TaskContext } from "../context/TaskContext";

const ManageTasksScreen = ({ navigation }) => {
  const {
    state: { imageUri, userId },
    signout,
  } = useContext(AuthContext);
  const {
    state: { myTasks, tasks },
    fetchMyTasks,
  } = useContext(TaskContext);

  useEffect(() => {
    fetchMyTasks(userId);
  }, [tasks]);

  console.log(myTasks);

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
          {myTasks.map((task, index) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("TaskChannel", {
                  taskId: task.task._id,
                  campaign: task.task.campaign,
                  manager: task.task.manager.userName,
                  description: task.task.description,
                  location: task.task.location,
                  fromTime: task.task.fromTime,
                  toTime: task.task.toTime,
                  peopleNeeded: task.task.peopleNeeded,
                  peopleEnlisted: task.task.peopleEnlisted,
                  date: task.task.date,
                  taskName: task.task.taskName,
                  messages: task.task.messages,
                })
              }
              key={task._id}
            >
              <DataTable.Row
                key={task._id}
                style={index % 2 === 0 ? styles.evenRow : null}
              >
                <DataTable.Title style={{ flex: 2 }}>
                  {" "}
                  {task.task.taskName}{" "}
                </DataTable.Title>
                <DataTable.Title style={{ flex: 2 }}>
                  {task.task.manager.userName
                    ? task.task.manager.userName
                    : "N/A"}
                </DataTable.Title>
                <DataTable.Title style={{ flex: 1.5 }}>
                  {task.task.peopleEnlisted.length}
                </DataTable.Title>
                <DataTable.Title style={{ flex: 1.5 }}>
                  {task.task.date}
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
