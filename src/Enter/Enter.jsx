import React from "react";
import { withRouter, Link } from "react-router-dom";
import ChatService from "../chat.service";

class Enter extends React.Component {
  constructor(props) {
    super(props);
    this.onCreateClick = this.onCreateClick.bind(this);
    this.onOnEnterByIdClick = this.onOnEnterByIdClick.bind(this);
    this.onEnterClick = this.onEnterClick.bind(this);
    this.onExitClick = this.onExitClick.bind(this);
    this.onChooseChatClick = this.onChooseChatClick.bind(this);
    this.service = new ChatService();
    this.state = { user: null };
  }

  onCreateClick() {
    const name = document.querySelector("#chat-name").value;
    if (!name) {
      alert("Введите название чата!");
      return;
    }

    this.service
      .createChat({ name: name, userId: this.state.user.id })
      .then(chatId => {
        this.props.history.push(`/chat-room/${chatId}`);
      });
  }

  onChooseChatClick(id){
    this.props.history.push(`/chat-room/${id}`);
  }

  onOnEnterByIdClick() {
    const id = document.querySelector("#chat-id").value;
    if (!id) {
      alert("Введите id чата!");
      return;
    }

    this.props.history.push(`/chat-room/${id}`);
  }

  onEnterClick(){
    this.componentDidMount();
  }

  onExitClick(){
    sessionStorage.removeItem('user');
    this.setState(state => ({
      user: null
    }))
  }

  componentDidMount() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    if(!user){
      user = {login: prompt("Введите логин")};
    }
    this.service.signIn(user.login).then(user => {
      sessionStorage.setItem("user", JSON.stringify(user));
      this.setState(state => ({
        user: user
      }));
    });
  }

  render() {
    return (
      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
        <div className="w-50">
          <div className="py-3">
            <small className="text-muted">{this.state?.user?.login}</small>
            {this.state?.user ? <i className="far fa-times-circle ml-3" title="Сменить пользователя" onClick={this.onExitClick}></i> : <button className="btn btn-link pl-0" onClick={this.onEnterClick}>Войти</button> }
          </div>
          <div className="card">
            <h5 className="card-header">Создание чата</h5>
            <div className="card-body">
              <input
                id="chat-name"
                className="form-control"
                type="text"
                placeholder="Введите название"
              />
              <button
                className="btn btn-primary mt-2"
                onClick={this.onCreateClick}
              >
                Создать
              </button>
            </div>
          </div>
          <div className="card mt-3">
            <h5 className="card-header">Вход по id чата</h5>
            <div className="card-body">
              <input
                id="chat-id"
                className="form-control"
                type="text"
                placeholder="Введите id"
              />
              <button
                className="btn btn-primary mt-2"
                onClick={this.onOnEnterByIdClick}
              >
                Войти
              </button>
            </div>
          </div>
          <div className="card mt-3">
            <h5 className="card-header">Активные чаты:</h5>
            <div className="card-body">
              <div className="list-group">
                {this.state.user?.chats.map(chat=>{
                  return <div className="list-group-item chatList d-flex justify-content-around" key={chat.id} onClick={(()=>this.onChooseChatClick(chat.id))}>
                    <div className="d-flex">Номер чата: {chat.id}</div>
                    <div className="d-flex">Название чата: {chat.login}</div>
                  </div>
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Enter;
