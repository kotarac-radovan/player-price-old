import React, { useEffect, useState } from "react";
import { View, FlatList, Text, StatusBar, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PlayerItem from "./components/PlayerItem";

const App = () => {
  const [playerData, setPlayerData] = useState([]);
  const [error, setError] = useState(null);
  const [costDifference, setCostDifference] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://fantasy.premierleague.com/api/bootstrap-static/"
      );
      const data = response.data.elements; // assuming 'elements' is the array of players in the API response
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
                    setCostDifference(difference); // Set the costDifference here
                    console.log(
                      `Cost difference for ${matchedPlayer.web_name}: ${difference}`
                    );
                  } else {
                    console.log(
                      `Invalid cost value for player with ID ${matchedPlayer.id}`
                    );
                  }
                } else {
                  console.log(
                    `Matched player not found for stored player with ID ${storedPlayer.id}`
                  );
                }
              });
            } else {
              console.log("Fetched data is empty.");
            }
          } else {
            console.log("Parsed data is empty.");
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

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <FlatList
        data={playerData}
        renderItem={renderPlayerItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
