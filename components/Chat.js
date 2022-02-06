import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import moment from "moment";
import styled from "styled-components";
import { useRouter } from "next/router";
import getFriendData from "../utils/getFriendData";

const Chat = (props) => {
  const router = useRouter();

  console.log("Chat props", props);
  const {
    item: { id, users, timestamp = "", lastestMessage = "" },
  } = props;
  const enterChat = () => {
    router.push("/chat/" + id);
  };
  const [friend, setFriend] = useState({});
  useEffect(() => {
    if (users.length > 0) {
      getFriendData(users).then((data) => {
        setFriend(data);
      });
    }
  }, []);
  return (
    <Container onClick={() => enterChat(friend.id)}>
      <FriendAvatar src={friend.photoURL} />
      <ChatContainer>
        <div style={{ gridArea: "name" }}>{friend.displayName}</div>
        <div style={{ gridArea: "lastest_message" }}>{lastestMessage}</div>
        <div style={{ gridArea: "time", fontSize: "12px" }}>
          {timestamp ? moment(timestamp.toDate() * 1000).format("LT") : ""}
        </div>
      </ChatContainer>
    </Container>
  );
};

export default Chat;

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
