import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const ContactListItem = ({ user }) => {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => {}} style={styles.container}>
      <Image style={styles.image} source={{ uri: user.image }} />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {user.name}
        </Text>
        <Text numberOfLines={2} style={styles.subTitle}>
          {user.status}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    height: 70,
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  name: {
    fontWeight: "bold",
  },
  content: {},
  subTitle: {
    color: "gray",
  },
});
export default ContactListItem;