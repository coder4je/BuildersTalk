import { StyleSheet, View, Text, Image } from "react-native";

const ChatList = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../../assets/data/profileImages/profile1.jpg")}
      />
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>
            Misha
          </Text>
          <Text style={styles.subTitle}>07:30</Text>
        </View>

        <Text>Hello</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // marginHorizontal: 10,
    marginVertical: 5,
    height: 70,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  content: {
    flex: 1,

    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "lightgray",
  },
  row: {
    flexDirection: "row",
  },
  name: {
    flex: 1,
    fontWeight: "bold",
  },
  subTitle: {
    color: "gray",
  },
});
export default ChatList;
