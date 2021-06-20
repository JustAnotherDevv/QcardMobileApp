import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Button,
} from "react-native";
import {
  Button as PaperButton,
  Avatar,
  Card,
  Title,
  Paragraph,
  IconButton,
  Text,
  Menu,
  Divider,
  Provider,
  Appbar,
  Modal,
  Portal,
  Provider as PaperProvider,
} from "react-native-paper";
import GenerateScreen from "./src/GenerateScreen.js";
import BarCodeScanScreen from "./src/ScanScreen.js";
import PaymentsList from "./src/PaymentsList.js";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="GenerateScreen"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="BarCodeScanScreen"
              component={BarCodeScanScreen}
            />
            <Stack.Screen name="GenerateScreen" component={GenerateScreen} />
            <Stack.Screen name="PaymentsList" component={PaymentsList} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </PaperProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
  },
});
