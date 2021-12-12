import React, { useContext, useEffect, useState } from "react";
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
import { Context as OrderContext } from "../context/OrderContext";
import { Context as ProductContext } from "../context/ProductContext";
import { FontAwesome5 } from "@expo/vector-icons";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import api from "../api/greenverse";

const ConfirmCheckoutScreen = ({ route, navigation }) => {
  const today = new Date(Date.now());
  const {
    totalBill,
    method,
    cardNumber,
    name,
    address,
    zipcode,
    city,
    number,
  } = route.params;
  const [paymentLoading, setLoading] = useState(false);

  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();
  const {
    state: { imageUri, userId, email },
  } = useContext(AuthContext);
  const { placeOrder } = useContext(OrderContext);
  const {
    state: { cart },
    setCartFromLocal,
  } = useContext(ProductContext);

  const handlePlaceOrder = () => {
    let ids = [];
    cart.forEach((item) => {
      ids = [...ids, item.id];
    });

    console.log(userId);
    placeOrder(
      {
        userId: userId,
        productId: ids,
        method: method,
        amount: totalBill,
        cardNumber: cardNumber,
        address: address,
        zipcode: zipcode,
        city: city,
        contact: number,
      },
      navigation.navigate("Cart")
    );

    setCartFromLocal({ cart: [] });
  };

  const fetchPaymentIntentClientSecret = async () => {
    const response = await api.post("/create-payment-intent", {
      amount: Math.round((totalBill / 176) * 100),
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
    console.log(billingDetails);
    //2.Fetch the intent client secret from the backend
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();

      //2. confirm the payment
      if (error) {
        setLoading(false);
        alert("Unable to process payment");
      } else {
        const confirmResponse = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails: billingDetails,
        });
        console.log(confirmResponse);
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
                handlePlaceOrder();
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
          Confirm Checkout
        </Text>
        <Button onPress={() => navigation.navigate("Settings")}>
          <FontAwesome5 name="home" size={30} color={theme.colors.primary} />
        </Button>
      </Block>
      {paymentLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : null}
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
              Payment Method:
            </Text>
          </Block>
          <Block row flex={7}>
            <Text h3 bold primary>
              {method}
            </Text>
          </Block>
        </Block>

        {method !== "Debit Card" ? null : (
          <>
            <Divider margin={[theme.sizes.base, theme.sizes.base]} />
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
                Phone Number:
              </Text>
            </Block>
            <Block flex={7}>
              <Text h3 bold primary>
                {number}
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
              disabled={loading}
              onPress={handlePayPress}
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
  card: {
    backgroundColor: "#efefefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});
export default ConfirmCheckoutScreen;
