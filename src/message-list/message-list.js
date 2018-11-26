import React, { Component } from 'react';
import Message from '../messages/messages';

class MessageList extends Component {

  render() {
    const { messages } = this.props;
    const messageList = messages.map((x, i) => {
      return <Message key={i} message={x} />;
    })

    return (
      <div>
        {messageList}
      </div>
    );
  }

}

export default MessageList;
