import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import PlayerList from "./components/PlayerList";

export default function App() {
  const [playerCosts, setPlayerCosts] = useState([]);
  const costDifference = playerCosts.cost;

  const fetchPlayerCosts = async () => {
    const response = await fetch(
      "https://fantasy.premierleague.com/api/bootstrap-static"
    );
    const data = await response.json();

    const playerCosts = data.elements.map((player) => ({
      id: player.id,
      name: player.first_name + " " + player.second_name,
      cost: player.now_cost,
    }));

    setPlayerCosts(playerCosts);
  };

  useEffect(() => {
    fetchPlayerCosts();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <PlayerList
        playerCosts={playerCosts.filter(
          (player) => player.costDifference !== 0
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
