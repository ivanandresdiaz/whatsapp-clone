import React, { useEffect } from "react";
import { Avatar } from "@mui/material";
import styled from "styled-components";
import { useAuth } from "../Auth";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";

const Friend = (props) => {
  const {
    item: { photoURL, displayName, timestamp, id },
  } = props;
  const { currentUser } = useAuth();

  const createChat = async (id) => {
    const chatsRef = collection(db, "chats");
    const q = query(
      chatsRef,
      where("users", "array-contains", currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    const chatAlreadyExist = (friend_id) =>
      !!querySnapshot?.docs.find(
        (chat) =>
          chat.data().users.find((user) => user === friend_id)?.length > 0
      );
    console.log("create chat");
    if (!chatAlreadyExist(id)) {
      addDoc(chatsRef, { users: [currentUser.uid, id] });
    } else {
      console.log("Chat already exist");
    }
  };

  return (
    <Container onClick={() => createChat(id)}>
      <FriendAvatar src={photoURL} />
      <ChatContainer>
        <div style={{ gridArea: "name" }}>{displayName}</div>
        <div style={{ gridArea: "lastest_message" }}>Hola que mas</div>
        <div style={{ gridArea: "time", fontSize: "12px" }}>{timestamp}</div>
      </ChatContainer>
    </Container>
  );
};

export default Friend;

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  min-height: 67px;
  padding-left: 15px;
  work-break: break-word;

  :hover {
    background-color: #f5f5f5;
  }
`;

const FriendAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
const ChatContainer = styled.div`
  display: grid;
  padding: 10px;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  border-bottom: 1px solid #ededed;
  gap: 10px;

  grid-template-areas: "name name time" "lastest_message latest_message latest_message";
`;
