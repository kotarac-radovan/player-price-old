import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import PlayerList from "./components/PlayerList";

export default function App() {
  const [playerCosts, setPlayerCosts] = useState([]);

  const fetchPlayerCosts = async () => {
    const response = await fetch(
      "https://fantasy.premierleague.com/api/bootstrap-static"
    );
    const data = await response.json();

    const playerCosts = data.elements.map((player) => ({
      id: player.id,
      name: player.first_name + " " + player.second_name,
      cost: player.now_cost,
      previousCost: player.cost_change_start,
      costDifference: player.now_cost - player.cost_change_start,
      photo: player.photo,
    }));

    setPlayerCosts(playerCosts);
  };

  useEffect(() => {
    fetchPlayerCosts();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <PlayerList playerCosts={playerCosts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(20,20,20)",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "rgb(220,220,220)",
  },
});
