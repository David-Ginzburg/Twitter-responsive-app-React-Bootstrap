import React, { Component } from 'react';

import './post-add-form.css';

export default class PostAddForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input: ''
        }
    }

    onValueChange = (e) => {
        this.setState(() => {
            return {
                input: e.target.value
            }
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAdd(this.state.input)
        this.setState(() => {
            return {
                input: ''
            }
        });
    }

    render() {
        return (
            <form 
                className="bottom-panel d-flex flex-column flex-md-row" 
                onSubmit={this.onSubmit}
            >
                <input 
                    type="text"
                    placeholder="О чем вы думаете сейчас?"
                    className="form-control new-post-label"
                    value={this.state.input}
                    onChange={this.onValueChange}
                />
                <button
                    type="submit"
                    className="btn btn-outline-secondary mt-2 mt-md-0"
                >
                Добавить
                </button>
            </form>
        )
    }   
}