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
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const VolunteerListScreen = ({ route, navigation }) => {
  const today = new Date(Date.now());
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState();
  const [cardCvv, setCardCvv] = useState();
  const [anonymous, setAnonymous] = useState(false);
  const { name } = route.params;
  const {
    state: { imageUri },
  } = useContext(AuthContext);
  return (
    <Block white>
      <Block flex={false} row center space="between" style={styles.header}>
        <Text primary h1 bold style={{ width: width * 0.5 }}>
          New Donation
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
      <Block flex={false} column style={styles.form}>
        <Block flex={false} row center space="between">
          <Block flex={1.5}>
            <Text left primary>
              Amount:
            </Text>
          </Block>
          <Block flex={7}>
            <Input
              defaultValue={amount}
              style={[styles.input]}
              onChangeText={setAmount}
              placeholder="Donation Amount"
              number
            />
          </Block>
        </Block>

        <Block flex={false} row center space="between">
          <Block flex={1.5}>
            <Text left primary>
              Donation Method:
            </Text>
          </Block>
          <Block row flex={7}>
            <Block row flex={3}>
              <RadioButton
                value="EasyPaisa"
                status={method === "EasyPaisa" ? "checked" : "unchecked"}
                onPress={() => setMethod("EasyPaisa")}
                color={theme.colors.primary}
              />
              <Block middle flex={false}>
                <Text primary>EasyPaisa</Text>
              </Block>
            </Block>
            <Block row flex={3}>
              <RadioButton
                value="Debit Card"
                status={method === "Debit Card" ? "checked" : "unchecked"}
                onPress={() => setMethod("Debit Card")}
                color={theme.colors.primary}
              />
              <Block middle flex={false}>
                <Text primary>Debit Card</Text>
              </Block>
            </Block>
          </Block>
        </Block>

        <Divider margin={[theme.sizes.base, theme.sizes.base]} />

        {method === "Debit Card" ? (
          <>
            <Block flex={false} row center space="between">
              <Block flex={1.5}>
                <Text left primary>
                  Card Number:
                </Text>
              </Block>
              <Block flex={7}>
                <Input
                  defaultValue={cardNumber}
                  style={styles.input}
                  onChangeText={setCardNumber}
                  placeholder="Enter Card Number"
                  number
                />
              </Block>
            </Block>

            <Block flex={false} row center space="between">
              <Block flex={1.5}>
                <Text left primary>
                  Expiry Date:
                </Text>
              </Block>
              <Block flex={3.5}>
                <Input
                  defaultValue={cardExpiry}
                  style={[styles.input, { width: width * 0.3 }]}
                  onChangeText={setCardExpiry}
                  placeholder=" Card Expiry Date"
                  number
                />
              </Block>

              <Block flex={1}>
                <Text left primary>
                  CVV Code:
                </Text>
              </Block>
              <Block flex={2.5}>
                <Input
                  defaultValue={cardCvv}
                  style={[styles.input, { width: width * 0.24 }]}
                  onChangeText={setCardCvv}
                  placeholder=" CVV Code"
                  number
                />
              </Block>
            </Block>
          </>
        ) : method === "EasyPaisa" ? (
          <Block flex={false} row center space="between">
            <Block flex={1.5}>
              <Text left primary>
                Phone Number:
              </Text>
            </Block>
            <Block flex={7}>
              <Input
                defaultValue={cardNumber}
                style={styles.input}
                onChangeText={setCardNumber}
                placeholder="Enter Phone Number"
                number
              />
            </Block>
          </Block>
        ) : null}

        <Divider margin={[theme.sizes.base, theme.sizes.base]} />

        <Block flex={false} left>
          <Text h2 primary bold>
            Donate To
          </Text>
        </Block>

        <Spacer>
          <Block row flex={false} left>
            <Block flex={2}>
              <Text primary bold>
                Organization:
              </Text>
            </Block>
            <Block flex={6}>
              <Text style={{ width: width * 0.6 }} primary>
                {name}
              </Text>
            </Block>
          </Block>
        </Spacer>
        <Spacer>
          <Block row flex={false} left>
            <Block center flex={2}>
              <Switch
                value={anonymous}
                onValueChange={() => setAnonymous(!anonymous)}
              />
            </Block>
            <Block flex={6}>
              <Text primary bold>
                Send as an anonymous donor
              </Text>
            </Block>
          </Block>
        </Spacer>

        <Block flex={false}>
          <Block flex={1} center>
            <Button
              style={{ width: width * 0.4 }}
              color={theme.colors.primary}
              onPress={() =>
                navigation.navigate("ConfirmDonation", {
                  amount,
                  method,
                  cardNumber,
                  name,
                  anonymous,
                })
              }
            >
              <Text h3 center white bold>
                Donate
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
export default VolunteerListScreen;
