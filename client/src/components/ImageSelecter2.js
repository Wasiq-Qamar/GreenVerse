import React, { useContext, useEffect } from "react";
import { Image, Dimensions, Modal, Alert, StyleSheet } from "react-native";
import { Button, Block, Text } from "../components/elements";
import { theme } from "../constants";

import * as ImagePicker from "expo-image-picker";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as TaskContext } from "../context/TaskContext";
// import { styles } from "./elements/Block";
const { width, height } = Dimensions.get("window");

const ImageSelecter2 = ({
  image,
  setImage,
  changePicture,
  setChangePicture,
  taskId,
}) => {
  const {
    state: { imageUri, userId },
    uploadImage,
  } = useContext(AuthContext);
  const { uploadTaskImage } = useContext(TaskContext);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      const split = result.uri.split(".");
      const split2 = result.uri.split("/");
      let file = {
        uri: result.uri,
        type: `test/${split[split.length - 1]}`,
        name: `test.${split[split.length - 1]}`,
      };

      setImage(result.uri);
      handleUpload(file);
    }
  };

  const handleUpload = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "greenverse_upl");
    formData.append("cloud_name", "wasiqq-cloudinary");
    let imageUrl;
    fetch("https://api.cloudinary.com/v1_1/wasiqq-cloudinary/image/upload", {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        imageUrl = data.url;
      })
      .then(() => uploadTaskImage({ id: taskId, image: imageUrl, userId }));
  };

  const ButtonAlert = () =>
    Alert.alert("Remove Profile Picture", " Image Removed", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  return (
    <Modal
      animationType="fade"
      visible={changePicture}
      onRequestClose={() => setChangePicture(false)}
    >
      <Block style={{ backgroundColor: theme.colors.white }}>
        <Block flex={5}>
          <Block center middle style={styles.imageContainer}>
            {image ? (
              <Image
                source={{ uri: image }}
                style={{
                  height: height * 0.6,
                  width: width,
                  resizeMode: "contain",
                }}
              />
            ) : (
              <Text>No Image Selected</Text>
            )}
          </Block>
        </Block>

        <Block bottom center flex={1}>
          <Block row>
            <Button
              style={{ width: width * 0.4, marginRight: 15 }}
              color={theme.colors.primary}
              onPress={pickImage}
            >
              <Text bold white center>
                Upload Image
              </Text>
            </Button>
            <Button
              style={{ width: width * 0.4 }}
              color="#8B0000"
              onPress={() => uploadTaskImage({ id: taskId, image: "", userId })}
            >
              <Text bold white center>
                Remove Image
              </Text>
            </Button>
          </Block>
          <Button
            style={{ width: width * 0.85 }}
            onPress={() => setChangePicture(false)}
            gradient
          >
            <Text bold center white>
              Done
            </Text>
          </Button>
        </Block>
      </Block>
    </Modal>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    borderWidth: 2,
    margin: 10,
    overflow: "hidden",
  },
});

export default ImageSelecter2;
