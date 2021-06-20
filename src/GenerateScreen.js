import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  IconButton,
  Text,
  Menu,
  Divider,
  Provider,
  Appbar,
  TextInput,
} from "react-native-paper";
import QRCode from "react-native-qrcode-svg";

const GenerateScreen = ({ navigation }) => {
  const [visible, setVisible] = React.useState(false);
  const [mailText, setMailText] = React.useState(" ");
  const [cardText, setCardText] = React.useState(" ");
  const [pinText, setPinText] = React.useState(" ");
  const [amountText, setAmountText] = React.useState(" ");
  const [dateText, setDateText] = React.useState(" ");

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const ClearUserData = () => {
    Alert.alert("Generowanie kodu QR", "Pomyslnie wygenerowano nowy kod QR");
    setMailText("");
    setDateText("");
    setPinText("");
    setCardText("");
    setAmountText("");
  };

  return (
    <View style={styles.scanCodeStyle}>
      <Title
        style={{
          marginBottom: 15,
          marginTop: 35,
          paddingTop: 20,
          textAlign: "center",
          color: "#1a1a1a",
          backgroundColor: "#ffffff",
          fontSize: 45,
          borderRadius: 10,
        }}
      >
        Qcard
      </Title>
      <View
        style={{ width: 430, backgroundColor: "#006093", borderRadius: 10 }}
      >
        <Title
          style={{ marginVertical: 20, textAlign: "center", color: "#ffffff" }}
        >
          Stwórz nową kartę QR
        </Title>
        <TextInput
          label="Email"
          value={mailText}
          Type="outlined"
          numberOfLines={1}
          onChangeText={(mailText) => setMailText(mailText)}
          style={styles.InputStyle}
        />
        <TextInput
          label="Nazwa karty"
          value={cardText}
          Type="outlined"
          numberOfLines={1}
          onChangeText={(cardText) => setCardText(cardText)}
          style={styles.InputStyle}
        />
        <TextInput
          label="PIN"
          value={pinText}
          Type="outlined"
          numberOfLines={1}
          onChangeText={(pinText) => setPinText(pinText)}
          style={styles.InputStyle}
        />
        <View style={{ height: 60, flexDirection: "row", alignSelf: "center" }}>
          <TextInput
            label="Kwota"
            value={amountText}
            Type="outlined"
            numberOfLines={1}
            onChangeText={(amountText) => setAmountText(amountText)}
            style={styles.smallInput}
          />
          <TextInput
            label="Data"
            value={dateText}
            Type="outlined"
            numberOfLines={1}
            onChangeText={(dateText) => setDateText(dateText)}
            style={styles.smallInput}
          />
        </View>
        <Button
          icon="qrcode"
          mode="contained"
          color="#00a2f9"
          onPress={() => ClearUserData()}
          style={{
            marginTop: 5,
            marginVertical: 20,
            width: 250,
            alignSelf: "center",
          }}
        >
          Generuj
        </Button>
      </View>
      <View
        style={{
          width: 430,
          height: 390,
          alignSelf: "center",
          marginTop: 0,
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
        }}
      >
        {mailText ? (
          <QRCode
            value={mailText}
            logo={{ uri: "https://i.imgur.com/td0htwb.png" }}
            logoSize={60}
            size={300}
            color="#0081c6"
          />
        ) : (
          <QRCode
            value=" "
            logo={{ uri: "https://i.imgur.com/td0htwb.png" }}
            logoSize={60}
            size={300}
            color="#0081c6"
          />
        )}
      </View>
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
};

export default GenerateScreen;

const styles = StyleSheet.create({
  bottom: {
    position: "absolute",
    width: "100%",
    height: 70,
    bottom: 0,
    backgroundColor: "#006093",
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
  bottomIcon: {
    marginHorizontal: 40,
  },
  scanCodeStyle: {
    flex: 1,
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "flex-start",
    backgroundColor: "#ffffff",
  },
  InputStyle: {
    width: 400,
    height: 50,
    marginVertical: 10,
    alignSelf: "center",
  },
  smallInput: {
    width: 195,
    height: 50,
    marginVertical: 10,
    marginRight: 5,
    alignSelf: "center",
  },
});
