import React, { useEffect, useState } from "react";
import { View, FlatList, AsyncStorage, Text, StatusBar } from "react-native";
import axios from "axios";
import PlayerItem from "./PlayerItem";

const App = () => {
  const [playerData, setPlayerData] = useState([]);
  const [error, setError] = useState(null);

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
          parsedData.forEach((storedPlayer) => {
            const matchedPlayer = data.find(
              (player) => player.id === storedPlayer.id
            );
            if (matchedPlayer) {
              const costDifference = matchedPlayer.now_cost - storedPlayer.cost;
              console.log(
                `Cost difference for ${matchedPlayer.name}: ${costDifference}`
              );
            }
          });
        }
        fetchData();
      } catch (error) {
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
  