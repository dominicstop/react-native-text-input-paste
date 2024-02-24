import { StyleSheet, Text, View } from 'react-native';

import { TextInputWrapperView } from 'react-native-text-input-paste';

export default function App() {
  return (
    <View style={styles.container}>
      <TextInputWrapperView/>
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
