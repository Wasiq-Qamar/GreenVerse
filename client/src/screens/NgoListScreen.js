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

const NgoListScreen = ({ navigation }) => {
  const ngos = mocks.ngos;
  const {
    state: { imageUri },
  } = useContext(AuthContext);

  return (
    <Block white>
      <Block flex={false} row center space="between" style={styles.header}>
        <Text primary h1 bold style={{ width: width / 2 }}>
          NGOs List
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingVertical: theme.sizes.base * 2 }}
      >
        <Block flex={false} column space="between" style={styles.ngos}>
          {ngos.map((ngo, index) => (
            <TouchableOpacity key={index}>
              <Card column shadow style={styles.ngo}>
                <Block row flex={false}>
                  <Badge margin={[0, 0, 15]} size={60}>
                    <Image source={ngo.image} style={styles.image} />
                  </Badge>
                  <Block flex={false} margin={[15, 0]}>
                    <Text h3 bold primary style={{ width: width / 2 }}>
                      {ngo.name}
                    </Text>
                  </Block>
                </Block>
                <Block flex={false}>
                  <Text>{ngo.description}</Text>
                </Block>

                <Block
                  flex={false}
                  style={{
                    alignItems: "flex-end",
                  }}
                >
                  <Button
                    style={{ width: width * 0.3 }}
                    color={theme.colors.accent}
                    right
                    onPress={() =>
                      navigation.navigate("Donate", { name: ngo.name })
                    }
                  >
                    <Text bold white center>
                      Donate
                    </Text>
                  </Button>
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
  ngos: {
    // flexWrap: "wrap",
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5,
  },
  ngo: {
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 1,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 1,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 1,
  },
  ngoText: {
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 1.5,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 1.5,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 1.5,
  },
  image: { width: 50, height: 50, borderRadius: 50 },
  cover: { maxWidth: width * 0.7, maxHeight: 150 },
});
export default NgoListScreen;
