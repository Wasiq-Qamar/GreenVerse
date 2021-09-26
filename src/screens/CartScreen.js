import React, { useContext, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FAB } from "react-native-elements";

import { Card, Badge, Button, Block, Text } from "../components/elements";
import { theme, mocks } from "../constants";
const { width } = Dimensions.get("window");
import { Context as AuthContext } from "../context/AuthContext";
import { AntDesign } from "@expo/vector-icons";

const CartScreen = ({ navigation }) => {
  const categories = mocks.volunteerCategories;
  const {
    state: { imageUri, userType },
  } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(1);
  let amount = quantity * 500;

  const handleQuantity = (num) => {
    if (num < 0 && quantity == 0) {
      return;
    }
    setQuantity(quantity + num);
  };

  return (
    <Block white>
      <Block flex={false} row center space="between" style={styles.header}>
        <Text primary h1 bold>
          Explore.
        </Text>
        <Block flex={false} row>
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
        style={{ paddingVertical: theme.sizes.base * 2 }}
      >
        <Block flex={false} center middle style={styles.categories}>
          {mocks.cartItems.map((category) => (
            <Block key={category.name} style={{ width: width * 0.4 }}>
              <Card row center shadow style={styles.category}>
                <Badge
                  margin={[0, 0, 15]}
                  size={50}
                  color="rgba(41,216,143,0.20)"
                >
                  <Image source={category.image} style={styles.image} />
                </Badge>
                <Block
                  row
                  center
                  middle
                  style={{ width: width * 0.7, paddingHorizontal: 15 }}
                >
                  <Block column style={{ width: width * 0.3 }}>
                    <Text h3 bold>
                      {category.name}
                    </Text>
                    <Text gray caption>
                      Rs. {category.price}
                    </Text>
                  </Block>
                  <Block middle center row>
                    <Button
                      style={[styles.iconButton, { marginRight: 15 }]}
                      onPress={() => handleQuantity(-1)}
                    >
                      <AntDesign name="minus" size={24} color="white" />
                    </Button>
                    <Text>Quantity: {quantity}</Text>
                    <Button
                      style={[styles.iconButton, { marginLeft: 15 }]}
                      onPress={() => handleQuantity(1)}
                    >
                      <AntDesign name="plus" size={24} color="white" />
                    </Button>
                  </Block>
                </Block>
              </Card>
            </Block>
          ))}
          <Block center middle row>
            <Text h2 bold style={{ width: width * 0.3 }}>
              Total Payment:
            </Text>
            <Text h3>{amount}</Text>
          </Block>
        </Block>
        <Block middle center>
          <Button
            style={styles.button}
            onPress={() => navigation.navigate("Checkout", { amount })}
          >
            <Text h3 bold style={{ width: width * 0.17 }}>
              Checkout
            </Text>
          </Button>
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
    paddingHorizontal: theme.sizes.base * 4,
    marginBottom: theme.sizes.base * 3.5,
  },
  category: {
    minWidth: width - theme.sizes.padding * 2.4 - theme.sizes.base,
    maxWidth: width - theme.sizes.padding * 2.4 - theme.sizes.base,
    maxHeight: width - theme.sizes.padding * 2.4 - theme.sizes.base,
    alignSelf: "center",
    marginBottom: 30,
  },
  categoryText: {
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 1.5,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 1.5,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 1.5,
  },
  image: { width: 50, height: 50, borderRadius: 25 },
  button: {
    backgroundColor: theme.colors.accent,
    width: width * 0.3,
    alignItems: "center",
  },
  iconButton: {
    backgroundColor: theme.colors.primary,
    width: width * 0.07,
    height: width * 0.07,
    alignItems: "center",
    borderRadius: 15,
  },
});
export default CartScreen;
