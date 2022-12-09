import { useEffect } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Message from "../components/Message";
import bg from "../../assets/images/BG.png";
import messages from "../../assets/data/messages.json";
import InputBox from "../components/InputBox";

const ChatScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ title: route.params.name });
  }, [route.params.name]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 90}
      style={styles.bg}>
      <View style={styles.bg}>
        <FlatList
          data={messages}
          renderItem={({ item }) => <Message message={item} />}
          style={styles.list}
          inverted
        />
        <InputBox />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: "#f8f8f9",
  },
  list: {
    padding: 10,
  },
});

export default ChatScreen;
