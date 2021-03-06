import React, { Component } from "react";
import AuthApiService from "../../services/auth-api-service";
import TokenService from "../../services/token-service";
import NotesContext from "../../contexts/NotesContext";
import Header from "../../components/Header/Header";
import { Input, Button } from "../../components/Utils/Utils";
import Footer from "../../components/Footer/Footer";
import "./Login.css";

class Login extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  };
  static contextType = NotesContext;

  state = { error: null };

  handleSubmitJwtAuth = e => {
    e.preventDefault();
    this.setState({ error: null });
    const { user_name, password } = e.target;

    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value
    })
      .then(res => {
        user_name.value = "";
        password.value = "";
        TokenService.saveAuthToken(res.authToken);
        const user = TokenService.getUserFromToken();
        this.context.user = user.full_name;
        this.props.history.push("/my-notes");
        this.context.getNotes();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;

    return (
      <>
        <Header />
        <section className="LoginPage">
          <h2>Welcome back!</h2>
          <h3>Please log in below:</h3>
          <form className="loginForm" onSubmit={this.handleSubmitJwtAuth}>
            <div role="alert">{error && <p className="red">{error}</p>}</div>
            <div className="user_name">
              <label htmlFor="LoginForm__user_name">User name</label>
              <Input
                required
                name="user_name"
                id="LoginForm__user_name"
                placeholder="demo_user"
              />
            </div>
            <div className="password">
              <label htmlFor="LoginForm__password">Password</label>
              <Input
                required
                name="password"
                type="password"
                id="LoginForm__password"
                placeholder="Demo123!"
              />
            </div>
            <Button className="loginButton" type="submit">
              Login <i className="fas fa-sign-in-alt" />
            </Button>
          </form>
        </section>
        <Footer />
      </>
    );
  }
}

export default Login;
