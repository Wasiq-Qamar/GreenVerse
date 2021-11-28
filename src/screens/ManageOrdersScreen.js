import React, { useState, useContext, useEffect } from "react";
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
import { Context as OrderContext } from "../context/OrderContext";
import { DataTable } from "react-native-paper";

const ManageOrdersScreen = ({ navigation }) => {
  const {
    state: { imageUri, userId },
    signout,
  } = useContext(AuthContext);

  const {
    state: { orders },
    fetchOrders,
  } = useContext(OrderContext);

  useEffect(() => {
    fetchOrders({ userId });
  }, []);

  // const orders = [
  //   {
  //     id: 1,
  //     name: "Order 1",
  //     amount: "20,000",
  //     date: "05-06-2021",
  //   },
  //   {
  //     id: 2,
  //     name: "Order 2",
  //     amount: "35,000",
  //     date: "04-03-2021",
  //   },
  // ];

  return (
    <Block white paddingTop={20}>
      <Block flex={false} row center space="between" style={styles.header}>
        <Block flex={3}>
          <Text h1 bold primary>
            My Orders
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
            <DataTable.Title style={{ flex: 4 }}> Order ID </DataTable.Title>
            <DataTable.Title style={{ flex: 2 }}>
              {" "}
              Order Amount{" "}
            </DataTable.Title>
            <DataTable.Title style={{ flex: 2 }}> Date </DataTable.Title>
            <DataTable.Title style={{ flex: 2 }}> Status </DataTable.Title>
          </DataTable.Header>

          {orders.map((order, index) => (
            <TouchableOpacity key={order._id}>
              <DataTable.Row
                key={order._id}
                style={index % 2 === 0 ? styles.evenRow : null}
              >
                <DataTable.Title style={{ flex: 4 }}>
                  {" "}
                  {order._id}{" "}
                </DataTable.Title>
                <DataTable.Title style={{ flex: 2 }}>
                  {"Rs. "}
                  {order.amount}{" "}
                </DataTable.Title>
                <DataTable.Title style={{ flex: 2 }}>
                  {" "}
                  {order.orderDate.split("T")[0]}{" "}
                </DataTable.Title>
                <DataTable.Title style={{ flex: 2 }}>
                  {" "}
                  {order.completed ? "Completed" : "Pending"}{" "}
                </DataTable.Title>
              </DataTable.Row>
            </TouchableOpacity>
          ))}
        </DataTable>
      </ScrollView>
    </Block>
  );
};

export default ManageOrdersScreen;

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
