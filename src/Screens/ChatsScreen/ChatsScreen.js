import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import ChatListItem from "../../components/ChatListItem";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { listChatRooms } from "./queries";

const ChatsScreen = () => {
  const [chatRoom, setChatRooms] = useState([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const authUser = await Auth.currentAuthenticatedUser();

      const response = await API.graphql(
        graphqlOperation(listChatRooms, { id: authUser.attributes.sub })
      );

      setChatRooms(response.data.getUser.chatrooms.items);
    };

    fetchChatRooms();
  }, []);

  return (
    <FlatList
      data={chatRoom}
      renderItem={({ item }) => (
        <ChatListItem
          chat={item.chatRoom}
          style={{ backgroundColor: "black" }}
        />
      )}
    />
  );
};

export default ChatsScreen;
