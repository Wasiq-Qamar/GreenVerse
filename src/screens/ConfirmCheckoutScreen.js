import React, { useContext, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { FAB } from "react-native-elements";
import { RadioButton } from "react-native-paper";

import {
  Card,
  Divider,
  Button,
  Block,
  Text,
  Input,
  Switch,
} from "../components/elements";
import Spacer from "../components/Spacer";
import { theme, mocks } from "../constants";
const { width } = Dimensions.get("window");
import { Context as AuthContext } from "../context/AuthContext";
import { FontAwesome5 } from "@expo/vector-icons";

const ConfirmCheckoutScreen = ({ route, navigation }) => {
  const today = new Date(Date.now());
  const { totalBill, method, cardNumber, name, address, zipcode, city } =
    route.params;
  const {
    state: { imageUri },
  } = useContext(AuthContext);
  return (
    <Block white>
      <Block flex={false} row center space="between" style={styles.header}>
        <Text primary h1 bold style={{ width: width * 0.5 }}>
          Confirm Checkout
        </Text>
        <Button onPress={() => navigation.navigate("Settings")}>
          <FontAwesome5 name="home" size={30} color={theme.colors.primary} />
        </Button>
      </Block>
      <Block flex={false} column style={styles.form}>
        <Block flex={false} row center space="between" margin={[0, 0, 10, 0]}>
          <Block flex={1.5}>
            <Text left primary>
              Total Bill:
            </Text>
          </Block>
          <Block flex={7}>
            <Text h3 bold primary>
              {totalBill}
            </Text>
          </Block>
        </Block>

        <Block flex={false} row center space="between">
          <Block flex={1.5}>
            <Text left primary>
              Donation Method:
            </Text>
          </Block>
          <Block row flex={7}>
            <Text h3 bold primary>
              {method}
            </Text>
          </Block>
        </Block>

        {cardNumber === "" ? null : (
          <>
            <Divider margin={[theme.sizes.base, theme.sizes.base]} />
            <Block flex={false} row center space="between">
              <Block flex={1.5}>
                <Text left primary>
                  Card Number:
                </Text>
              </Block>
              <Block flex={7}>
                <Text h3 bold primary>
                  {cardNumber}
                </Text>
              </Block>
            </Block>
          </>
        )}

        <Divider margin={[theme.sizes.base, theme.sizes.base]} />

        <Block flex={false} left>
          <Text h2 primary bold>
            Delivery Details
          </Text>
        </Block>

        <Spacer>
          <Block flex={false} row center space="between" margin={[0, 0, 10, 0]}>
            <Block flex={1.5}>
              <Text left primary>
                Full Name:
              </Text>
            </Block>
            <Block flex={7}>
              <Text h3 bold primary>
                {name}
              </Text>
            </Block>
          </Block>

          <Block flex={false} row center space="between" margin={[0, 0, 10, 0]}>
            <Block flex={1.5}>
              <Text left primary>
                Address:
              </Text>
            </Block>
            <Block flex={7}>
              <Text h3 bold primary>
                {address}
              </Text>
            </Block>
          </Block>

          <Block flex={false} row center space="between" margin={[0, 0, 10, 0]}>
            <Block flex={1.5}>
              <Text left primary>
                Zipcode:
              </Text>
            </Block>
            <Block flex={7}>
              <Text h3 bold primary>
                {zipcode}
              </Text>
            </Block>
          </Block>

          <Block flex={false} row center space="between" margin={[0, 0, 10, 0]}>
            <Block flex={1.5}>
              <Text left primary>
                City:
              </Text>
            </Block>
            <Block flex={7}>
              <Text h3 bold primary>
                {city}
              </Text>
            </Block>
          </Block>
        </Spacer>

        <Block flex={false}>
          <Block flex={1} center>
            <Button
              style={{ width: width * 0.4 }}
              color={theme.colors.primary}
              onPress={() => navigation.navigate("Cart")}
            >
              <Text h3 center white bold>
                Confirm Order
              </Text>
            </Button>
          </Block>
        </Block>
      </Block>
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
  form: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  input: {
    paddingHorizontal: 10,
    overflow: "scroll",
    borderWidth: 1,
    width: width * 0.7,
  },
  image: { width: 35, height: 35, borderRadius: 50 },
});
export default ConfirmCheckoutScreen;
