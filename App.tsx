import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ChatList from "./src/components/ChatList";

export default function App() {
  return (
    <View style={styles.container}>
      <ChatList />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
