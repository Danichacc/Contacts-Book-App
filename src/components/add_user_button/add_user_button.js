import React from 'react';
import './add_user_button.css';

export class AddUserButton extends React.Component {
    render() {
        return (
            <button
                className='add-user-button'
                onClick={this.props.onFormReset}
            >
                Add User
            </button>
        );
    }
}
