import React, { Component } from 'react';
import Header from './components/Header';
import Gantt from './components/Gantt';
import Toolbar from './components/Toolbar';
import MessageArea from './components/MessageArea';
import './App.css';

const data = {
  data: [
    { id: 1, text: 'Planning', start_date: '2020-04-01', duration: 3, progress: 0.6 },
    { id: 2, text: 'Documentation', start_date: '2020-04-3', duration: 3, progress: 0.4 },
    { id: 3, text: 'Implementation', start_date: '2020-04-6', duration: 4, progress: 0.2 },
    { id: 4, text: 'Initial Testing', start_date: '2020-04-10', duration: 5, progress: 0.0 },
    { id: 5, text: 'Testing', start_date: '2020-04-11', duration: 4, progress: 0.0 },
    { id: 6, text: 'Finishing', start_date: '2020-04-15', duration: 1, progress: 0.0 }
  ],
  links: [
    { id: 1, source: 1, target: 2, type: '0' }
  ]
};

class App extends Component {
  state = {
    currentZoom: 'Days',
    messages: []
  };

  addMessage(message) {
    const maxLogLength = 5;
    const newMessate = { message };
    const messages = [
      newMessate,
      ...this.state.messages
    ];

    if (messages.length > maxLogLength) {
      messages.length = maxLogLength;
    }
    this.setState({ messages });
  }

  logDataUpdate = (type, action, item, id) => {
    let text = item && item.text ? ` (${item.text})` : '';
    let message = `${type} ${action}: ${id} ${text}`;
    if (type === 'link' && action !== 'delete') {
      message += ` ( source: ${item.source}, target: ${item.target} )`;
    }
    this.addMessage(message);
  }

  handleZoomChange = (zoom) => {
    this.setState({
      currentZoom: zoom
    });
  }

  render() {
    const { currentZoom, messages } = this.state;
    return (
      <div>
        <div className="header">
          <Header
            name="Gantt Chart - Internship Assignment"
          />
        </div>
        <div className="zoom-bar">
          <Toolbar
            zoom={currentZoom}
            onZoomChange={this.handleZoomChange}
          />
        </div>
        <div className="gantt-container">
          <Gantt
            tasks={data}
            zoom={currentZoom}
            onDataUpdated={this.logDataUpdate}
          />
        </div>
        <MessageArea
          messages={messages}
        />
      </div>
    );
  }
}

export default App;