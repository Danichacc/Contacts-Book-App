import React from 'react';
import {UserList} from '../user_list/user_list';
import {FormUser} from '../form_user/form_user';
import './user_data_fetcher.css';

export class UserDataFetcher extends React.Component {
    state = {
        users: [],
        currentUser: {
            name: '',
            surname: '',
            phone: '',
            country: '',
            email: '',
            id: '',
        }
    }

    constructor(props) {
        super(props);

        this.abortController = null;
        this.handleUserClicked = this.handleUserClicked.bind(this);
        this.handleFormReset = this.handleFormReset.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    componentWillUnmount() {
        if (this.abortController) {
            this.abortController.abort();
            this.abortController = null;
        }
    }

    async fetchData() {
        const response = await fetch('https://6012d8eb54044a00172dccca.mockapi.io/users', {
            signal: this.getAbortSignal(),
        });
        const data = await response.json();

        this.setState({
            users: data,
        });
    }

    async addUser(user) {
        await fetch('https://6012d8eb54044a00172dccca.mockapi.io/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
            signal: this.getAbortSignal(),
        });

        await this.fetchData();
        this.handleFormReset();
    }

    async editUser(user) {
        const userId = `/${user.id}`;
        await fetch('https://6012d8eb54044a00172dccca.mockapi.io/users' + userId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
            signal: this.getAbortSignal(),
        });

        await this.fetchData();
        this.handleFormReset();
    }

    async removeUser(user) {
        const userId = `/${user.id}`;
        await fetch('https://6012d8eb54044a00172dccca.mockapi.io/users' + userId, {
            method: 'DELETE',
            signal: this.getAbortSignal(),
        });

        await this.fetchData();
        this.handleFormReset();
    }

    getAbortSignal() {
        this.abortController = new AbortController();

        return this.abortController.signal;
    }

    handleUserClicked(user) {
        this.setState({
            currentUser: user,
        });
    }

    handleFormReset() {
        this.setState({
            currentUser: {
                name: '',
                surname: '',
                phone: '',
                country: '',
                email: '',
                id: '',
            }
        });
    }

    render() {
        return (
            <div className='user-wrapper'>
                <UserList
                    users={this.state.users}
                    onUserClick={this.handleUserClicked}
                    onFormReset={this.handleFormReset}
                />
                <FormUser
                    users={this.state.users}
                    currentUser={this.state.currentUser}
                    onAddUser={user => this.addUser(user)}
                    onEditUser={user => this.editUser(user)}
                    onRemoveUser={user => this.removeUser(user)}
                />
            </div>
        );
    }
}
