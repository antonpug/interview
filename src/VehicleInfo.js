import React, { Component } from 'react';
import wolkenkit from 'wolkenkit-client';

class VehicleInfo extends Component {
    constructor(props) {
    super(props);
    this.state = props.state;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const data = this.state.data;
        data[event.target.name] = event.target.value;
        this.setState({data});
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.service) {
            const data = { 
                firstName: this.state.data.firstName || '',
                lastName: this.state.data.lastName || '',
                email: this.state.data.email || '',
                year: this.state.data.year || '',
                make: this.state.data.make || '',
                model: this.state.data.model || ''
            };

            this.service.quote.quote().save(data);
            console.log(data);
        }
        setTimeout(() => {
            window.location = 'http://localhost:3001/?email=' + this.state.data.email;
        }, 1500);
        
    }

    async run() {
        try {
            this.service = await wolkenkit.connect({ host: 'local.wolkenkit.io', port: 3010 });
            console.log('Yay, you are connected!', this.service);
    
        } catch (ex) {
            console.error(ex);
        }
    };

    render() {
    this.run();
    return (
        <div>
        <header className="App-header">
            <h1>Your ride...</h1>
        </header>
        <form onSubmit={this.handleSubmit}>
        <div className="question">
            <label><div className="form-label">Year:</div></label>
            <input name="year" type="text" value={this.state.data.year} onChange={this.handleChange} />
        </div>
        <div className="question">
            <label><div className="form-label">Make:</div></label>
            <input name="make" type="text" value={this.state.data.make} onChange={this.handleChange} />
        </div>
        <div className="question">
            <label><div className="form-label">Model:</div></label>
            <input name="model" type="text" value={this.state.data.model} onChange={this.handleChange} />
        </div>
        <input type="submit" value="Submit" />
        </form>
        </div>
    );
    }
}

export default VehicleInfo;