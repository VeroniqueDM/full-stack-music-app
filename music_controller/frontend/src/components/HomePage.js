import React, { Component } from "react";
import CreateRoomPage from "./CreateRoomPage";
import RoomJoinPage from "./RoomJoinPage";
import {
    BrowserRouter,
    Route,
    Link,
    Routes,
    useNavigate,
} from "react-router-dom";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<p>This is the home page</p>} />

                    <Route path="/join" element={<RoomJoinPage />} />
                    <Route path="/create" element={<CreateRoomPage />} />
                </Routes>
            </BrowserRouter>
        );
    }
}
