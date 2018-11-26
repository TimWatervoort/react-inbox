import React, { Component } from 'react';
import Message from '../messages/messages';

class MessageList extends Component {

  constructor() {
    super();
    this.selected = [];
    this.addToSelect = this.addToSelect.bind(this);
  }

  addToSelect (id) {
    this.selected.push(id);
    console.log(this.selected);
  }

  render() {
    const { messages, setStar} = this.props;
    const messageList = messages.map((x, i) => {
      return <Message key={i} message={x} setStar={setStar} setSelect = {this.addToSelect} />;
    })

    return (
      <div>
        {messageList}
      </div>
    );
  }

}

export default MessageList;
