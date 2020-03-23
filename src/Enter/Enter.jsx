import React from "react";
import { withRouter } from 'react-router-dom'

class Enter extends React.Component {
  constructor(props) {
    super(props);
    this.handleCreate = this.handleCreate.bind(this);
    
  }

  handleCreate(){
    this.props.history.push('/chat-room')
  }

  render() {
    return (
      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
        <div className="w-50">
          <div className="card">
            <h5 className="card-header">Создание чата</h5>
            <div className="card-body">
              <input
                className="form-control"
                type="text"
                placeholder="Введите название"
              />
              <button className="btn btn-primary mt-2" onClick={this.handleCreate}>Создать</button>
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
