import React from "react";

class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.addMessage = this.addMessage.bind(this);
  }

  addMessage(event){
    console.log(event)
    if(event.key && event.key != "Enter"){
      return;
    }
    const text = document.getElementById("text");
    if(!text || !text.value.length){
      return;
    }
    this.props.onAdd(text.value);
    text.value = "";
  }
  render() {
    return (
      <div className="py-3 d-flex">
        <input id="text" type="text" placeholder="Введите сообщение" className="form-control rounded-0 rounded-left" onKeyPress={this.addMessage}/>
        <button className="btn btn-primary rounded-0 rounded-right far fa-paper-plane" onClick={this.addMessage}></button>
        <i className="bg-light p-3 fas fa-sync-alt"></i>
      </div>
    );
  }
}

export default InputForm;
