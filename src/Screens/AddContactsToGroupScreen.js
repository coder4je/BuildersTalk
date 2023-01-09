import React, { useState, useEffect } from "react";
import { FlatList, View, TextInput, StyleSheet, Button } from "react-native";
import ContactListItem from "../components/ContactListItem";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { listUsers } from "../graphql/queries";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createChatRoom, createChatRoomUser } from "../graphql/mutations";

const AddContactsToGroupScreen = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();
  const chatRoom = route.params.chatRoom;

  useEffect(() => {
    API.graphql(graphqlOperation(listUsers)).then((result) => {
      console.log(
        "result, ",
        JSON.stringify(result.data?.listUsers?.items, null, 2)
      );
      setUsers(
        result.data?.listUsers?.items.filter(
          (item) =>
            !chatRoom.Users.items.some(
              (chatRoomUser) =>
                !chatRoomUser._deleted && item.id === chatRoomUser.userId
            )
        )
      );
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Add to group"
          disabled={selectedUserIds.length < 1}
          onPress={onAddToGroupPress}
        />
      ),
    });
  }, [selectedUserIds]);

  const onAddToGroupPress = async () => {
    // add the selected users to the chatroom

    await Promise.all(
      selectedUserIds.map((userId) =>
        API.graphql(
          graphqlOperation(createChatRoomUser, {
            input: { chatRoomId: chatRoom.id, userId },
          })
        )
      )
    );

    setSelectedUserIds([]);

    // navigate to the newly created Chatroom
    navigation.goBack();
  };

  const onContactPress = (id) => {
    setSelectedUserIds((userIds) => {
      if (userIds.includes(id)) {
        // remove id from selected
        return [...userIds].filter((uid) => uid !== id);
      } else {
        return [...userIds, id];
      }
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <ContactListItem
            user={item}
            selectable
            onPress={() => onContactPress(item.id)}
            isSelected={selectedUserIds.includes(item.id)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "white" },
  input: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "lightgray",
    padding: 10,
    margin: 10,
  },
});

export default AddContactsToGroupScreen;
