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
import ManageTasksScreen from "./src/screens/ManageTasksScreen";
import ManageDonationScreen from "./src/screens/ManageDonationScreen";
import TaskChannelScreen from "./src/screens/TaskChannelScreen";
import DonationChannelScreen from "./src/screens/DonationChannelScreen";
import ProductsScreen from "./src/screens/ProductsScreen";
import CartScreen from "./src/screens/CartScreen";
import ExploreScreen from "./src/screens/ExploreScreen";
import ProductDescriptionScreen from "./src/screens/ProductDescriptionScreen";
import CheckoutScreen from "./src/screens/CheckoutScreen";
import ConfirmCheckoutScreen from "./src/screens/ConfirmCheckoutScreen";
import ManageOrdersScreen from "./src/screens/ManageOrdersScreen";

//  CONTEXT
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as TaskProvider } from "./src/context/TaskContext";
import { Provider as DonationProvider } from "./src/context/DonationContext";
import { Provider as OrderProvider } from "./src/context/OrderContext";
import { Context as AuthContext } from "./src/context/AuthContext";

//ICONS
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

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

const SettingsStack = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavigationOptions}>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="MyTasks" component={ManageTasksScreen} />
      <Stack.Screen name="MyDonations" component={ManageDonationScreen} />
      <Stack.Screen name="MyOrders" component={ManageOrdersScreen} />
      <Stack.Screen name="TaskChannel" component={TaskChannelScreen} />
      <Stack.Screen name="DonationChannel" component={DonationChannelScreen} />
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
        component={SettingsStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={24} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const ProductsList = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavigationOptions}>
      <Stack.Screen
        name="Products"
        component={ProductsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Explore" component={ExploreScreen} />
      <Stack.Screen
        name="ProductDescription"
        component={ProductDescriptionScreen}
      />
    </Stack.Navigator>
  );
};

const CartList = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavigationOptions}>
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="ConfirmCheckout" component={ConfirmCheckoutScreen} />
    </Stack.Navigator>
  );
};

const Store = () => {
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
        name="ProductsList"
        component={ProductsList}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="store" size={24} color={color} />
          ),
          title: "Products",
        }}
      />
      <BottomTab.Screen
        name="Cart"
        component={CartList}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="shopping-cart" size={24} color={color} />
          ),
          title: "Cart",
        }}
      />
    </BottomTab.Navigator>
  );
};

function App() {
  const { clearIsLoading, tryLocalSignin, state } = useContext(AuthContext);
  let token;

  useEffect(() => {
    const localSignin = async () => {
      try {
        token = await AsyncStorage.getItem("token");
        if (token) {
          tryLocalSignin({ token });
        } else {
          clearIsLoading();
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
              <Stack.Screen
                name="Store"
                component={Store}
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
    <OrderProvider>
      <DonationProvider>
        <TaskProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </TaskProvider>
      </DonationProvider>
    </OrderProvider>
  );
};
