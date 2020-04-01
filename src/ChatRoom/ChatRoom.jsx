import React from "react";
import InputForm from "./InputForm";
import Messages from "./Messages";
import { Link } from "react-router-dom";
import ChatService from "../chat.service";

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.service = new ChatService();
    const items = [
      {
        id: 1,
        author: "vanikakoma",
        text: "Привет",
        isMy: true
      },
      {
        id: 2,
        author: "vanikakoma",
        text: "Привет",
        isMy: true
      },
      {
        id: 3,
        author: "seregakoma",
        text: "Привет",
        isMy: false
      },
      {
        id: 4,
        author: "seregakoma",
        text: "Привет",
        isMy: false
      },
      {
        id: 5,
        use: "vanikakoma",
        message: "Привет",
        isMy: true
      }
    ];
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      this.props.history.push("/");
    }
    this.state = {
      items: this.items,
      user: user,
      chatId: this.props.match.params.id
    };
    this.onAddMessage = this.onAddMessage.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  onAddMessage(text) {
    const newItem = {
      userId: this.state.user.id,
      chatId: this.state.chatId,
      message: text
    };
    this.service.sendMessage(newItem).then(message => {
      message.isMy = message.userId == this.state.user.id;
      this.setState(state => ({
        items: state.items.concat(message)
      }));
    });
  }

  componentDidMount() {
    this.service.getChat(this.state.chatId).then(chat => {
      this.setState(state => ({
        items: chat.messages.map(m => {
          m.isMy = m.userId == this.state.user.id;
          return m;
        })
      }));
    });
  }

  render() {
    return (
      <div className="container d-flex flex-column h-100">
        <div className="d-flex">
          <div className="btn btn-link pl-0">
            <Link to="/">Выйти</Link>
          </div>
          <div className="d-flex justify-content-center align-items-center w-100">Номер чата: {this.state.chatId}</div>
        </div>
        <Messages className="messages" items={this.state.items} />
        <InputForm className="input-panel" onAdd={this.onAddMessage} onSync={this.componentDidMount}/>
      </div>
    );
  }
}

export default ChatRoom;
