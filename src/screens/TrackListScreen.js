import React, { useContext, useEffect } from "react";
import { StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Text, ListItem } from "react-native-elements";
import { Context as TrackContext } from "../context/TrackContext";
import { useFocusEffect } from "@react-navigation/native";

const TrackListScreen = ({ navigation }) => {
  const { state, fetchTracks } = useContext(TrackContext);

  useFocusEffect(
    React.useCallback(() => {
      fetchTracks();
    }, [])
  );

  return (
    <>
      <Text h2 style={{ textAlign: "center" }}>
        Tracks List{" "}
      </Text>
      <FlatList
        data={state}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("TrackDetail", { _id: item._id });
              }}
            >
              <ListItem key={item._id} bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>{item.name}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default TrackListScreen;
