import React, { useEffect, useState } from "react";
import { View, FlatList, Text, StatusBar, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PlayerItem from "./components/PlayerItem";

const App = () => {
  const [playerData, setPlayerData] = useState([]);
  const [error, setError] = useState(null);
  const [costDifference, setCostDifference] = useState(0);
  const [isZero, setIsZero] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://fantasy.premierleague.com/api/bootstrap-static/"
      );
      const data = response.data.elements;
      await AsyncStorage.setItem("playerData", JSON.stringify(data)); // storing the data on the device
      setPlayerData(data);
    } catch (error) {
      setError("Error fetching data. Please check your internet connection.");
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("playerData");
        if (storedData !== null) {
          const parsedData = JSON.parse(storedData);
          setPlayerData(parsedData);
          if (parsedData.length > 0) {
            const response = await axios.get(
              "https://fantasy.premierleague.com/api/bootstrap-static/"
            );
            const fetchedData = response.data.elements;
            if (fetchedData.length > 0) {
              parsedData.forEach((storedPlayer) => {
                const matchedPlayer = fetchedData.find(
                  (player) => player.id === storedPlayer.id
                );
                if (matchedPlayer) {
                  const storedCost = parseFloat(storedPlayer.now_cost);
                  const nowCost = parseFloat(matchedPlayer.now_cost);
                  if (!isNaN(storedCost) && !isNaN(nowCost)) {
                    const difference = nowCost - storedCost;
                    if (difference == 0) {
                      setIsZero(true);
                      return;
                    } else {
                      setIsZero(false);
                      setCostDifference(difference);
                    }
                  }
                }
              });
            }
          }
        }
        fetchData();
      } catch (error) {
        console.error("Error retrieving data from storage:", error);
        setError("Error retrieving data from storage.");
      }
    };
    getData();
  }, []);

  const renderPlayerItem = ({ item }) => {
    return (
      <PlayerItem
        name={item.first_name + "" + item.last_name}
        costDifference={costDifference}
      />
    );
  };

  if (error) {
    return <Text>{error}</Text>;
  }

  if (isZero) {
    return (
      <View style={[styles.container, styles.textContainer]}>
        <Text style={styles.text}>No Cost Difference</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <FlatList
          data={filteredData}
          renderItem={renderPlayerItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    );
  }
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  text: {
    color: "white",
    fontSize: 22,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
