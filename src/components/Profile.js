import React, { useState, useEffect } from "react";
import axios from "axios";
import auth_header from "../config/axios-auth";

import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import {
  makeStyles,
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Navbar from "../components/Navbar";

import EventNoteIcon from "@material-ui/icons/EventNote";

import ProfileError from "./ProfileError";
import Loading from "./Loading";

import extractDate from "../service/iso_converter";
import { useParams } from "react-router-dom";

import PostCard from "./PostCard";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
}));

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

function Profile(props) {
  const [errID, setErrID] = useState(false);
  const classes = useStyles();
  const [user_id, setUserID] = useState();
  const [followers, setFollowers] = useState();
  const [following, setFollowing] = useState();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [bio, setBio] = useState();
  const [userPosts, setUserPosts] = useState([]);
  const [dateCreated, setDateCreated] = useState();
  const { user } = useParams();

  useEffect(async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${user}`,
        auth_header
      );
      const exists = await axios.post(`/get/user`, {
        headers: { id: response.data.id },
      });
      console.log(exists);
      if (exists === {}) {
        throw new Error();
      }

      const posts = await axios.get(`/user/${response.data.login}/posts`);

      setUserID(response.data.id);
      setFollowers(response.data.followers);
      setFollowing(response.data.following);
      setUsername(response.data.login);
      setBio(response.data.bio);
      setDateCreated(response.data.created_at);
      setUserPosts(posts.data);

      setLoading(false);
    } catch (err) {
      setErrID(true);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <Box>
        <Navbar />
        <Loading />
      </Box>
    );
  }
  return errID ? (
    <Box>
      <Navbar />
      <ProfileError />
    </Box>
  ) : (
    <Box>
      <Navbar />
      <Box>
        <Box style={{ textAlign: "center" }}>
          <ThemeProvider theme={theme}>
            <Typography variant="h2">{username + "'s profile"}</Typography>
          </ThemeProvider>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <Avatar
              alt={username}
              style={{ border: "1px solid #e1e4e8" }}
              src={`https://avatars.githubusercontent.com/u/${user_id}?v=4.png`}
              className={classes.large}
            />
          </Box>
          <Box textAlign="center">
            <Typography variant="h6">
              View{" "}
              <Link
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {"@" + username}
              </Link>{" "}
              on GitHub
            </Typography>
            {bio ? (
              <Typography
                variant="h5"
                style={{
                  color: "#4b4848",
                  width: "100%",
                  maxWidth: "1000px",
                  margin: "auto",
                }}
              >
                {bio}
              </Typography>
            ) : undefined}
            <Box style={{ display: "inline-flex", marginTop: "1rem" }}>
              <Typography
                style={{
                  display: "flex",
                  marginRight: "0.5rem",
                  whiteSpace: "nowrap",
                }}
              >
                {<PeopleOutlineIcon style={{ marginRight: "0.5rem" }} />}
                Followers: {followers}
              </Typography>
              <Typography style={{ marginRight: "0.5rem" }}>•</Typography>
              <Typography style={{ whiteSpace: "nowrap" }}>
                Following: {following}
              </Typography>
            </Box>
            <Box>
              <Typography style={{ display: "inline-flex" }}>
                {<EventNoteIcon style={{ marginRight: "0.5rem" }} />}Joined on{" "}
                {extractDate(dateCreated)}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          style={{
            marginTop: "1rem",
          }}
        >
          <Box style={{ marginBottom: "1rem" }}>
            <ThemeProvider theme={theme}>
              <Typography variant="h4">Posts</Typography>
            </ThemeProvider>
          </Box>
          <Box>
            {userPosts.map((post, i) => {
              return (
                <PostCard
                  username={post.username}
                  poster_id={post.poster_id}
                  body={post.body}
                  date={post.date}
                  initialVotes={post.upvotes}
                  initialDownVotes={post.downvotes}
                  id={post._id}
                />
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Profile;
