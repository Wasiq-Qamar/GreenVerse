import React, { useEffect, useContext } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "./src/constants";
//  NAVIGATION
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//  SCREENS
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import VolunteerListScreen from "./src/screens/VolunteerListScreen";
import SplashScreen from "./src/screens/SplashScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import TasksListScreen from "./src/screens/TasksListScreen";
import NgoListScreen from "./src/screens/NgoListScreen";
import TaskCreateScreen from "./src/screens/TaskCreateScreen";
import DonationScreen from "./src/screens/DonationScreen";
import ConfirmDonationScreen from "./src/screens/ConfirmDonationScreen";
import DonateListScreen from "./src/screens/DonateListScreen";
import TaskDetailsScreen from "./src/screens/TaskDetailsScreen";

//  CONTEXT
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as TaskProvider } from "./src/context/TaskContext";
import { Context as AuthContext } from "./src/context/AuthContext";

//ICONS
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const defaultNavigationOptions = {
  headerStyle: {
    height: theme.sizes.base * 4,
    backgroundColor: theme.colors.white,
    borderBottomColor: "transparent",
    elevation: 0,
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

const TaskLists = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavigationOptions}>
      <Stack.Screen
        name="VolunteerTasksList"
        component={VolunteerListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="TasksList" component={TasksListScreen} />
      <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
      <Stack.Screen name="TaskCreate" component={TaskCreateScreen} />
    </Stack.Navigator>
  );
};

const NgoLists = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavigationOptions}>
      <Stack.Screen
        name="DonateNgosList"
        component={DonateListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="NgosList" component={NgoListScreen} />
      <Stack.Screen name="Donate" component={DonationScreen} />
      <Stack.Screen name="ConfirmDonation" component={ConfirmDonationScreen} />
    </Stack.Navigator>
  );
};

const Home = () => {
  return (
    <BottomTab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 12, paddingBottom: 10 },
        style: { minHeight: 55, paddingTop: 10 },
        activeTintColor: theme.colors.primary,
        inactiveTintColor: theme.colors.gray,
      }}
    >
      <BottomTab.Screen
        name="VolunteerList"
        component={TaskLists}
        options={{
          tabBarIcon: ({ color }) => (
            <Foundation name="trees" size={24} color={color} />
          ),
          title: "Volunteer",
        }}
      />
      <BottomTab.Screen
        name="DonateList"
        component={NgoLists}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="hands-helping" size={24} color={color} />
          ),
          title: "Donate",
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={24} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

function App() {
  const { tryLocalSignin, state } = useContext(AuthContext);
  let token;

  useEffect(() => {
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
      <NavigationContainer>
        <Stack.Navigator screenOptions={defaultNavigationOptions}>
          {state.isLoading ? (
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{ headerShown: false }}
            />
          ) : token || state.token ? (
            <>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
              />
            </>
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
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default () => {
  return (
    <TaskProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </TaskProvider>
  );
};
