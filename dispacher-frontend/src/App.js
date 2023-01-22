import React from 'react';
import Chat from 'react-simple-chat';
import io from 'socket.io-client'

import 'react-simple-chat/src/components/index.css';
import config from './config.json'


class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      username: "bus42",
      userid: 1
    }

    this.handleUserSend = this.handleUserSend.bind(this);
  }

  componentDidMount() {
    if (!this.socket) {
      this.socket = io(config.endpoint);
      this.socket.on("connect", () => {
        console.log(this.socket.id);

        this.socket.on("server_chat", chat => {
          const m = this.state.messages;
          m.push({
            id: m.length,
            text: chat,
            user: {
              id: 2
            }
          });
          this.setState({
            messages: m
          })
        });
      });
      
    }
    
  }

  handleUserSend(m) {
    this.socket.emit("client_chat", m.text);
    console.log("here");
  }

  render() {
    return (
      <div className="App">
        <Chat user={{id: 1}}
        messages={this.state.messages}
        title="Chat"
        onSend={this.handleUserSend}
      />
      </div>
    );
  }
  
}

export default App;
