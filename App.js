import React, { useEffect, useContext } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "./src/constants";
//  NAVIGATION
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//  SCREENS
import AccountScreen from "./src/screens/AccountScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import SplashScreen from "./src/screens/SplashScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";

//  CONTEXT
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as LocationProvider } from "./src/context/LocationContext";
import { Provider as TrackProvider } from "./src/context/TrackContext";
import { Context as AuthContext } from "./src/context/AuthContext";

//ICONS
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#ffffff",
  },
};

const Track = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TrackList"
        component={TrackListScreen}
        options={{ title: "Tracks" }}
      />
      <Stack.Screen name="TrackDetail" component={TrackDetailScreen} />
    </Stack.Navigator>
  );
};

const Home = () => {
  return (
    <BottomTab.Navigator
      headerMode="none"
      tabBarOptions={{
        labelStyle: { fontSize: 15 },
        style: { minHeight: 50, maxHeight: 60 },
      }}
    >
      <BottomTab.Screen
        name="Track"
        component={Track}
        options={{
          tabBarIcon: () => (
            <FontAwesome name="th-list" size={24} color="black" />
          ),
        }}
      />
      <BottomTab.Screen
        name="TrackCreate"
        component={TrackCreateScreen}
        options={{
          title: "Add Track",
          tabBarIcon: () => <Entypo name="plus" size={24} />,
        }}
      />
      <BottomTab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: () => (
            <Ionicons name="settings" size={24} color="black" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

function App() {
  const { tryLocalSignin, state } = useContext(AuthContext);
  let token;
  const defaultNavigationOptions = {
    headerStyle: {
      height: theme.sizes.base * 4,
      backgroundColor: theme.colors.white, // or 'white
      borderBottomColor: "transparent",
      elevation: 0, // for android
    },
    headerLeftContainerStyle: {
      alignItems: "center",
      marginLeft: theme.sizes.base,
      paddingRight: theme.sizes.base,
    },
    headerRightContainerStyle: {
      alignItems: "center",
      paddingRight: theme.sizes.base,
    },
    headerTitle: null,
    headerBackImage: () => (
      <Ionicons name="chevron-back" size={24} color="black" />
    ),
  };

  useEffect(() => {
    state.isLoading = true;
    const localSignin = async () => {
      try {
        token = await AsyncStorage.getItem("token");
        if (token) {
          tryLocalSignin({ token });
        }
      } catch (err) {
        console.log(err);
      }
    };

    localSignin();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator screenOptions={defaultNavigationOptions}>
          {state.isLoading ? (
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{ headerShown: false }}
            />
          ) : (
            <>
              {token || state.token ? (
                <Stack.Screen
                  name="Home"
                  component={Home}
                  options={{ headerShown: false }}
                />
              ) : (
                <>
                  <Stack.Screen
                    name="Welcome"
                    component={WelcomeScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen name="Signin" component={SigninScreen} />
                  <Stack.Screen name="Signup" component={SignupScreen} />
                </>
              )}
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default () => {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
};
