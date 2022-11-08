import React, { Component } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import { withRouter } from "../HOCs/withRouter";
import { useNavigate } from "react-router-dom";

 class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votesToSkip: 2,
      guestCanPause: false,
      isHost: false,
    };
    ///
    // Check what the new way of accessing this.props.match.params in CBCs is
    ///
    this.roomCode = window.location.href.split('/')[4];
    this.getRoomDetails();
    this.leaveButtonPressed = this.leaveButtonPressed.bind(this)
  }

  getRoomDetails() {
    return fetch("/api/get-room" + "?code=" + this.roomCode)
      .then((response) => {
        if (!response.ok) {
          this.props.leaveRoomCallback();
          this.props.navigate('/')
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
      });
  }

  leaveButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch('/api/leave-room', requestOptions)
    .then(_response => {
      this.props.leaveRoomCallback();
      this.props.navigate('/')
    })
  }
  render() {
    return (
      <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Code: {this.roomCode}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Votes: {this.state.votesToSkip}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Guest Can Pause: {this.state.guestCanPause.toString()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Host: {this.state.isHost.toString()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={this.leaveButtonPressed}
        >
          Leave Room
        </Button>
      </Grid>
    </Grid>
    );
  }
}

export default withRouter(Room);