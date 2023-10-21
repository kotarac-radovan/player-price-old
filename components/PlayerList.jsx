import { View,FlatList, StyleSheet} from 'react-native'
import React from 'react'
import PlayerItem from './PlayerItem'

export default function PlayerList({ playerCosts }) {
  return (
    <View>
      <FlatList data={playerCosts} renderItem={({ item }) => <PlayerItem player={item} />}
      />
    </View>
  )
}
const styles = StyleSheet.create({});