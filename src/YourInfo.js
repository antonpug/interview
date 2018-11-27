import React, { Component } from 'react';
import wolkenkit from 'wolkenkit-client';

class YourInfo extends Component {
    constructor(props) {
        super(props);
        this.state = props.state;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const data = this.state.data;
        data[event.target.name] = event.target.value;
        this.setState({ data });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.history.push('/vehicleInfo');
        if (this.service) {
            const data = {
                firstName: this.state.data.firstName || '',
                lastName: this.state.data.lastName || '',
                email: this.state.data.email || '',
                year: this.state.data.year || '',
                make: this.state.data.make || '',
                model: this.state.data.model || ''
            };
            this.service.quote.quote().save(data);
            if (data.email) {
                localStorage.setItem('userEmail', data.email);
            }
        }
        this.service.lists.quotes.readAndObserve({
            take: 50
        }).
            failed(err => console.error(err)).
            started(() => console.log('test')).
            updated((quote) => console.log('test', quote));
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
                    <h1>A few details about you...</h1>
                </header>
                <form onSubmit={this.handleSubmit}>
                    <div className="question">
                        <label><div className="form-label">First Name:</div></label>
                        <input name="firstName" type="text" value={this.state.data.firstName} onChange={this.handleChange} />
                    </div>
                    <div className="question">
                        <label><div className="form-label">Last Name:</div></label>
                        <input name="lastName" type="text" value={this.state.data.lastName} onChange={this.handleChange} />
                    </div>
                    <div className="question">
                        <label><div className="form-label">Email:</div></label>
                        <input name="email" type="text" value={this.state.data.email} onChange={this.handleChange} />
                    </div>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default YourInfo;