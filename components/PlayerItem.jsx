import { View, Text, StyleSheet } from "react-native";

export default function PlayerItem({ name, costDifference }) {
  let costColor = "red";
  let arrowSymbol = "v";

  if (costDifference > 0) {
    costColor = "green";
    arrowSymbol = "^";
  }

  return (
    <View style={styles.container}>
      <Text style={styles.playerName}>{name}</Text>
      <Text style={[styles.playerCost, { color: costColor }]}>
        ${Math.abs(costDifference)}m {arrowSymbol}
      </Text>
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
    fontSize: 20,
    fontWeight: "bold",
  },
});
