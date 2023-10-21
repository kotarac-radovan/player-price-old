import { View, Text, StyleSheet } from "react-native";

export default function PlayerItem({ player }) {
  return (
    <View style={styles.container}>
      <Text style={styles.playerName}>{player.name}</Text>
      <Text style={styles.playerName}>${player.cost}</Text>
      <Text style={styles.playerName}>${player.previousCost}</Text>
      <Text style={styles.playerCost}>${player.costDifference}m</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 8,
    margin: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgb(50,50,50)",
    borderRadius: 12,
  },
  playerName: {
    fontSize: 18,
    padding: 8,
    color: "white",
  },
  playerCost: {
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
  },
});
