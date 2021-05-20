import { useContext } from "react";
import { Context as LocationContext } from "../context/LocationContext";
import { Context as TrackContext } from "../context/TrackContext";

export default () => {
  const { createTrack } = useContext(TrackContext);
  const {
    state: { name, locations },
    reset,
  } = useContext(LocationContext);

  const saveTrack = async (callback) => {
    try {
      await createTrack(name, locations);
      reset();
      callback();
    } catch (err) {
      console.log(err);
    }
  };

  return [saveTrack];
};
