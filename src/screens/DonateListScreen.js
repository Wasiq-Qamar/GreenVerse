import React from "react";
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

const DonateListScreen = ({ navigation }) => {
  const categories = mocks.donateCategories;

  return (
    <Block white>
      <Block flex={false} row center space="between" style={styles.header}>
        <Text primary h1 bold>
          Donate.
        </Text>
        <Button onPress={() => navigation.navigate("Settings")}>
          <Image
            source={require("../../assets/images/avatar.png")}
            style={styles.avatar}
          />
        </Button>
      </Block>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingVertical: theme.sizes.base * 2 }}
      >
        <Block flex={false} column space="between" style={styles.categories}>
          {categories.map((category, index) => (
            <Block row space="between" key={index}>
              <TouchableOpacity>
                <Card center middle shadow style={styles.category}>
                  <Badge margin={[0, 0, 15]} size={60}>
                    <Image source={category.image} style={styles.image} />
                  </Badge>
                  <Text h3 center bold height={20} primary>
                    {category.name}
                  </Text>
                </Card>
              </TouchableOpacity>
              <TouchableOpacity>
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
export default DonateListScreen;
