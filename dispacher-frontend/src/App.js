import React from 'react';
import Chat from 'react-simple-chat';
import io from 'socket.io-client'

import 'react-simple-chat/src/components/index.css';
import config from './config.json'



class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    this.socket = io(config.endpoint);
  }

  handleUserSend(m) {
    this.socket.emit(JSON.stringify(m));
  }

  render() {
    return (
      <div className="App">
        <Chat user={{id: 1}}
        messages={this.state.messages}
        title="apples"
        onSend={console.log}
      />
      </div>
    );
  }
  
}

export default App;
