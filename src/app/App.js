import React, { Component } from 'react';
import './App.css';
import Navbar from '../navbar/navbar';
import MessageList from '../message-list/message-list';
import AddMessage from '../add-message/add-message';

class App extends Component {

  constructor() {
    super();
    this.state = { messages: [] }
    this.baseUrl = 'http://localhost:8082/api'
  }

  async componentDidMount () {
    const response = await fetch (`${this.baseUrl}/messages`);
    const json = await response.json();
    this.setState({
      ...this.state,
      messages: json
    });
    console.log(json);
  }

  render() {
    return (
      <div>
      <Navbar />
      <MessageList messages={this.state.messages}/>
      <AddMessage />
      </div>
    );
  }
}

export default App;
