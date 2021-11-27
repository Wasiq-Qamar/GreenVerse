import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card, Badge, Button, Block, Text } from "../components/elements";
import { theme, mocks } from "../constants";
const { width } = Dimensions.get("window");
import { Context as ProductContext } from "../context/ProductContext";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";

const ExploreScreen = ({ route, navigation }) => {
  const { category, categoryName } = route.params;
  const categories = mocks.volunteerCategories;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      let result = await AsyncStorage.getItem("products");
      result = JSON.parse(result);
      let filteredProducts = result.filter(
        (item) => item.category === category
      );
      setProducts(filteredProducts);
    }

    getProducts();
  }, []);

  return (
    <Block white>
      <Block flex={false} row center space="between" style={styles.header}>
        <Text primary h1 bold>
          Explore {categoryName}
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
        <Block flex={false} row middle style={styles.products}>
          {products.map((product, index) => (
            <TouchableOpacity
              key={product.name}
              style={{ width: width * 0.4, marginHorizontal: 5 }}
              onPress={() =>
                navigation.navigate("ProductDescription", {
                  product: product,
                })
              }
              key={index}
            >
              <Card center middle shadow style={styles.product}>
                <Badge
                  margin={[0, 0, 15]}
                  size={130}
                  color="rgba(41,216,143,0.20)"
                >
                  <Image
                    source={{ uri: product.productImg }}
                    style={styles.image}
                  />
                </Badge>
                <Block row center>
                  <Block column>
                    <Text h3 bold>
                      {product.productName}
                    </Text>
                    <Text gray caption>
                      Rs. {product.price}
                    </Text>
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
  products: {
    flexWrap: "wrap",
    paddingHorizontal: theme.sizes.base * 1,
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
    backgroundColor: theme.colors.white,
    width: width * 0.08,
    height: width * 0.08,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
  },
});
export default ExploreScreen;
