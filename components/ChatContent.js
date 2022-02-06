import { Avatar, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MicIcon from "@mui/icons-material/Mic";
import Message from "./Message";
import getFriendData from "../utils/getFriendData";
import {
  serverTimestamp,
  setDoc,
  addDoc,
  collection,
  doc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useAuth } from "../Auth";
import { db } from "../firebase";
import moment from "moment";

// const messages = [
//   {
//     id: "12312",
//     message: "Hola Ema",
//     user: "emma@gmail.com",
//     photoURL:
//       "https://scontent.feoh2-1.fna.fbcdn.net/v/t1.6435-1/p320x320/57774912_2466195173658006_2102312239997386752_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=7206a8&_nc_ohc=ejqNt1ptfj4AX8s_okn&_nc_ht=scontent.feoh2-1.fna&oh=00_AT_ISd-sVnGl2QD_O69C8q27_F8vav_DmbnaaBx-R4xUVw&oe=62238E5C",
//     timestamp: new Date(),
//   },
//   {
//     id: "12312",
//     message: "Hola Ema",
//     user: "emma@gmail.com",
//     photoURL:
//       "https://scontent.feoh2-1.fna.fbcdn.net/v/t1.6435-1/p320x320/57774912_2466195173658006_2102312239997386752_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=7206a8&_nc_ohc=ejqNt1ptfj4AX8s_okn&_nc_ht=scontent.feoh2-1.fna&oh=00_AT_ISd-sVnGl2QD_O69C8q27_F8vav_DmbnaaBx-R4xUVw&oe=62238E5C",
//     timestamp: new Date(),
//   },
// ];

const ChatContent = ({ chat, messagesProps, chat_id }) => {
  const [friend, setFriend] = useState({});
  const [input, setInput] = useState(" ");
  const [messages, setMessages] = useState([]);
  const { currentUser } = useAuth();
  const chatParse = JSON.parse(chat);
  useEffect(() => {
    setMessages(JSON.parse(messagesProps));
  }, []);
  useEffect(() => {
    const messageRef = collection(db, "chats", chat_id, "messages");
    const q = query(messageRef, orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          timestamp: doc.data().timestamp?.toDate().getTime(),
        }))
      );
    });
    return unsubscribe;
  }, [chat_id]);

  useEffect(() => {
    if (chatParse.users?.length > 0) {
      getFriendData(chatParse.users).then((data) => setFriend(data));
    } else {
      console.log("no chatParse");
    }
  }, [chat_id]);
  const sendMessage = async (e) => {
    e.preventDefault();
    // updata active user
    const usersRef = doc(db, "users", currentUser.uid);
    setDoc(usersRef, { lastSeen: serverTimestamp() }, { merge: true });
    // send the message
    const messagesRef = await collection(db, "chats", chat_id, "messages");
    await addDoc(messagesRef, {
      lastSeen: serverTimestamp(),
      timestamp: serverTimestamp(),
      message: input,
      user: currentUser.email,
      photoURL: currentUser.photoURL,
    });
    //add the lastes message.
    const chatRef = doc(db, "chats", chat_id);
    setDoc(
      chatRef,
      {
        lastestMessage: input,
        timestamp: serverTimestamp(),
      },
      { merge: true }
    );
    setInput("");
  };
  return (
    <Container>
      <Header>
        <Avatar src={friend.photoURL} />
        <HeaderInfo>
          <h3>{friend.displayName}</h3>
          <div>
            Last conection {moment(friend.lastSeen?.toDate()).fromNow()}
          </div>
        </HeaderInfo>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </Header>
      <MessagesContainer>
        {messages.map((item, index) => (
          <Message key={index} item={item} index={index} />
        ))}
      </MessagesContainer>
      <InputContainer>
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>
        <IconButton>
          <AttachFileIcon />
        </IconButton>
        <Input
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
          value={input}
        />
        <button hidden disabled={!input} type="submit" onClick={sendMessage}>
          Send message
        </button>
        <IconButton>
          <MicIcon />
        </IconButton>
      </InputContainer>
    </Container>
  );
};

export default ChatContent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;

const HeaderInfo = styled.div`
  margin-left: 15px;
  flex: 1;
  align-items: center;
  > h3 {
    margin-bottom: 3px;
  }
  > div {
    font-size: 14px;
    color: gray;
  }
`;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: #f0f0f0;
  z-index: 100;
`;

const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 30px;
  padding: 20px;
  margin-left: 15px;
  margin-right: 15px;
`;

const MessagesContainer = styled.div`
  padding: 20px;
  background-color: #e5d3d8;
  flex: 1;
`;
