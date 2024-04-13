import { useState, useRef, useEffect } from "react";
import classes from "./LiveChat.module.css";
import Messenger from "./LiveChatIcon/Messenger";
import ChatBox from "./ChatBox";
import ManIcon from "./LiveChatIcon/ManIcon";
import IconFace from "./LiveChatIcon/IconFace";
import IconPaperClip from "./LiveChatIcon/IconPaperClip";
import IconPaperPlane from "./LiveChatIcon/IconPaperPlane";

function LiveChat() {
  const [chatList, setChatList] = useState([]);
  const [openChat, setOpenChat] = useState(false);
  const ref = useRef();
  const chatBoxRef = useRef(null);

  const toggleHanler = () => {
    setOpenChat((prevState) => !prevState);
  };

  const submidHanler = (e) => {
    e.preventDefault();
    const message = ref.current.value;

    // validate
    if (message.trim().length === 0) {
      return;
    } else {
      const dataChat = {
        type: "user",
        message: message.trim(),
      };
      setChatList((prevState) => [...prevState, dataChat]);
      ref.current.value = "";

      // tự động phản hồi
      setTimeout(() => {
        const dataChat = {
          type: "admin",
          message: "ADMIN: Chào bạn, nhân viên sẽ phản hồi bạn sau ít phút!",
        };
        setChatList((prevState) => [...prevState, dataChat]);
      }, 1500);
    }
  };

  // Tự động cuộn chat box khi có tin nhắn mới
  useEffect(() => {
    if (openChat) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [openChat, chatList]);

  return (
    <div className={classes.liveChat}>
      {openChat && (
        <div className={classes.chatContainer}>
          <p className={classes.title}>
            Customer Support<span>Let's Chat App</span>{" "}
          </p>

          <div className={classes.messageList} ref={chatBoxRef}>
            <ChatBox data={chatList} />
          </div>
          <form className={classes.form} onSubmit={submidHanler}>
            <ManIcon />
            <input
              type="text"
              name="message"
              placeholder="Enter Message!"
              defaultValue=""
              ref={ref}
            />
            <div className={classes.icon}>
              <IconPaperClip />
              <IconFace />
              <button className={classes.button}>
                <IconPaperPlane />
              </button>
            </div>
          </form>
        </div>
      )}
      <div className={classes.iconContainer} onClick={toggleHanler}>
        <Messenger className={classes.iconMessenger} />
      </div>
    </div>
  );
}

export default LiveChat;
