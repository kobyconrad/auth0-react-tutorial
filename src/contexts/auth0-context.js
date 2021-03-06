import React, { Component, createContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";

// create the context
export const Auth0Context = createContext();

// create a provider
export class Auth0Provider extends Component {
  // sets initial auth0 client state to null
  state = {
    auth0Client: null,
    isLoading: true,
    isAuthenticated: false,
    user: null,
  };

  // sets config info from my .env file
  config = {
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
    redirect_uri: window.location.origin,
  };

  // When component loads, initialize Auth0 client
  componentDidMount() {
    this.initializeAuth0();
  }

  // initialize the auth0 library
  initializeAuth0 = async () => {
    const auth0Client = await createAuth0Client(this.config);
    const isAuthenticated = await auth0Client.isAuthenticated();
    const user = isAuthenticated ? await auth0Client.getUser() : null;
    this.setState({ auth0Client, isLoading: false, isAuthenticated, user });
  };

  // making pizza

  render() {
    const { isLoading, isAuthenticated, user } = this.state;
    const { children } = this.props;

    const configObject = { isLoading, isAuthenticated, user };

    return (
      <Auth0Context.Provider value={configObject}>
        {children}
      </Auth0Context.Provider>
    );
  }
}
