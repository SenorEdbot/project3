import React, { Component } from 'react';

class Profile extends Component {
  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }
  render() {
    const { profile } = this.state;
    return (
      <div>
        <h1>{profile.name} x</h1>
        <img src={profile.picture} alt="profile"/>
        <h3>{profile.nickname}</h3>
      </div>
    );
  }
}

export default Profile;
