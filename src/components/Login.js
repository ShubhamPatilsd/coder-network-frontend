import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { api } from "../service/api";
import { Redirect } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LockOpenIcon from "@material-ui/icons/LockOpen";

import Fade from "react-reveal/Fade";
import Box from "@material-ui/core/Box";
import githubLogin from "../service/auth";
import firebase from "../config/firebase-config";

function Login() {
  const [redirect, setRedirect] = useState(
    Cookies.get("userInfo") ? true : false
  );

  const [redirectData, setRedirectData] = useState();

  useEffect(async () => {
    firebase
      .auth()
      .getRedirectResult()
      .then((result) => {
        console.log(result);
        setRedirectData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  (async () => {
    if (redirectData && redirectData.user) {
      console.log(process.env.REACT_APP_API_URL);
      const jwtted_data = await api({
        method: "POST",
        url: "/jwt_auth",
        data: {
          data: {
            jwt_id: redirectData.additionalUserInfo.profile.id,
            pfp:
              redirectData.additionalUserInfo.profile.avatar_url.toString() +
              ".png",
            username: redirectData.additionalUserInfo.profile.login,
          },
        },
      });

      console.log(jwtted_data);

      Cookies.set("userInfo", jwtted_data, { expires: 29 });
      console.log("jwtted_data", jwtted_data);
      api({
        method: "POST",
        url: "/new/user",
        headers: { jwt_id: jwtted_data.data },
      });

      // axios.post("/new/user", {
      //   headers: { id: jwtted_data },
      // });
      setRedirect(true);
    }
  })();

  if (redirect) {
    return <Redirect to="/" />;
  } else {
    return (
      <div style={{ "text-align": "center" }}>
        <Fade bottom>
          <Box
            textAlign="center"
            style={{
              "background-color": "white",
              height: "456px",
              width: "100%",
              "max-width": "396px",
              "box-shadow": "0 3px 8px rgba(0, 0, 0, .25)",

              "word-wrap": "break-word",

              margin: "auto",
              "border-radius": "7px",
            }}
            paddingBottom="2rem"
            paddingTop="1rem"
          >
            <Box style={{ "margin-bottom": "2rem" }}>
              <Typography
                variant="h4"
                style={{
                  "font-weight": "800",
                  "margin-top": "10%",
                  "margin-right": "10px",
                  "margin-left": "10px",
                }}
              >
                Welcome to the <br />
                <span
                  style={{
                    background:
                      "linear-gradient(to right, #43e97b 0%, #38f9d7 100%)",
                    "-webkit-background-clip": "text",
                    "-webkit-text-fill-color": "transparent",
                    "margin-right": "10px",
                    "margin-left": "10px",
                  }}
                >
                  Coder Network
                </span>
              </Typography>

              <Typography
                variant="h5"
                style={{
                  "font-weight": "400",
                  "margin-top": "10%",
                  "margin-right": "10px",
                  "margin-left": "10px",
                }}
              >
                A social media platform for programmers
              </Typography>
            </Box>

            <Button
              onClick={async () => {
                await githubLogin();
              }}
              style={{}}
              variant="contained"
              startIcon={<LockOpenIcon />}
            >
              Login With GitHub
            </Button>
          </Box>
        </Fade>
      </div>
    );
  }
}

export default Login;
