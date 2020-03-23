import React from "react";

class Messages extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="h-100 my-3 p-3 border rounded scroll">
        {this.props.items?.map(item => (
          <div
            className={"mb-3 d-flex" + (item.isMy ? " justify-content-end" : "")}
            key={item.id}
          >
            <span
              style={{'maxWidth':'50%'}}
              className={
                "bg-light p-1 px-2 rounded d-flex flex-column" +
                (item.isMy ? " align-items-end" : "")
              }
            >
              <small className="text-muted">{"@"+item.author}</small>
              <span>{item.text}</span>
            </span>
          </div>
        ))}
      </div>
    );
  }
}

export default Messages;
