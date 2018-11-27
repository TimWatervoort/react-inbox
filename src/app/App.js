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
    this.selected = [];
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
    await fetch(`${this.baseUrl}/messages`, {
      method: 'PATCH',
      headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
      body: JSON.stringify({
        messageIds: [id],
        command: 'star',
      })
    });
    this.componentDidMount();
  }

  async markAsRead () {
    await fetch(`${this.baseUrl}/messages`, {
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
    this.componentDidMount();
  }

  async markAsUnread () {
    await fetch(`${this.baseUrl}/messages`, {
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
    this.componentDidMount();
  }

  setSelect (id) {
    if (this.selected.includes(id)) {
      const removed = this.selected.filter(x => x !== id);
      this.selected = removed;
    } else {
      this.selected.push(id);
    }
  }

  render() {
    return (
      <div>
      <Navbar markAsRead = {this.markAsRead} markAsUnread = {this.markAsUnread}/>
      <MessageList messages={this.state.messages} setStar={this.setStar} setSelect={this.setSelect}/>
      <AddMessage callback = {this.addToMessages} />
      </div>
    );
  }
}

export default App;
