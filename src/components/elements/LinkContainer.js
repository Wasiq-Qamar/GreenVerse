import React from "react";
import { TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Card from "./Card";
import Text from "./Text";
import { FontAwesome5 } from "@expo/vector-icons";
import { theme } from "../../constants";

const { width } = Dimensions.get("window");

const LinkContainer = (props) => {
  const navigation = useNavigation();
  const { text, routeName } = props;
  return (
    <Card
      row
      center
      space="between"
      onPress={() => navigation.navigate(routeName)}
      style={styles.linkCard}
    >
      <TouchableOpacity style={{ width: width * 0.7 }}>
        <Text h3 bold>
          {text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesome5 name="greater-than" size={10} color="black" />
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  linkCard: {
    marginTop: theme.sizes.base * 0.7,
    marginHorizontal: theme.sizes.base * 2,
    paddingHorizontal: theme.sizes.base,
    height: 40,
    justifyContent: "center",
    backgroundColor: "#f3f1f1",
    borderLeftWidth: 7,
    borderLeftColor: theme.colors.primary,
  },
});

export default LinkContainer;
