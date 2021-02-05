import React from 'react';
import {AddUserButton} from '../add_user_button/add_user_button';
import './user_list.css';

export class UserList extends React.Component {
    render() {
        return (
            <div className='user-list'>
                {this.props.users.map((user, index) => (
                    <span
                        className='user'
                        key={index}
                        onClick={() => this.props.onUserClick(user)}
                    >
                        {user.name} {user.surname}
                    </span>
                ))}
                <AddUserButton onFormReset={this.props.onFormReset}/>
            </div>
        );
    }
}
