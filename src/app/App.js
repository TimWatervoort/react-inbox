import React, { Component } from 'react';
import './App.css';
import Navbar from '../navbar/navbar';
import MessageList from '../message-list/message-list';
import AddMessage from '../add-message/add-message';

class App extends Component {

  constructor() {
    super();
    this.state = { messages: [], selectOn: false, selected: [] }
    this.baseUrl = 'http://localhost:8082/api';
    this.addToMessages = this.addToMessages.bind(this);
    this.setStar = this.setStar.bind(this);
    this.setSelect = this.setSelect.bind(this);
    this.markAsRead = this.markAsRead.bind(this);
    this.markAsUnread = this.markAsUnread.bind(this);
    this.throwAway = this.throwAway.bind(this);
    this.setLabel = this.setLabel.bind(this);
    this.removeLabel = this.removeLabel.bind(this);
    this.bulkSelect = this.bulkSelect.bind(this);
    this.addLabel = '';
    this.tossLabel = '';
  }

  async componentDidMount () {
    const response = await fetch (`${this.baseUrl}/messages`);
    const json = await response.json();
    console.log(json);
    this.setState({
      ...this.state,
      messages: json
    });
  }

  async addToMessages (subject, body) {
    const newMessage = {
      subject: subject,
      body: body,
      read: false,
      starred: false,
      selected: true
    }

    const newPost = await fetch(`${this.baseUrl}/messages`, {
      method: "POST",
      headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
      body: JSON.stringify(newMessage)
    });
    const json = await newPost.json();
    this.setState({
      ...this.state,
      messages: [...this.state.messages, json]
    })
  }

  async setStar (id) {
    const response = await fetch(`${this.baseUrl}/messages`, {
      method: 'PATCH',
      headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
      body: JSON.stringify({
        messageIds: [id],
        command: 'star',
      })
    });
    const json = await response.json();
    this.setState({
      ...this.state,
      messages: json
    });
  }

  async markAsRead () {
    const response = await fetch(`${this.baseUrl}/messages`, {
      method: 'PATCH',
      headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
      body: JSON.stringify({
        messageIds: this.state.selected,
        command: 'read',
        read: true
      })
    });
    const json = await response.json();
    this.setState({
      ...this.state,
      messages: json
    })
    this.componentDidMount();
  }

  async markAsUnread () {
    const response = await fetch(`${this.baseUrl}/messages`, {
      method: 'PATCH',
      headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
      body: JSON.stringify({
        messageIds: this.state.selected,
        command: 'read',
        read: false
      })
    });
    const json = await response.json();
    this.setState({
      ...this.state,
      messages: json
    })
  }

  async throwAway () {
    const response = await fetch(`${this.baseUrl}/messages`, {
      method: 'PATCH',
      headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
      body: JSON.stringify({
        messageIds: this.state.selected,
        command: 'delete'
      })
    });
    const json = await response.json();
    console.log(json);
    this.setState({
      ...this.state,
      messages: json
    })
    this.selected = [];
  }

  setSelect (id) {
    if (this.state.selected.includes(parseInt(id))) {
      const removed = this.state.selected.filter(x => parseInt(x) !== parseInt(id));
      this.setState({
        ...this.state,
        selected: removed
      });
    } else {
      let idVar = parseInt(id);
      this.setState({
        ...this.state,
        selected: [...this.state.selected, idVar]
      })
    }
    // this.componentDidMount();

  }

  bulkSelect () {
    let val = !this.state.selectOn
    this.setState({
      ...this.state,
      selectOn: val
    })
    if (this.state.selected.length === this.state.messages.length){
      this.setState({
        ...this.state,
        selected: []
      })
    } else {
      let messIds = this.state.messages.map(x => x.id);
      this.setState({
        ...this.state,
        selected: messIds
      });
    }
    console.log(this.state.selectOn);
  }

  async setLabel (label) {
    this.addLabel = label;
    const response = await fetch(`${this.baseUrl}/messages`, {
      method: 'PATCH',
      headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
      body: JSON.stringify({
        messageIds: this.state.selected,
        command: 'addLabel',
        label: this.addLabel
      })
    });
    const json = await response.json();
    this.setState({
      ...this.state,
      messages:json
    });
  }

  async removeLabel (label) {
    this.tossLabel = label;
    const response = await fetch(`${this.baseUrl}/messages`, {
      method: 'PATCH',
      headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
      body: JSON.stringify({
        messageIds: this.state.selected,
        command: 'removeLabel',
        label: this.tossLabel
      })
    });
    const json = await response.json();
    this.setState({
      ...this.state,
      messages:json
    });
  }

  render() {
    return (
      <div>
      <Navbar markAsRead = {this.markAsRead} markAsUnread = {this.markAsUnread} throwAway = {this.throwAway} setLabel={this.setLabel} removeLabel={this.removeLabel} bulkSelect={this.bulkSelect} selectOn={this.state.selectOn}/>
      <MessageList messages={this.state.messages} setStar={this.setStar} setSelect={this.setSelect} selectOn={this.state.selectOn}/>
      <AddMessage callback = {this.addToMessages} />
      </div>
    );
  }
}

export default App;
