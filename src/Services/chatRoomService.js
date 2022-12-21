import { API, graphqlOperation, Auth } from "aws-amplify";

export const getCommonChatRoomWithUser = async (userID) => {
  const authUser = await Auth.currentAuthenticatedUser();

  // get all chat room of user1
  const response = await API.graphql(
    graphqlOperation(listChatRooms, { id: authUser.attributes.sub })
  );

  const chatRooms = response.data?.getUser?.chatrooms?.items || [];

  console.log(chatRooms[0].chatRoom.Users.items[0]);
  const chatRoom = chatRooms.find((chatRoomItem) => {
    return chatRoomItem.chatRoom.Users.items.some(
      (userItem) => userItem.user.id === userID
    );
  });

  return chatRoom;

  // get all chat rooms of user 2
  // remove chat rooms with more than 2 users
  // get the common chat rooms
};

export const listChatRooms = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      chatrooms {
        items {
          chatRoom {
            id
            Users {
              items {
                user {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`;
