import React, { useContext, useEffect } from "react";
import { Image, Dimensions, Modal, Alert } from "react-native";
import { Button, Block, Text } from "../components/elements";
import { theme } from "../constants";

import * as ImagePicker from "expo-image-picker";
import { Context as AuthContext } from "../context/AuthContext";
const { width, height } = Dimensions.get("window");

const ImageSelecter = ({
  image,
  setImage,
  changePicture,
  setChangePicture,
}) => {
  const {
    state: { imageUri, userId },
    uploadImage,
  } = useContext(AuthContext);
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
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
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
      .then(() => uploadImage(imageUrl, userId));
  };

  const ButtonAlert = () =>
    Alert.alert("Change Profile Picture", "Select new Image", [
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
      <Block>
        <Block flex={5}>
          <Block center middle style={{ borderWidth: 2 }}>
            {imageUri !== "" ? (
              <Image
                source={{ uri: imageUri }}
                style={{ maxHeight: height * 0.6, maxWidth: width }}
              />
            ) : image !== "" ? (
              <Image
                source={{ uri: image }}
                style={{ maxHeight: height * 0.6, maxWidth: width }}
              />
            ) : (
              <Image
                source={require("../../assets/blank-avatar.png")}
                style={{ maxHeight: height * 0.6, maxWidth: width }}
              />
            )}
          </Block>
        </Block>

        <Block bottom center flex={1}>
          <Block row>
            <Button
              style={{ width: width * 0.4, marginRight: 15 }}
              color={theme.colors.black}
              onPress={pickImage}
            >
              <Text bold white center>
                Upload Image
              </Text>
            </Button>
            <Button
              style={{ width: width * 0.4 }}
              color={theme.colors.black}
              onPress={ButtonAlert}
            >
              <Text bold white center>
                Remove Image
              </Text>
            </Button>
          </Block>
          <Button
            style={{ width: width * 0.85 }}
            onPress={() => setChangePicture(false)}
            color={theme.colors.black}
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

export default ImageSelecter;
