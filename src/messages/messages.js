import React, { Component } from 'react';

class Message extends Component {

  constructor() {
    super();
    this.select = this.select.bind(this);
  }

  star = e => {
    const { setStar } = this.props;
    setStar(e.target.id);
  }

  select = e => {
    const { setSelect } = this.props;
    setSelect(e.target.id);
  }

  render() {
    const { message } = this.props;
    return (
      <div className="row message unread">
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" id={message.id} onClick={this.select}/>
            </div>
            <div onClick={this.star} className="col-xs-2">
              <i className={message.starred ? "star fa fa-star" : "star fa fa-star-o"} id={message.id}></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          <p href="#">
            {message.subject}
          </p>
        </div>
      </div>
    );
  }
}

export default Message;
