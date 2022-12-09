import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Navigator from "./src/navigation/index";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react-native";
import awsconfig from "./src/aws-exports";

// Amplify.configure(awsconfig);
Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

const App = () => {
  return (
    <View style={styles.container}>
      {/* <ChatScreen /> */}
      <Navigator />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "yellow",
    justifyContent: "center",
  },
});

export default withAuthenticator(App);
