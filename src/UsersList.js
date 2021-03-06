import React, { Component } from 'react';
import UsersService from './UsersService';

const usersService = new UsersService();


class UsersList extends Component {

constructor(props) {
    super(props);
    this.state = {
        users: [],
        nextPageURL: ''
    };
    this.nextPage = this.nextPage.bind(this);
    this.handleDelete = this.handleDelete(this);
}

componentDidMount() {
    let self = this;
    usersService.getUsers().then(function (result){
        self.setState({ users: result.data, nextPageURL: result.nextlink })
    });
}

handleDelete(e,pk) {
    let self = this;
    usersService.deleteUser({pk : pk}).then(()=>{
        let newArr = self.state.users.filter(function(obj) {
            return obj.pk !== pk;
        });
        self.setState({users: newArr})
    });
}

nextPage() {
    let self = this;
    usersService.getUsersByURL(this.state.nextPageURL).then((result) => {
        self.setState({ users: result.data, nextPageURL: result.nextlink })
    });
}

render() {

    return (
        <div className="users--list">
            <table className="table">
            <thead key="thead">
            <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th>Description</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {this.state.users.map( c =>
            <tr key={c.pk}>
                <td>{c.pk}</td>
                <td>{c.name}</td>
                <td>{c.last_name}</td>
                <td>{c.phone}</td>
                <td>{c.email}</td>
                <td>{c.address}</td>
                <td>{c.description}</td>
                <td>
                    <button onClick={(e)=> this.handleDelete(e,c.pk) }> Delete</button>
                    <a href={"/user/" + c.pk}>Update</a>
                </td>
            </tr>)}
            </tbody>
            </table>
            <button className="btn btn-primary" onClick= { this.nextPage }>Next</button>
        </div>

    )

}

}
export default UsersList;