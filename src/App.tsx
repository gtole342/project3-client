import axios, { AxiosResponse } from "axios";
import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

// import Header from './navigation/Header'
import { CURRENT_USER, GET_USER } from "./const";
import Content from "./Content";
import Footer from "./navigation/Footer";
import Nav from "./navigation/Nav";

import { IAddress, IUser, IVendor } from "./react-app-env";

interface IAppState {
  user: IUser;
  userAddress?: IAddress;
  vendorInfo?: IVendor;
}

class App extends Component<{}, IAppState> {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        firstname: "",
        id: "",
        isLoggedIn: false,
        isVendor: false,
        lastname: "",
        password: "",
      },
      userAddress: {
        city: "",
        country: "",
        state: "",
        street: "",
        streetNumber: "",
        streetSuffix: "",
        zipcode: "",
      },
      vendorInfo: {
        businessName: "",
        instagramAccessToken: "",
        instagramIdPage: "",
        phoneNumber: "",
        pinned: [],
        website: "",
      },
    };
  }

  componentDidMount() {
    this.getUser();
    console.log(this.state.user)
  }

  logoutUser = (e) => {
    e.preventDefault();
    localStorage.removeItem("mernToken");
    this.getUser();
  }

  makeUserStateObject = (response: AxiosResponse | undefined) => {
    if (response) {
      const state: IAppState = {
        user: {
          email: response.data.email,
          favoriteArtists: response.data.favoriteArtists,
          favoriteWorks: response.data.favoriteWorks,
          firstname: response.data.firstname,
          id: response.data._id,
          isLoggedIn: true,
<<<<<<< HEAD
          isVendor: response.data.isVendor,
          lastname: response.data.lastname,
          password: response.data.password,
=======
          isVendor: response.data.user.isVendor,
          lastname: response.data.userlastname,
          password: response.data.user.password,
>>>>>>> 20f3536003249bb5c1e4350d5f2f25d67a30e922
        },
      };
      if (response.data.vendor) {
        state.userAddress = {
          city: response.data.vendor.city,
          country: response.data.vendor.country,
          state: response.data.vendor.state,
          street: response.data.vendor.street,
          streetNumber: response.data.vendor.streetNumber,
          streetSuffix: response.data.vendor.streetSuffix,
          zipcode: response.data.vendor.zipcode,
        };
        state.vendorInfo = {
          businessName: response.data.vendor.businessName,
          instagramAccessToken: response.data.vendor.instagramAccessToken,
          instagramIdPage: response.data.vendor.insta,
          phoneNumber: response.data.vendor.phoneNumber,
          pinned: response.data.vendor.pinned,
          website: response.data.vendor.website,
        };
      }
      return state;
    } else {
      const state: IAppState = {
        user: {
          email: "",
          firstname: "",
          id: "",
          isLoggedIn: false,
          isVendor: false,
          lastname: "",
          password: "",
        },
      };
      return state;
    }
  }

  getUser = () => {
    // see if theres a token
    const token = localStorage.getItem("mernToken");
    // If theres a token, try to use it ot get the user info
    if (token) {
      console.log("here")
      axios.get(CURRENT_USER, {
        headers: { "Authorization": `Bearer ${token}` },
      })
        .then((response) => {
          console.log(response)
          axios.get(GET_USER(response.data.user._id))
          .then((response) => {
            console.log(response)
            const user = this.makeUserStateObject(response)
            console.log("USer",user);
            this.setState(user);
          })
          .catch();
        })
        .catch((err) => {
          console.log("Error with token", err);
        });
    } else {
      this.setState(this.makeUserStateObject(undefined));
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <main>
            <Nav user={this.state.user} logoutUser={this.logoutUser} />
            <Content user={this.state.user} refreshUser={this.getUser} />
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
