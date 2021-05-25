import React, { useContext, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { FAB } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Card,
  Badge,
  Button,
  Block,
  Text,
  Input,
} from "../components/elements";
import { theme, mocks } from "../constants";
const { width } = Dimensions.get("window");
import { Context as AuthContext } from "../context/AuthContext";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const VolunteerListScreen = ({ navigation }) => {
  const today = new Date(Date.now());
  const [taskName, setTaskName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(today);
  const [date, setDate] = useState(today);
  const [peopleNeeded, setPeopleNeeded] = useState("");
  const [campaign, setCampaign] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Tree Plantation", value: "treePlantation" },
    { label: "Garbage Recycling", value: "garbageRecycling" },
  ]);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const {
    state: { imageUri, userType },
  } = useContext(AuthContext);

  const onChange = (event, selected) => {
    if (mode === "date") {
      const currentDate = selected || date;
      setShow(Platform.OS === "ios");
      setDate(currentDate);
    } else {
      const currentTime = selected || time;
      setShow(Platform.OS === "ios");
      setTime(currentTime);
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <Block white>
      <Block flex={false} row center space="between" style={styles.header}>
        <Text primary h1 bold style={{ width: width * 0.5 }}>
          New Task
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
      <Block flex={false} column style={styles.form}>
        <Block flex={false} row center space="between">
          <Block flex={1.5}>
            <Text left primary>
              Task Name:
            </Text>
          </Block>
          <Block flex={7}>
            <Input
              defaultValue={taskName}
              style={[styles.input]}
              onChangeText={setTaskName}
              placeholder="Task Name"
            />
          </Block>
        </Block>
        <Block flex={false} row center space="between">
          <Block flex={1.5}>
            <Text left primary>
              Campaign:
            </Text>
          </Block>
          <Block center middle flex={1}>
            <Badge size={30}>
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
          </Block>
          <Block flex={6}>
            <DropDownPicker
              open={open}
              value={campaign}
              items={items}
              setOpen={setOpen}
              setValue={setCampaign}
              setItems={setItems}
              style={[styles.input, { width: width * 0.6 }]}
            />
          </Block>
        </Block>
        <Block flex={false} row center space="between">
          <Block flex={1.5}>
            <Text left primary>
              Task Location:
            </Text>
          </Block>
          <Block flex={7}>
            <Input
              defaultValue={location}
              style={[styles.input]}
              onChangeText={setLocation}
              placeholder="Location"
            />
          </Block>
        </Block>
        <Block flex={false} row center space="between">
          <Block flex={1.5}>
            <Text left primary>
              Description:
            </Text>
          </Block>
          <Block flex={7}>
            <Input
              multiline
              numberOfLines={10}
              defaultValue={description}
              style={[styles.input, { height: 100, paddingVertical: 10 }]}
              onChangeText={setDescription}
              placeholder="Write something about the task"
            />
          </Block>
        </Block>
        <Block flex={false} row center space="between">
          <Block flex={1.5}>
            <Text left primary>
              Date:
            </Text>
          </Block>
          <Block flex={6}>
            <Input
              defaultValue={date.toLocaleDateString()}
              style={[styles.input, { width: width * 0.6 }]}
              onChangeText={setDate}
              placeholder="Date"
              number
            />
          </Block>
          <Block flex={1} center>
            <Button onPress={showDatepicker}>
              <MaterialIcons
                name="date-range"
                size={24}
                color={theme.colors.primary}
              />
            </Button>
          </Block>
        </Block>
        <Block flex={false} row center space="between">
          <Block flex={1.5}>
            <Text left primary>
              Date:
            </Text>
          </Block>
          <Block flex={6}>
            <Input
              defaultValue={time.toLocaleTimeString()}
              style={[styles.input, { width: width * 0.6 }]}
              onChangeText={setTime}
              placeholder="Time"
              number
            />
          </Block>
          <Block flex={1} center>
            <Button onPress={showTimepicker}>
              <MaterialIcons
                name="access-time"
                size={24}
                color={theme.colors.primary}
              />
            </Button>
          </Block>
        </Block>
        <Block flex={false}>
          <Block flex={1} center>
            <Button
              style={{ width: width * 0.4 }}
              color={theme.colors.primary}
              onPress={() => navigation.navigate("TasksList")}
            >
              <Text h3 center white bold>
                Create
              </Text>
            </Button>
          </Block>
        </Block>
      </Block>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
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
  form: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  input: {
    paddingHorizontal: 10,
    overflow: "scroll",
    borderWidth: 1,
    width: width * 0.7,
  },
  image: { width: 35, height: 35, borderRadius: 50 },
});
export default VolunteerListScreen;
