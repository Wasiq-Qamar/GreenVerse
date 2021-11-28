import React, { useContext, useState, useEffect } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Card, Badge, Button, Block, Text } from "../components/elements";
import { theme, mocks } from "../constants";
const { width } = Dimensions.get("window");
import { Context as AuthContext } from "../context/AuthContext";
import { Context as ProductContext } from "../context/ProductContext";
import { AntDesign } from "@expo/vector-icons";

const CartScreen = ({ navigation }) => {
  const categories = mocks.volunteerCategories;
  const {
    state: { imageUri, userType },
  } = useContext(AuthContext);
  const { state, setCartFromLocal } = useContext(ProductContext);
  const [quantity, setQuantity] = useState(1);
  const [totalBill, setTotalBill] = useState(0);
  useEffect(() => {
    let total = 0;
    if (state.cart) {
      state.cart.forEach((item) => {
        total = total + parseInt(item.quantity) * parseInt(item.price);
        console.log(total);
        setTotalBill(total);
      });
    } else {
      setTotalBill(0);
    }
  }, [state.cart]);
  const handleQuantity = (num, id) => {
    let item = state.cart.filter((product) => product.id === id)[0];
    if (num < 0 && item.quantity == 0) {
      return;
    } else {
      let filteredCart = state.cart.filter((product) => product.id !== id);
      item.quantity = item.quantity + num;
      console.log(item);
      setCartFromLocal({ cart: [...filteredCart, item] });
    }
  };
  // console.log(state.cart);
  return (
    <Block white>
      <Block flex={false} row center space="between" style={styles.header}>
        <Text primary h1 bold>
          Cart.
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
        <Block flex={false} center middle style={styles.categories}>
          {state.cart &&
            state.cart.map((product, index) => (
              <Block key={index} style={{ width: width * 0.4 }}>
                <Card row center shadow style={styles.category}>
                  <Badge
                    margin={[0, 0, 15]}
                    size={50}
                    color="rgba(41,216,143,0.20)"
                  >
                    <Image
                      source={{ uri: product.productImg }}
                      style={styles.image}
                    />
                  </Badge>
                  <Block
                    row
                    center
                    middle
                    style={{ width: width * 0.7, paddingHorizontal: 15 }}
                  >
                    <Block column style={{ width: width * 0.3 }}>
                      <Text h3 bold>
                        {product.productName}
                      </Text>
                      <Text gray caption>
                        Rs. {product.price}
                      </Text>
                    </Block>
                  </Block>
                  <Block
                    middle
                    center
                    row
                    style={{ borderColor: "black", borderWidth: 2 }}
                  >
                    <Button
                      style={[styles.iconButton, { marginRight: 15 }]}
                      onPress={() => handleQuantity(-1, product.id)}
                    >
                      <AntDesign
                        name="minus"
                        size={24}
                        color={theme.colors.primary}
                      />
                    </Button>
                    <Text>{product.quantity}</Text>
                    <Button
                      style={[styles.iconButton, { marginLeft: 15 }]}
                      onPress={() => handleQuantity(1, product.id)}
                    >
                      <AntDesign
                        name="plus"
                        size={24}
                        color={theme.colors.primary}
                      />
                    </Button>
                  </Block>
                </Card>
              </Block>
            ))}
          {state.cart ? (
            <Block center middle row>
              <Text h2 bold style={{ width: width * 0.3 }}>
                Total Payment:
              </Text>
              <Text h3>{totalBill}</Text>
            </Block>
          ) : (
            <Block center middle row>
              <Text h2 style={{ width: width * 0.3 }}>
                Cart is empty
              </Text>
            </Block>
          )}
        </Block>
        <Block middle center>
          <Button
            style={styles.button}
            onPress={() => navigation.navigate("Checkout", { totalBill })}
            disabled={!state.cart}
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
    width: width * 0.07,
    height: width * 0.07,
    alignItems: "center",
  },
});
export default CartScreen;
