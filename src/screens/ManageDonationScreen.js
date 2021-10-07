import React, { useState, useContext } from "react";
import {
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Button, Block, Text } from "../components/elements";
import { theme } from "../constants";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as DonationContext } from "../context/DonationContext";
import { DataTable } from "react-native-paper";

const { width, height } = Dimensions.get("window");

const ManageDonationScreen = ({ navigation }) => {
  const {
    state: { imageUri, userName, userId, userType },
    signout,
  } = useContext(AuthContext);
  const {
    state: { donations },
  } = useContext(DonationContext);

  // const donations = [
  //   {
  //     id: 1,
  //     name: "Edhi Welfare",
  //     amount: "20,000",
  //     anonymous: "Yes",
  //     date: "05-06-2021",
  //   },
  //   {
  //     id: 2,
  //     name: "Salyani Trust",
  //     amount: "35,000",
  //     anonymous: "No",
  //     date: "04-03-2021",
  //   },
  // ];

  return (
    <Block white paddingTop={20}>
      <Block flex={false} row center space="between" style={styles.header}>
        <Block flex={3}>
          <Text h1 bold primary>
            My Donations
          </Text>
        </Block>
        <Block flex={1} row space="between">
          <Button onPress={signout}>
            <SimpleLineIcons name="logout" size={24} color="black" />
          </Button>
          <Button onPress={() => navigation.navigate("SettingsScreen")}>
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

      <ScrollView showsVerticalScrollIndicator={false}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={{ flex: 2 }}>
              {" "}
              Organization Name{" "}
            </DataTable.Title>
            <DataTable.Title style={{ flex: 2 }}>
              {" "}
              Donation Amount{" "}
            </DataTable.Title>
            <DataTable.Title style={{ flex: 1.5 }}> Anonymous </DataTable.Title>
            <DataTable.Title style={{ flex: 1.5 }}> Date </DataTable.Title>
          </DataTable.Header>

          {donations.map((donation, index) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("DonationChannel", {
                  name: donation.organization,
                  amount: donation.amount,
                  date: donation.donationDate.split("T")[0],
                })
              }
              key={donation._id}
            >
              <DataTable.Row
                key={donation.id}
                style={index % 2 === 0 ? styles.evenRow : null}
              >
                <DataTable.Title style={{ flex: 2 }}>
                  {" "}
                  {donation.organization}{" "}
                </DataTable.Title>
                <DataTable.Title style={{ flex: 2 }}>
                  {"Rs. "}
                  {donation.amount}{" "}
                </DataTable.Title>
                <DataTable.Title style={{ flex: 1.5 }}>
                  {" "}
                  {donation.anonymous ? "Yes" : "No"}{" "}
                </DataTable.Title>
                <DataTable.Title style={{ flex: 1.5 }}>
                  {" "}
                  {donation.donationDate.split("T")[0]}{" "}
                </DataTable.Title>
              </DataTable.Row>
            </TouchableOpacity>
          ))}
        </DataTable>
      </ScrollView>
    </Block>
  );
};

export default ManageDonationScreen;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  avatar: {
    height: theme.sizes.base * 3,
    width: theme.sizes.base * 3,
    borderRadius: 50,
  },
  evenRow: {
    backgroundColor: "#f3f1f1",
  },
});
