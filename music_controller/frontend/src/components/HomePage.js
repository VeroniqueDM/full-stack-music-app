import React, { Component } from "react";
import CreateRoomPage from "./CreateRoomPage";
import RoomJoinPage from "./RoomJoinPage";
import {
    BrowserRouter,
    Route,
    Link,
    Routes,
    Navigate,
} from "react-router-dom";
import Room from "./Room";
import { Button, ButtonGroup, Grid, Typography } from "@material-ui/core";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          roomCode: null,
        };
    }
    async componentDidMount() {
      fetch("/api/user-in-room")
        .then((response) => response.json())
        .then((data) => {
          console.log(data.code)
          this.setState({
            roomCode: data.code,
          });
          console.log(this.state)
        });
    }
  
    renderHomePage() {
      return (
        <Grid container spacing={3}>
          <Grid item xs={12} align="center">
            <Typography variant="h3" compact="h3">
              House Party
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <ButtonGroup disableElevation variant="contained" color="primary">
              <Button color="primary" to="/join" component={Link}>
                Join a Room
              </Button>
              <Button color="secondary" to="/create" component={Link}>
                Create a Room
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      );
    }
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                      this.state.roomCode ? <Navigate to={`/room/${this.state.roomCode}`} /> : (this.renderHomePage())
                    } />
                    <Route path="/join" element={<RoomJoinPage />} />
                    <Route path="/create" element={<CreateRoomPage />} />
                    <Route path="/room/:roomCode" element={<Room />} />
                </Routes>
            </BrowserRouter>
        );
    }
}