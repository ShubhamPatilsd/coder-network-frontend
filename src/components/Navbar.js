import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Typography, Box, Button, Avatar, Link } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import PostAddIcon from "@material-ui/icons/PostAdd";
import jwt from "jsonwebtoken";

function Navbar() {
  const [reload, setReload] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(async () => {
    if (reload) {
      window.location.href = "/";
    }
  }, [reload]);

  useEffect(() => {
    if (Cookies.get("userInfo")) {
      setUserData(
        jwt.verify(
          JSON.parse(Cookies.get("userInfo")).data,
          process.env.REACT_APP_JWT_KEY
        ).data
      );
    } else {
      setUserData(undefined);
    }
  }, []);

  return (
    <Box
      style={{
        width: "100%",
        borderBottom: "1px solid lightgrey",
        paddingTop: "15px",
        paddingBottom: "15px",
      }}
    >
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <Link
            href="/"
            style={{ marginRight: "1rem", display: "flex" }}
            color="inherit"
          >
            <HomeIcon style={{ marginRight: "0.2rem" }} />
            <Typography>Home</Typography>
          </Link>
          <Link
            href="/post"
            style={{ marginRight: "1rem", display: "flex" }}
            color="inherit"
          >
            <PostAddIcon style={{ marginRight: "0.2rem" }} />
            <Typography>Post</Typography>
          </Link>
        </div>
        <div style={{ display: "flex", justifyContent: "end", width: "100%" }}>
          {userData ? (
            <>
              <Link href={`/profile/${userData.username}`}>
                <Avatar
                  style={{ marginRight: "2rem" }}
                  src={userData.pfp}
                  width="50px"
                  height="auto"
                />
              </Link>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  Cookies.remove("userInfo");
                  setReload(true);
                }}
              >
                Log Out
              </Button>
            </>
          ) : (
            <div>
              <Button href="/login" variant="contained">
                Sign In
              </Button>
            </div>
          )}
        </div>
      </div>
    </Box>
  );
}

export default Navbar;
