import { StatusBar } from "expo-status-bar";

import { StyleSheet, View } from "react-native";
import PlayerData from "./components/PlayedData";


export default function App() {

  return (
    <View style={styles.container}>

      <StatusBar style="light" />
      <PlayerData />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
