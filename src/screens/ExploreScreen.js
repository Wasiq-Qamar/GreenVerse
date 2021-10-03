import React, { useContext } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { Card, Badge, Button, Block, Text } from "../components/elements";
import { theme, mocks } from "../constants";
const { width } = Dimensions.get("window");
import { Context as AuthContext } from "../context/AuthContext";
import { FontAwesome5 } from "@expo/vector-icons";

const ExploreScreen = ({ navigation }) => {
  const categories = mocks.volunteerCategories;
  const {
    state: { imageUri, userType },
  } = useContext(AuthContext);

  return (
    <Block white>
      <Block flex={false} row center space="between" style={styles.header}>
        <Text primary h1 bold>
          Explore.
        </Text>
        <Block flex={false} row>
          <Button onPress={() => navigation.navigate("Settings")}>
            <FontAwesome5 name="home" size={30} color={theme.colors.primary} />
          </Button>
        </Block>
      </Block>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingVertical: theme.sizes.base * 2 }}
      >
        <Block flex={false} row middle style={styles.categories}>
          {mocks.products.map((category) => (
            <TouchableOpacity
              key={category.name}
              style={{ width: width * 0.4 }}
              onPress={() =>
                navigation.navigate("ProductDescription", {
                  name: category.name,
                  price: category.price,
                  image: category.image,
                })
              }
            >
              <Card center middle shadow style={styles.category}>
                <Badge
                  margin={[0, 0, 15]}
                  size={130}
                  color="rgba(41,216,143,0.20)"
                >
                  <Image source={category.image} style={styles.image} />
                </Badge>
                <Block row center>
                  <Block column style={{ width: width * 0.3 }}>
                    <Text h3 bold>
                      {category.name}
                    </Text>
                    <Text gray caption>
                      Rs. {category.price}
                    </Text>
                  </Block>
                  <Block padding={[0, 0, 0, 15]}>
                    <Button style={styles.button}>
                      <Text caption>+ Add to Cart</Text>
                    </Button>
                  </Block>
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
  categories: {
    flexWrap: "wrap",
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5,
  },
  category: {
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2.1,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2.1,
    height: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 1.3,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 1,
    alignSelf: "center",
    marginBottom: 30,
  },
  categoryText: {
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 1.5,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 1.5,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 1.5,
  },
  image: { width: 150, height: 140 },
  button: {
    backgroundColor: theme.colors.accent,
    width: width * 0.15,
    alignItems: "center",
  },
});
export default ExploreScreen;
