import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Avatar, IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import { ArrowForwardIos } from "@mui/icons-material";
import {
  collection,
  getDocs,
  where,
  query,
  onSnapshot,
} from "firebase/firestore";
import VerticalMenu from "./VerticalMenu";
import Chat from "./Chat";
import { db } from "../firebase";
import Friend from "./Friend";
import { useAuth } from "../Auth";

const Sidebar = () => {
  const [friends, setFriends] = useState([]);
  const inputAreaRef = React.useRef(null);
  const { currentUser } = useAuth();
  const [searchFriends, setSearchFriends] = useState(false);
  const [chats, setChats] = React.useState([]);
  useEffect(() => {
    const chatsRef = collection(db, "chats");
    const q = query(
      chatsRef,
      where("users", "array-contains", currentUser.uid)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setChats(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
    return unsubscribe;
  }, []);
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const userRef = collection(db, "users");
        const q = query(userRef, where("email", "!=", currentUser?.email));
        const querySnapshot = await getDocs(q);
        console.log("Querysnapshot", querySnapshot);
        setFriends(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchFriends();
  }, [currentUser]);
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!inputAreaRef.current.contains(e.target)) {
        setTimeout(() => {
          setSearchFriends(false);
        }, 3000);
      } else {
        setSearchFriends(true);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, []);
  console.log("friends", friends);
  console.log("currentUser", currentUser);
  return (
    <Container>
      <Header>
        <UserAvatar src={currentUser.photoURL} />
        <Iconsgroup>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <svg
              version="1.1"
              id="df9d3429-f0ef-48b5-b5eb-f9d27b2deba6"
              x="0"
              y="0"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className=""
            >
              <path
                fill="currentColor"
                d="M12.072 1.761a10.05 10.05 0 0 0-9.303 5.65.977.977 0 0 0 1.756.855 8.098 8.098 0 0 1 7.496-4.553.977.977 0 1 0 .051-1.952zM1.926 13.64a10.052 10.052 0 0 0 7.461 7.925.977.977 0 0 0 .471-1.895 8.097 8.097 0 0 1-6.012-6.386.977.977 0 0 0-1.92.356zm13.729 7.454a10.053 10.053 0 0 0 6.201-8.946.976.976 0 1 0-1.951-.081v.014a8.097 8.097 0 0 1-4.997 7.209.977.977 0 0 0 .727 1.813l.02-.009z"
              ></path>
              <path
                fill="#009588"
                d="M19 1.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"
              ></path>
            </svg>
          </IconButton>
          <VerticalMenu />
        </Iconsgroup>
      </Header>
      <Notification>
        <NotificationAvatar>
          <NotificationsOffIcon style={{ color: "#9De1fe" }} />
        </NotificationAvatar>
        <NotificationText>
          <NotificationText>
            <div>Get Notified of New Messages</div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <a href="#">
                <u>Turn on desktop notifications</u>
              </a>
              <IconButton>
                <ArrowForwardIos style={{ width: 15, height: 15 }} />
              </IconButton>
            </div>
          </NotificationText>
        </NotificationText>
      </Notification>
      <SearchChat>
        <SearchBar>
          <SearchIcon />
          <SearchInput ref={inputAreaRef} placeholder="Search a new chat" />
        </SearchBar>
      </SearchChat>

      {searchFriends ? (
        <>
          {friends.map((item, index) => (
            <Friend key={item.id} item={item} />
          ))}
        </>
      ) : (
        <>
          {chats.map((item, index) => (
            <Chat key={index} item={item} />
          ))}
        </>
      )}
    </Container>
  );
};

export default Sidebar;

const Container = styled.div`
  background-color: #ffffff;
  min-width: 320px;
  max-width: 450px;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
  width: 100%;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const SearchChat = styled.div`
  background-color: #f6f6f6;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const Iconsgroup = styled.div``;

const SearchBar = styled.div`
  display: flex;
  padding: 5px;
  border-radius: 10px;
  border-bottom: 1px solid #ededed;
  background: white;
`;

const SearchInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
`;

const Notification = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  background-color: #9de1fe;
`;

const NotificationAvatar = styled(Avatar)`
  background-color: white;
`;

const NotificationText = styled.div`
  display: flex;
  flex-direction: column;
`;
