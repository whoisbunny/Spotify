import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View, Text } from 'react-native';


export default function PersonScreen() {
  return (
    <View style={styles.titleContainer}>
      <Text> Hello Explore</Text>
    </View>
  );
}

const styles = StyleSheet.create({

  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
