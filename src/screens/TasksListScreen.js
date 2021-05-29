import React, { useContext, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Card, Badge, Button, Block, Text } from "../components/elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../constants";
const { width } = Dimensions.get("window");
import { Context as AuthContext } from "../context/AuthContext";
import { Context as TaskContext } from "../context/TaskContext";
import { useFocusEffect } from "@react-navigation/native";

const TasksListScreen = ({ route, navigation }) => {
  let { type } = route.params;
  const [typeToShow, setTypeToShow] = useState("");
  const {
    state: { imageUri, userId, email },
  } = useContext(AuthContext);
  const { state, fetchTasks, enlistInTask } = useContext(TaskContext);

  useFocusEffect(
    React.useCallback(() => {
      if (type === "Plant Trees") setTypeToShow("treePlantation");
      else setTypeToShow("garbageRecycling");
      fetchTasks();
    }, [])
  );

  return (
    <Block white>
      <Block flex={false} row center space="between" style={styles.header}>
        <Text primary h1 bold>
          Tasks List
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingVertical: theme.sizes.base * 2 }}
      >
        <Block flex={false} column space="between" style={styles.tasks}>
          {state.tasks
            .filter((item) => item.campaign === typeToShow)
            .map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate("TaskDetails", { id: item._id })
                }
              >
                <Card column shadow style={styles.task}>
                  <Block row flex={false}>
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
                    <Block column flex={false} margin={[5, 0]}>
                      <Text h3 bold primary style={{ width: width / 2 }}>
                        {item.taskName}
                      </Text>
                      <Text bold primary style={{ width: width / 2 }}>
                        {item.location}
                      </Text>
                    </Block>
                  </Block>
                  <Block flex={false}>
                    <Text>{item.description}</Text>
                  </Block>
                  <Block margin={[15, 0, 0, 0]} column flex={false}>
                    <Text bold primary style={{ width: width / 2 }}>
                      {item.date}
                    </Text>
                    <Text bold primary style={{ width: width / 2 }}>
                      {item.fromTime + " - " + item.toTime}
                    </Text>
                    <Text bold primary style={{ width: width / 2 }}>
                      Persons Needed: {item.peopleNeeded}
                    </Text>
                  </Block>
                  <Block flex={false} style={{ alignItems: "flex-end" }}>
                    {item.peopleEnlisted.includes(email) ? (
                      <Button
                        style={{
                          width: width * 0.35,
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                        color={theme.colors.primary}
                        right
                        disabled
                      >
                        <MaterialCommunityIcons
                          name="timer-sand-empty"
                          size={24}
                          color="white"
                        />
                        <Text style={{ width: width * 0.11 }} bold white center>
                          Pending
                        </Text>
                      </Button>
                    ) : (
                      <Button
                        style={{ width: width * 0.35 }}
                        color={theme.colors.accent}
                        right
                        onPress={() => enlistInTask(item._id, email)}
                      >
                        <Text bold white center>
                          Enlist
                        </Text>
                      </Button>
                    )}
                  </Block>
                </Card>
              </TouchableOpacity>
            ))}
        </Block>
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
    flexDirection: "column-reverse",
    paddingHorizontal: theme.sizes.base * 2,
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
  image: { width: 50, height: 50, borderRadius: 50 },
});
export default TasksListScreen;
