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

const finderWidth = 280;
const finderHeight = 230;
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const viewMinX = (width - finderWidth) / 2;
const viewMinY = (height - finderHeight) / 2;

export default function BarCodeScanScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(BarCodeScanner.Constants.Type.back);
  const [scanned, setScanned] = useState(false);
  const [currentQRdata, setCurrentQRdata] = useState("");
  const [PINText, setPINText] = useState(" ");
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = (scanningResult) => {
    if (!scanned) {
      const { type, data, bounds: { origin } = {} } = scanningResult;
      const { x, y } = origin;
      if (
        x >= viewMinX &&
        y >= viewMinY &&
        x <= viewMinX + finderWidth / 2 &&
        y <= viewMinY + finderHeight / 2
      ) {
        setScanned(true);
        setCurrentQRdata(data);
        setPINText("");
        //alert(`Zeskanowano Qkartę użytkownika ${data}, kwota: 50 pln`);
      }
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        type={type}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        style={[StyleSheet.absoluteFillObject, styles.BarCodeScannerCamera]}
      >
        <BarcodeMask edgeColor="#62B1F6" showAnimatedLine />
      </BarCodeScanner>
      {scanned && (
        <PaperButton
          icon="qrcode"
          mode="contained"
          color="#006093"
          onPress={() => setScanned(false)}
          style={{ marginTop: 50, width: "70%", alignSelf: "center" }}
        >
          zeskanuj kod
        </PaperButton>
      )}
      {scanned && (
        <View
          style={{
            marginTop: 100,
            width: 420,
            height: "40%",
            alignSelf: "center",
            backgroundColor: "#ffffff",
            padding: 15,
          }}
        >
          <Title style={{ fontSize: 30, marginBottom: 5 }}>
            Zeskanowano kod QR użytkownika Jan Kowalski
          </Title>
          <Text style={{ fontSize: 15 }}>kwota: 50 pln</Text>
          <Text style={{ fontSize: 15 }}>dostepne saldo: 43 pln</Text>
          <Text style={{ fontSize: 15 }}>termin ważności: 23.12.2021</Text>
          <Text>{currentQRdata}</Text>
          <TextInput
            label="Wprowadź PIN"
            value={PINText}
            Type="outlined"
            numberOfLines={1}
            onChangeText={(PINText) => setPINText(PINText)}
            style={{
              width: 380,
              marginTop: 60,
              height: 60,
              marginVertical: 10,
              alignSelf: "center",
            }}
          />
          <PaperButton
            icon="check"
            mode="contained"
            color="#00a2f9"
            onPress={() => setScanned(false)}
            style={{
              marginTop: 5,
              marginRight: 5,
              marginVertical: 20,
              width: 60,
              alignSelf: "flex-end",
            }}
          >
            OK
          </PaperButton>
        </View>
      )}
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
  containerCamera: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    color: "#ffffff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
  },
  BarCodeScannerCamera: {
    flex: 1,
    marginTop: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    backgroundColor: "#ffffff",
  },
  logo: {
    marginTop: 200,
    width: 400,
    height: 400,
    resizeMode: "stretch",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
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
});
