import React, { Component } from 'react';

import UsersService from './UsersService';

const usersService = new UsersService();

class UserCreateUpdate extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        const { match: { params } } = this.props;
        if (params && params.pk) {
            usersService.getUser(params.pk).then((c) => {
                this.refs.name.value = c.name;
                this.refs.lastName.value = c.last_name;
                this.refs.email.value = c.email;
                this.refs.phone.value = c.phone;
                this.refs.address.value = c.address;
                this.refs.description.value = c.description;
            })
        }
    }
    handleCreate() {
        usersService.createUser(
            {
                "name": this.refs.name.value,
                "last_name": this.refs.lastName.value,
                "email": this.refs.email.value,
                "phone": this.refs.phone.value,
                "address": this.refs.address.value,
                "description": this.refs.description.value
            }).then((result) => {
                alert("¡Usuario creado!");
            }).catch(() => {
                alert('¡Hubo un error! Porfavor revisa tu formulario.');
            });
    }
    handleUpdate(pk) {
        usersService.updateUser(
            {
                "pk": pk,
                "name": this.refs.name.value,
                "last_name": this.refs.lastName.value,
                "email": this.refs.email.value,
                "phone": this.refs.phone.value,
                "address": this.refs.address.value,
                "description": this.refs.description.value
            }
        ).then((result) => {
            alert("Usuario actualizado");
        }).catch(() => {
            alert('¡Hubo un error! Porfavor revisa tu formulario.');
        });
    }
    handleSubmit(event) {
        const { match: { params } } = this.props;
        if (params && params.pk) {
            this.handleUpdate(params.pk);
        }
        else {
            this.handleCreate();
        }
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>
                        First Name:</label>
                    <input className="form-control" type="text" ref='Name' />

                    <label>
                        Last Name:</label>
                    <input className="form-control" type="text" ref='lastName' />

                    <label>
                        Phone:</label>
                    <input className="form-control" type="text" ref='phone' />

                    <label>
                        Email:</label>
                    <input className="form-control" type="text" ref='email' />

                    <label>
                        Address:</label>
                    <input className="form-control" type="text" ref='address' />

                    <label>
                        Description:</label>
                    <textarea className="form-control" ref='description' ></textarea>

                    <input className="btn btn-primary" type="submit" value="Submit" />
                </div>
            </form>
        );
    }
}
export default UserCreateUpdate;