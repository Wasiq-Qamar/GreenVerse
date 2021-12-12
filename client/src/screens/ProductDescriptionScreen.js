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
import { Context as ProductContext } from "../context/ProductContext";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const ProductDescriptionScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const categories = mocks.volunteerCategories;
  const {
    state: { imageUri, userType },
  } = useContext(AuthContext);
  const { addToCart, state } = useContext(ProductContext);
  const [quantity, setQuantity] = useState(0);

  const handleQuantity = (num) => {
    if (num < 0 && quantity == 0) {
      return;
    }
    setQuantity(quantity + num);
  };

  // console.log("CART: ", state.cart);

  const addItemToCart = (item) => {
    const product = {
      id: item._id,
      productName: item.productName,
      productImg: item.productImg,
      price: item.price,
      quantity: quantity,
      category: item.category,
    };
    addToCart({ product });
  };

  return (
    <Block white>
      <Block flex={false} row center space="between" style={styles.header}>
        <Text primary h1 bold style={{ width: width * 0.5 }}>
          Product Description
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
          <Card center middle shadow>
            {/* <Badge margin={[0, 0, 15]} size={130} color="rgba(41,216,143,0.20)"> */}
            <Image source={{ uri: product.productImg }} style={styles.image} />
            {/* </Badge> */}
            <Block
              column
              middle
              style={{ width: width * 0.8 }}
              padding={[25, 0, 0, 25]}
            >
              <Text h3 bold style={{ marginBottom: 10 }}>
                Name:{"\t\t"} <Text h4>{product.productName}</Text>
              </Text>
              <Text h3 bold style={{ marginBottom: 10 }}>
                Price:{"\t\t\t"} <Text h4>Rs. {product.price}</Text>
              </Text>
              <Text h3 bold>
                Quantity:{"\t\t\t"}
                <Text h4> {product.quantity} items</Text>
              </Text>
            </Block>
          </Card>
        </Block>
        <Block middle center row margin={[-50, 0, 0, 0]}>
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
        <Block center>
          <Button style={styles.button} onPress={() => addItemToCart(product)}>
            <Text>Add to Cart</Text>
          </Button>
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
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2.2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2.2,
    height: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 1.7,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 1.5,
    alignSelf: "center",
    marginBottom: 30,
  },
  categoryText: {
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 1.5,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 1.5,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 1.5,
  },
  image: { width: 320, height: 250 },
  button: {
    backgroundColor: theme.colors.accent,
    width: width * 0.4,
    alignItems: "center",
  },
  iconButton: {
    backgroundColor: theme.colors.primary,
    width: width * 0.11,
    alignItems: "center",
    borderRadius: 25,
  },
});
export default ProductDescriptionScreen;
