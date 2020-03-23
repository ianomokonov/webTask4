import React from "react";
import InputForm from "./InputForm";
import Messages from "./Messages";
import { Link } from "react-router-dom";

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.items = [
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
        author: "vanikakoma",
        text: "Привет",
        isMy: true
      }
    ];
    this.state = { items: this.items };
    this.onAddMessage = this.onAddMessage.bind(this);
  }

  onAddMessage(text) {
    const newItem = {
      id: this.state.items.length + 1, 
      author: "vanikakoma",
      text: text,
      isMy: true
    };
    this.setState(state => ({
      items: state.items.concat(newItem)
    }));
  }

  render() {
    return (
      <div className="container d-flex flex-column h-100">
        <div>
          <div className="btn btn-link pl-0">
            <Link to="/">Выйти</Link>
          </div>
        </div>

        <Messages className="messages" items={this.state.items} />
        <InputForm className="input-panel" onAdd={this.onAddMessage} />
      </div>
    );
  }
}

export default ChatRoom;
