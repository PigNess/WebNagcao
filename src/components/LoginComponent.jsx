import httpClient from '../client/httpClient';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import { Navigate } from 'react-router-dom';

class Login extends Component {
  static contextType = MyContext; // using this.context to access global state

  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
    };
  }

  render() {
    if (this.context.token === '') {
      return (
        <div className="align-valign-center">
          <h2 className="text-center">ADMIN LOGIN</h2>
          <form>
            <div className="align-center">
              <div>
                <label>Username</label>
                <input
                  type="text"
                  value={this.state.txtUsername}
                  onChange={(e) =>
                    this.setState({ txtUsername: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Password</label>
                <input
                  type="password"
                  value={this.state.txtPassword}
                  onChange={(e) =>
                    this.setState({ txtPassword: e.target.value })
                  }
                />
              </div>
              <div>
                <button
                  type="submit"
                  onClick={(e) => this.btnLoginClick(e)}
                >
                  LOGIN
                </button>
              </div>
            </div>
          </form>
        </div>
      );
    }

    return <Navigate to="/admin" replace />;
  }

  // event handlers
  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;

    if (username && password) {
      const account = { username, password };
      this.apiLogin(account);
    } else {
      alert('Please input username and password');
    }
  }

  // apis
  apiLogin(account) {
    httpClient.post('/api/admin/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setUsername(account.username);
      } else {
        alert(result.message);
      }
    });
  }
}

export default Login;
