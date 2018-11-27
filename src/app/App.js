import React, { Component } from 'react';
import './App.css';
import Navbar from '../navbar/navbar';
import MessageList from '../message-list/message-list';
import AddMessage from '../add-message/add-message';

class App extends Component {

  constructor() {
    super();
    this.state = { messages: [] }
    this.baseUrl = 'http://localhost:8082/api';
    this.addToMessages = this.addToMessages.bind(this);
    this.setStar = this.setStar.bind(this);
    this.setSelect = this.setSelect.bind(this);
    this.markAsRead = this.markAsRead.bind(this);
    this.markAsUnread = this.markAsUnread.bind(this);
    this.throwAway = this.throwAway.bind(this);
    this.setLabel = this.setLabel.bind(this);
    this.removeLabel = this.removeLabel.bind(this);
    this.selected = [];
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
        messageIds: this.selected,
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
        messageIds: this.selected,
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
        messageIds: this.selected,
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
    if (this.selected.includes(id)) {
      const removed = this.selected.filter(x => x !== id);
      this.selected = removed;
      console.log(this.selected);
    } else {
      this.selected.push(id);
      console.log(this.selected);
    }
  }

  async setLabel (label) {
    this.addLabel = label;
    const response = await fetch(`${this.baseUrl}/messages`, {
      method: 'PATCH',
      headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
      body: JSON.stringify({
        messageIds: this.selected,
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
    console.log(this.tossLabel);
  }

  render() {
    return (
      <div>
      <Navbar markAsRead = {this.markAsRead} markAsUnread = {this.markAsUnread} throwAway = {this.throwAway} setLabel={this.setLabel} removeLabel={this.removeLabel}/>
      <MessageList messages={this.state.messages} setStar={this.setStar} setSelect={this.setSelect}/>
      <AddMessage callback = {this.addToMessages} />
      </div>
    );
  }
}

export default App;
