import { StyleSheet, Text, View } from 'react-native';

import * as RNTextInputPaste from 'react-native-text-input-paste';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{RNTextInputPaste.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
