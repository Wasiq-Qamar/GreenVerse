import React, { useContext, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
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
import { Context as DonationContext } from "../context/DonationContext";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import api from "../api/greenverse";

const VolunteerListScreen = ({ route, navigation }) => {
  const { amount, method, cardNumber, name, anonymous } = route.params;
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();
  const [paymentLoading, setLoading] = useState(false);
  const {
    state: { imageUri, email, userId },
  } = useContext(AuthContext);
  const { addDonation } = useContext(DonationContext);

  const handleDonation = (callback) => {
    addDonation(
      {
        organization: name,
        userId,
        method: "Debit Card",
        amount,
        cardNumber: cardDetails.last4,
        anonymous,
      },
      callback
    );
  };

  const fetchPaymentIntentClientSecret = async () => {
    const response = await api.post("/create-payment-intent", {
      amount: Math.round((amount / 176) * 100),
    });
    const { clientSecret, error } = response.data;

    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    setLoading(true);
    //1.Gather the customer's billing information (e.g., email)
    if (!cardDetails?.complete || !email) {
      setLoading(false);
      Alert.alert("Please enter Complete card details and Email");
      return;
    }
    const billingDetails = {
      email: email,
    };
    //2.Fetch the intent client secret from the backend
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();

      //2. confirm the payment
      if (error) {
        alert("Unable to process payment");
        setLoading(false);
      } else {
        const confirmResponse = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails: billingDetails,
        });
        const { paymentIntent, error } = confirmResponse;
        if (error) {
          setLoading(false);
          alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          setLoading(false);
          Alert.alert("Transaction Alert", "Payment Successful", [
            {
              text: "OK",
              onPress: () => {
                console.log("Payment successful ", paymentIntent);
                handleDonation();
                navigation.navigate("DonateNgosList");
              },
            },
          ]);
        }
      }
    } catch (e) {
      console.log(e);
    }
    //3.Confirm the payment with the card details
  };

  return (
    <Block white>
      <Block flex={false} row center space="between" style={styles.header}>
        <Text primary h1 bold style={{ width: width * 0.5 }}>
          Confirm Donation
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
      {paymentLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : null}
      <Block flex={false} column style={styles.form}>
        <Spacer>
          <Block flex={false} row center space="between">
            <Block flex={2.5}>
              <Text left primary bold h3>
                Amount:
              </Text>
            </Block>
            <Block flex={7}>
              <Text left primary h3>
                {amount}
              </Text>
            </Block>
          </Block>
        </Spacer>

        <Spacer>
          <Block flex={false} row center space="between">
            <Block flex={2.5}>
              <Text left primary bold h3>
                Donation Method:
              </Text>
            </Block>
            <Block row flex={7}>
              <Text left primary h3>
                Online Payment
              </Text>
            </Block>
          </Block>
        </Spacer>

        <Divider margin={[theme.sizes.base, theme.sizes.base]} />

        <Spacer>
          {/* {method === "Debit Card" ? (
            <>
              <Block flex={false} row center space="between">
                <Block flex={2.5}>
                  <Text left primary bold h3>
                    Card Number:
                  </Text>
                </Block>
                <Block flex={7} h3>
                  <Text left primary>
                    {cardNumber}
                  </Text>
                </Block>
              </Block>
            </>
          ) : method === "EasyPaisa" ? (
            <Block flex={false} row center space="between">
              <Block flex={2.5} h3>
                <Text left primary bold h3>
                  Phone Number:
                </Text>
              </Block>
              <Block flex={7}>
                <Text left primary h3>
                  {cardNumber}
                </Text>
              </Block>
            </Block>
          ) : null} */}
          <CardField
            postalCodeEnabled={false}
            placeholder={{
              number: "4242 4242 4242 4242",
            }}
            cardStyle={styles.card}
            style={styles.cardContainer}
            onCardChange={(cardDetails) => {
              setCardDetails(cardDetails);
            }}
          />
        </Spacer>

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
              <Switch value={anonymous} />
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
              style={{ width: width * 0.5 }}
              color={theme.colors.primary}
              disabled={loading}
              onPress={handlePayPress}
            >
              <Text h3 center white bold>
                Confirm Transaction
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
  card: {
    backgroundColor: "#efefefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});
export default VolunteerListScreen;
