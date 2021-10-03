import React from "react";
import { TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Card from "./Card";
import Text from "./Text";
import { FontAwesome5 } from "@expo/vector-icons";
import { theme } from "../../constants";

const { width } = Dimensions.get("window");

const LinkContainer = ({ text, routeName }) => {
  const navigation = useNavigation();
  return (
    <Card row center style={styles.linkCard}>
      <TouchableOpacity
        style={{ width: width * 0.7 }}
        onPress={() => navigation.navigate(routeName)}
      >
        <Text h3 bold>
          {text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
        <FontAwesome5 name="greater-than" size={10} color="black" />
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  linkCard: {
    marginTop: theme.sizes.base * 0.7,
    marginHorizontal: 10,
    // paddingHorizontal: theme.sizes.base,
    height: 40,
    // justifyContent: "center",
    backgroundColor: "#f3f1f1",
    borderLeftWidth: 7,
    borderLeftColor: theme.colors.primary,
  },
});

export default LinkContainer;
