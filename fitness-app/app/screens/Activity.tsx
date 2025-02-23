import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Activity = () => {
  return (
    <View style={styles.container}>
      <Text>Activity</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e', // Dark grey/light black
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Activity;

