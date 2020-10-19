import React, { Component } from 'react';
import axios from "axios";

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersList: []
        }
      }
      componentDidMount() {
        this.getUsers();
      }

    getUsers = () => {
    axios
        .get("/api/users/")
        .then(res => this.setState({ usersList: res.data }))
        .catch(err => console.log(err));
    };
    renderItems = () => {
        const users = this.state.usersList;

        return users.map(user => (
            <li key={user.id} className="list-item">
              <span className="list-item--name">
                  {user.username}
              </span>
          </li>
        ))
    }
    render(){
        return (
            <div className="userListContainer">
                <ul className="userList">
                    {this.renderItems()}
                </ul>
            </div>
        );
    }
}

export default UserList;