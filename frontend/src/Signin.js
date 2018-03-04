import React, {Component} from 'react';
import {Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";

export default class Signin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            name: "",
            onSubmit: this.props.onSubmit,
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0 && this.state.name.length > 0;
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        this.state.onSubmit(this.state.name, this.state.email,this.state.password);
    }

    render() {
        return (
            <div className="container-fluid banner">
                <div className="row justify-content-around banner-content center-items">
                    <form onSubmit={this.handleSubmit} className="col-6 center-items">
                        <FormGroup controlId="name" bsSize="large">
                            <ControlLabel className="auth-text">Name</ControlLabel>
                            <FormControl
                                autoFocus
                                type="name"
                                value={this.state.name}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup controlId="email" bsSize="large">
                            <ControlLabel className="auth-text">Email</ControlLabel>
                            <FormControl
                                autoFocus
                                type="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup controlId="password" bsSize="large">
                            <ControlLabel className="auth-text">Password</ControlLabel>
                            <FormControl
                                value={this.state.password}
                                onChange={this.handleChange}
                                type="password"
                            />
                        </FormGroup>
                        <Button
                            block
                            bsSize="large"
                            disabled={!this.validateForm()}
                            type="submit"
                        >
                            Login
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}