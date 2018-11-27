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
    const { messages, setStar} = this.props;
    const messageList = messages.map((x, i) => {
      return <Message key={i} message={x} setStar={setStar} setSelect = {this.addToSelect} selectOn={this.props.selectOn}/>;
    })

    return (
      <div>
        {messageList}
      </div>
    );
  }

}

export default MessageList;
