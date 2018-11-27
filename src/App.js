import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import YourInfo from './YourInfo';
import VehicleInfo from './VehicleInfo';
import './App.css';
import wolkenkit from 'wolkenkit-client';
import queryString from 'query-string';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        firstName: '',
        lastName: '',
        email: '',
        make: '',
        year: '',
        model: ''
      }
    }
  }

  processEvent(events) {
    const sessionEmail = localStorage.getItem('userEmail');
    if (sessionEmail) {
      const userEvents = events.filter(event => {
        return event.email === sessionEmail;
      });

      const lastEvent = userEvents[userEvents.length - 1];
      if (lastEvent && !this.state.data.firstName && !this.state.data.lastName && !this.state.data.email && !this.state.data.make && !this.state.data.year && !this.state.data.model) {
        const data = {
          firstName: lastEvent.firstName || '',
          lastName: lastEvent.lastName || '',
          email: lastEvent.email || '',
          make: lastEvent.make || '',
          year: lastEvent.year || '',
          model: lastEvent.model || ''
        }
        console.log(data);
        this.setState({ data });
      }
    }
  }

  async run() {
    try {
      this.service = await wolkenkit.connect({ host: 'local.wolkenkit.io', port: 3010 });
      console.log('Yay, you are connected!', this.service);

    } catch (ex) {
      console.error(ex);
    }

    if (this.service && 1 !== 1) {
      this.service.lists.quotes.readAndObserve({
        take: 50
      }).
        failed(err => console.error(err)).
        started((events) => this.processEvent(events)).
        updated((events) => this.processEvent(events));
    }
  };

  render() {
    this.run();
    return (
      <Router>
        <div className="App">
          <Route exact path="/" render={(props) => <YourInfo {...props} state={this.state} />} />
          <Route exact path="/vehicleInfo" render={(props) => <VehicleInfo state={this.state} />} />
        </div>
      </Router>
    );
  }
}

export default App;
