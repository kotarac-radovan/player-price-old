import { View, FlatList, StyleSheet } from "react-native";
import PlayerItem from "./PlayerItem";

export default function PlayerList({ playerCosts }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={playerCosts}
        renderItem={({ item }) => <PlayerItem player={item} />}
        style={styles.list}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: "stretch",
  },
  list: {
    flex: 1,
  },
});
