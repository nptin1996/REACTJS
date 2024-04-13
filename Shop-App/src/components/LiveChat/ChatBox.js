import ManIcon from "./LiveChatIcon/ManIcon";
import classes from "./ChatBox.module.css";

function ChatBox(props) {
  const data = props.data;

  const listChat = data.map((ele, i) => (
    <li
      className={ele.type === "user" ? classes.user : classes.admin}
      key={i}
      id={i}
    >
      {ele.type === "admin" ? (
        <div>
          <ManIcon /> <p>{ele.message}</p>
        </div>
      ) : (
        <p>{ele.message}</p>
      )}
    </li>
  ));

  return <ul className={classes.chatBox}>{listChat}</ul>;
}

export default ChatBox;
