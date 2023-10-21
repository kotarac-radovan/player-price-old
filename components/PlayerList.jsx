import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import PlayerItem from "./PlayerItem";

export default function PlayerList({ players }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={players}
        renderItem={({ item, index }) => <PlayerItem item={item} />} // Pass item instead of players
        style={styles.list}
        keyExtractor={(item, index) => index.toString()} // Use index as the key
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
