import React, { useContext, useEffect } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FAB } from "react-native-elements";

import { Card, Badge, Button, Block, Text } from "../components/elements";
import Spacer from "../components/Spacer";
import { theme, mocks } from "../constants";
const { width, height } = Dimensions.get("window");
import { Context as AuthContext } from "../context/AuthContext";
import { Context as ProductContext } from "../context/ProductContext";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";

const VolunteerListScreen = ({ navigation }) => {
  const categories = mocks.volunteerCategories;
  const {
    state: { imageUri, userType },
  } = useContext(AuthContext);

  const { fetchProducts } = useContext(ProductContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Block white>
      <Block flex={false} row center space="between" style={styles.header}>
        <Text primary h1 bold>
          Volunteer
        </Text>
        <Block flex={false} row>
          {userType !== "Manager" ? null : (
            <Button
              style={{ marginRight: 15 }}
              onPress={() => navigation.navigate("Store")}
            >
              <FontAwesome5
                name="store"
                size={24}
                color={theme.colors.primary}
              />
            </Button>
          )}
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
      </Block>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingVertical: theme.sizes.base * 2,
        }}
      >
        <Block flex={false} column space="between" style={styles.categories}>
          {categories.map((category, index) => (
            <Block row space="between" key={index}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("TasksList", { type: category.name })
                }
              >
                <Card center middle shadow style={styles.category}>
                  <Badge margin={[0, 0, 15]} size={60}>
                    <Image source={category.image} style={styles.image} />
                  </Badge>
                  <Text h3 center bold height={20} primary>
                    {category.name}
                  </Text>
                </Card>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("TasksList", { type: category.name })
                }
              >
                <Card
                  secondary
                  center
                  middle
                  shadow
                  style={styles.categoryText}
                >
                  <Text h3 medium center height={20} primary>
                    {category.description}
                  </Text>
                </Card>
              </TouchableOpacity>
            </Block>
          ))}
        </Block>

        <Block
          bottom
          flex={1}
          style={styles.createButton}
          padding={[0, width * 0.05]}
        >
          {userType === "Manager" ? (
            <FAB
              color={theme.colors.primary}
              icon={<AntDesign name="plus" size={24} color="white" />}
              onPress={() => navigation.navigate("TaskCreate")}
              style={{ marginBottom: 10 }}
            />
          ) : null}
          <FAB
            color={theme.colors.primary}
            icon={<FontAwesome5 name="robot" size={24} color="white" />}
            onPress={() => navigation.navigate("Helper")}
          />
        </Block>
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingTop: 50,
  },
  avatar: {
    height: theme.sizes.base * 3,
    width: theme.sizes.base * 3,
    borderRadius: 50,
  },
  categories: {
    flexWrap: "wrap",
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5,
    alignItems: "flex-start",
  },
  createButton: {
    alignSelf: "flex-end",
    paddingTop: 100,
  },
  category: {
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 3,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 3,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 3,
  },
  categoryText: {
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 1.5,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 1.5,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 1.5,
  },
  image: { width: 50, height: 50, borderRadius: 50 },
});
export default VolunteerListScreen;
