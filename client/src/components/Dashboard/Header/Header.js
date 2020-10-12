import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import axios from "axios";

import "./Header.css";

const Header = () => {
  const history = useHistory();

  const logout = async () => {
    const res = await axios.post("/api/logout", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("authorization"),
      },
    });
    if (res.data) {
      localStorage.removeItem("authorization");
    }
    console.log(res.data);
    history.push({
      pathname: "/login",
    });
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar className="header__container">
          <div>
            <Typography variant="h6">Dashboard</Typography>
          </div>

          <div>
            <Typography
              style={{ cursor: "pointer" }}
              variant="body1"
              onClick={logout}
              data-testid="logout"
            >
              Logout
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
