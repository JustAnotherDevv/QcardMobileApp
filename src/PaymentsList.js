import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Button,
  Input,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { BarCodeScanner, BarCodeScannerResult } from "expo-barcode-scanner";
import BarcodeMask from "react-native-barcode-mask";
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
  TextInput,
} from "react-native-paper";

const DATA = [
  {
    id: "0",
    name: "Jan Kowalski",
    amount: "50",
    date: "06.05.2021",
  },
  {
    id: "1",
    name: "Andrzej Nowak",
    amount: "150",
    date: "02.05.2021",
  },
  {
    id: "2",
    name: "Aneta Wójcik",
    amount: "30",
    date: "02.05.2021",
  },
  {
    id: "3",
    name: "Robert Zieliński",
    amount: "50",
    date: "01.05.2021",
  },
  {
    id: "4",
    name: "Marzena Szymańska",
    amount: "25",
    date: "01.05.2021",
  },
  {
    id: "5",
    name: "Agnieszka Kowalczyk",
    amount: "170",
    date: "22.04.2021",
  },
  {
    id: "6",
    name: "Tadeusz Kamiński",
    amount: "15",
    date: "18.04.2021",
  },
  {
    id: "7",
    name: "Dawid Wisniewski",
    amount: "40",
    date: "16.04.2021",
  },
  {
    id: "8",
    name: "Paweł Kowalczyk",
    amount: "60",
    date: "06.04.2021",
  },
  {
    id: "9",
    name: "Tadeusz Kamiński",
    amount: "90",
    date: "03.04.2021",
  },
  {
    id: "10",
    name: "Dawid Wisniewski",
    amount: "120",
    date: "01.04.2021",
  },
  {
    id: "11",
    name: "Paweł Kowalczyk",
    amount: "30",
    date: "01.04.2021",
  },
];

const Item = ({ name, amount, date }) => (
  <View style={styles.item}>
    <View style={styles.itemInside}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.title}>Kwota: {amount}</Text>
      <Text style={styles.title}>Data: {date}</Text>
    </View>
    <IconButton icon="qrcode" color="#ffffff" size={50}></IconButton>
  </View>
);

export default function PaymentsList({ navigation }) {
  const renderItem = ({ item }) => (
    <Item name={item.name} amount={item.amount} date={item.date} />
  );
  return (
    <View style={styles.container}>
      <Title
        style={{
          marginBottom: 15,
          marginTop: 5,
          paddingTop: 20,
          textAlign: "center",
          color: "#1a1a1a",
          fontSize: 45,
          borderRadius: 10,
        }}
      >
        Qcard
      </Title>
      <Title
        style={{
          marginBottom: 5,
          marginTop: 10,
          paddingTop: 20,
          textAlign: "center",
          color: "#1a1a1a",
          fontSize: 30,
          borderRadius: 10,
        }}
      >
        Płatnośći od kupujących
      </Title>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <Appbar style={styles.bottom}>
        <Appbar.Action
          icon="qrcode"
          size={31}
          onPress={() => navigation.navigate("GenerateScreen")}
          style={styles.bottomIcon}
        />
        <Appbar.Action
          icon="scan-helper"
          size={35}
          onPress={() => navigation.navigate("BarCodeScanScreen")}
          style={styles.bottomIcon}
        />
        <Appbar.Action
          icon="cash-usd"
          size={31}
          onPress={() => navigation.navigate("PaymentsList")}
          style={styles.bottomIcon}
        />
      </Appbar>
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
  bottom: {
    position: "absolute",
    width: "100%",
    height: 70,
    bottom: 0,
    backgroundColor: "#006093",
    flex: 1,
    justifyContent: "center",
  },
  bottomIcon: {
    marginHorizontal: 40,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#0081c6",
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  itemInside: {
    justifyContent: "space-around",
  },
  title: {
    fontSize: 20,
    color: "#ffffff",
  },
});
