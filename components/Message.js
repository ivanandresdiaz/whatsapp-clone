import React from "react";
import styled from "styled-components";
import { useAuth } from "../Auth";

const Message = (props) => {
  const { currentUser } = useAuth();
  const loginMail = currentUser.email;
  const { item, index } = props;
  const { user, message, timestamp } = item;
  if (user !== loginMail) {
    return (
      <Container>
        <FriendMessage>{message}</FriendMessage>
      </Container>
    );
  }
  return (
    <Container>
      <MyMessage>{message}</MyMessage>
    </Container>
  );
};

export default Message;

const Container = styled.div`
  display: flex;
`;

const MessageBubble = styled.div`
  padding: 15px;
  padding-bottom: 26px;
  text-align: right;
  background-color: white;
  margin-bottom: 10px;
  position: relative;
`;

const MyMessage = styled(MessageBubble)`
  margin-left: auto;
  background-color: #dcf8c6;
  border-radius: 9px 0px 8px 8px;
`;

const FriendMessage = styled(MessageBubble)`
  background-color: white;
  text-align: left;
  border-radius: 0px 8px 8px 8px;
`;

const MessageTail = styled.span`
  margin-top: -4px;
`;
