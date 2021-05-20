import React, { useState, useContext } from "react";
import { Input, Button } from "react-native-elements";
import Spacer from "./Spacer";
import { Context as LocationContext } from "../context/LocationContext";
import useSaveTrack from "../hooks/useSaveTrack";
import { useNavigation } from "@react-navigation/native";

const TrackForm = () => {
  const navigation = useNavigation();
  const {
    state: { name, recording, locations },
    startRecording,
    stopRecording,
    changeName,
  } = useContext(LocationContext);
  const [saveTrack] = useSaveTrack();

  return (
    <>
      <Spacer>
        <Input
          value={name}
          placeholder="Enter track name"
          onChangeText={changeName}
        />
      </Spacer>
      <Spacer>
        {recording ? (
          <Button
            title="Stop"
            onPress={stopRecording}
            raised
            buttonStyle={{ backgroundColor: "#800000" }}
          />
        ) : (
          <Button title="Record" onPress={startRecording} />
        )}
      </Spacer>
      <Spacer>
        {!recording && locations.length ? (
          <Button
            title="Save Recording"
            onPress={() => {
              saveTrack(() => navigation.navigate("TrackList"));
            }}
          />
        ) : null}
      </Spacer>
    </>
  );
};

export default TrackForm;
