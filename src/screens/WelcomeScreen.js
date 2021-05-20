import React, { useState } from "react";
import { Block, Button, Text } from "../components";
import Illustrations from "../components/Illustrations";
import TermsOfService from "../components/TermsOfService";
import { theme } from "../constants";

const WelcomeScreen = ({ navigation }) => {
  const illustrations = [
    { id: 1, source: require("../../assets/images/illustration_1.png") },
    { id: 2, source: require("../../assets/images/illustration_2.png") },
    { id: 3, source: require("../../assets/images/illustration_3.png") },
  ];
  const [showTerms, setShowTerms] = useState(false);

  return (
    <Block>
      <Block center bottom flex={0.4}>
        <Text h1 center bold primary>
          Green
          <Text h1 bold accent>
            Verse.
          </Text>
        </Text>
        <Text h3 gray2 style={{ marginTop: theme.sizes.padding / 2 }}>
          Save The Nature and Give Back
        </Text>
      </Block>
      <Block center middle>
        <Illustrations illustrations={illustrations} />
      </Block>
      <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
        <Button gradient onPress={() => navigation.navigate("Signin")}>
          <Text center semibold white>
            Login
          </Text>
        </Button>
        <Button shadow onPress={() => navigation.navigate("Signup")}>
          <Text center semibold>
            Signup
          </Text>
        </Button>
        <Button onPress={() => setShowTerms(true)}>
          <Text center caption gray>
            Terms of service
          </Text>
        </Button>
      </Block>
      {showTerms ? (
        <TermsOfService showTerms={showTerms} setShowTerms={setShowTerms} />
      ) : null}
    </Block>
  );
};

export default WelcomeScreen;
