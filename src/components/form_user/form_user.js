import React from 'react';
import './form_user.css';

export class FormUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.currentUser.id !== prevState.id) {
            return {
                name: nextProps.currentUser.name,
                surname: nextProps.currentUser.surname,
                phone: nextProps.currentUser.phone,
                country: nextProps.currentUser.country,
                email: nextProps.currentUser.email,
                id: nextProps.currentUser.id,
            };
        }

        return null;
    }

    changeInput(field) {
        return event => {
            this.setState({
                [field]: event.target.value,
            });
        }
    }

    render() {
        const namePattern = /^[A-Za-zА-Яа-я]+$/;
        const phonePattern = /^\d+$/;
        const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

        const isEnabled = this.state.name.match(namePattern)
                          && this.state.surname.match(namePattern)
                          && this.state.phone.match(phonePattern)
                          && this.state.country.match(namePattern)
                          && this.state.email.match(emailPattern)

        return (
            <div className='form-wrapper'>
                <div className='form-user'>
                    <label htmlFor='name'>Name</label>
                    <input
                        type='text'
                        name='name'
                        pattern='[A-Za-zА-Яа-я]+'
                        value={this.state.name}
                        onChange={this.changeInput('name')}
                    />
                    <label htmlFor='surname'>Surname</label>
                    <input
                        type='text'
                        name='surname'
                        pattern='[A-Za-zА-Яа-я]+'
                        value={this.state.surname}
                        onChange={this.changeInput('surname')}
                    />
                    <label htmlFor='phone'>Phone</label>
                    <input
                        type='tel'
                        name='phone'
                        pattern='[0-9]+'
                        value={this.state.phone}
                        onChange={this.changeInput('phone')}
                    />
                    <label htmlFor='country'>Country</label>
                    <input
                        type='text'
                        name='country'
                        pattern='[A-Za-zА-Яа-я]+'
                        value={this.state.country}
                        onChange={this.changeInput('country')}
                    />
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        name='email'
                        pattern='^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$'
                        value={this.state.email}
                        onChange={this.changeInput('email')}
                    />
                    <div className='form-controls'>
                        <button
                            onClick={() => {
                            if (this.props.users.some(user => user.id === this.state.id)) {
                                this.props.onEditUser(this.state);
                            } else {
                                this.props.onAddUser(this.state);
                                this.setState({
                                    name: '',
                                    surname: '',
                                    phone: '',
                                    country: '',
                                    email: '',
                                    id: '',
                                });
                            }}}
                            disabled={!isEnabled}
                        >
                            Save
                        </button>
                        <button
                            onClick={() => this.props.onRemoveUser(this.state)}
                            disabled={this.state.id === ''}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
