import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
} from "react-native";
import axios from "axios";
import PlayerItem from "./components/PlayerItem";

const App = () => {
  const [playerData, setPlayerData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [isDataAvailable, setIsDataAvailable] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://fantasy.premierleague.com/api/bootstrap-static/"
        );
        const data = response.data.elements;
        setPlayerData(data);
        setFilteredData(data);
        setIsDataAvailable(true);
      } catch (error) {
        console.error("Error retrieving data:", error);
        setError("Error retrieving data from the server.");
      }
    };
    fetchData();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredPlayers = playerData.filter(
      (item) =>
        (item.first_name + " " + item.second_name)
          .toLowerCase()
          .includes(text.toLowerCase()) &&
        parseFloat(item.now_cost) - parseFloat(item.now_cost) !== 0
    );
    setFilteredData(filteredPlayers);
  };

  const renderPlayerItem = ({ item }) => {
    if (!item || !item.now_cost) {
      return null;
    }

    const storedCost = parseFloat(item.now_cost);
    const nowCost = parseFloat(item.now_cost);
    const difference = nowCost - storedCost;

    if (difference === 0) {
      return null;
    } else {
      return {
        ...item,
        difference: difference,
      };
    }
  };

  const sortedData = filteredData
    .map(renderPlayerItem)
    .filter((item) => item)
    .sort((a, b) => {
      if (a.difference > 0 && b.difference > 0) {
        return b.difference - a.difference;
      } else if (a.difference < 0 && b.difference < 0) {
        return a.difference - b.difference;
      } else {
        return b.difference - a.difference;
      }
    });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <TextInput
        style={styles.searchBar}
        placeholder="Search player"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      {isDataAvailable && sortedData.length > 0 ? (
        <FlatList
          data={sortedData}
          renderItem={({ item }) => (
            <PlayerItem
              name={`${item.first_name} ${item.second_name}`}
              costDifference={item.difference}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <View style={styles.centeredView}>
          <Text style={styles.text}>No players to display</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  searchBar: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "black",
    backgroundColor: "white",
    borderRadius: 18,
  },
  text: {
    color: "white",
    fontSize: 18,
    marginBottom: 100,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
