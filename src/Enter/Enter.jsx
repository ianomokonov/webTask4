import React from "react";
import { withRouter } from "react-router-dom";
import ChatService from "../chat.service";

class Enter extends React.Component {
  constructor(props) {
    super(props);
    this.onCreateClick = this.onCreateClick.bind(this);
    this.service = new ChatService();
    sessionStorage.removeItem("user");
    this.state = { user:  null};

    
  }

  onCreateClick() {
    const name = document.querySelector('#chat-name').value;
    if(!name){
      alert('Введите название чата!');
      return;
    }

    this.service.createChat({name: name, userId: this.state.user.id}).then(chatId => {
      this.props.history.push(`/chat-room/${chatId}`);
    })
  }

  componentDidMount(){
    this.service.signIn(prompt("Введите логин")).then(user => {
      sessionStorage.setItem('user', JSON.stringify(user));
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
                className="form-control"
                type="text"
                placeholder="Введите id"
              />
              <button className="btn btn-primary mt-2">Войти</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Enter;
