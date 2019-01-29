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
        <h3>{profile.name}</h3>
        <img src={profile.picture} alt="profile"/>
        <h4>{profile.nickname}</h4>
      </div>
    );
  }
}

export default Profile;
