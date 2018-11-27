import React, { Component } from 'react';
import Message from '../messages/messages';

class MessageList extends Component {

  constructor() {
    super();
    this.addToSelect = this.addToSelect.bind(this);
  }

  addToSelect (id) {
    this.props.setSelect(id);
  }

  render() {
    const { messages, setStar, selectOn } = this.props;

    const messageList = messages.map((x, i) => {
    if (selectOn === true) {
        return <Message key={i} message={x} setStar={setStar} setSelect = {this.addToSelect} selected = {true} />
    } else {
        return <Message key={i} message={x} setStar={setStar} setSelect = {this.addToSelect} selected = {false} />
      }
    })

    return (
      <div>
        {messageList}
      </div>
    );
  }

}

export default MessageList;
