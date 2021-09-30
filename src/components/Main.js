import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

import { api } from "../service/api";
import { Typography, Box, Avatar, Link } from "@material-ui/core";
import Navbar from "./Navbar";
import { Tab, Tabs } from "@material-ui/core/";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import jwt from "jsonwebtoken";
import PostCard from "./PostCard";

function Main() {
  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={materialDark}
          language={match[1]}
          PreTag="div"
          children={String(children).replace(/\n$/, "")}
          {...props}
        />
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState({});
  const [userFeed, setUserFeed] = useState("trending");

  const getFeed = (personalized) => {
    api({
      method: "GET",
      url: personalized
        ? `/feed/${
            jwt.verify(
              JSON.parse(Cookies.get("userInfo")).data,
              process.env.REACT_APP_JWT_KEY
            ).data.username
          }/posts`
        : `/get/posts`,
    }).then((data) => {
      //add sorting algorithm here

      setPosts(data.data ? data.data.reverse() : []);
    });
  };

  useEffect(() => {
    getFeed(false);

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
    <Box>
      <Navbar />
      <Box
        style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        <Tabs value={userFeed}>
          <Tab
            value="trending"
            label="Trending"
            onClick={() => {
              getFeed(false);
              setUserFeed("trending");
            }}
          />
          <Tab
            value="feed"
            label="My Feed"
            onClick={() => {
              window.location.href = "/feed";
            }}
          />
        </Tabs>
      </Box>
      <Box style={{ marginTop: "1rem" }}>
        {posts !== [] ? (
          posts.map((post, i) => {
            return (
              <div key={i}>
                <PostCard
                  username={post.username}
                  poster_id={post.poster_id}
                  body={post.body}
                  date={post.date}
                  initialVotes={post.upvotes}
                  initialDownVotes={post.downvotes}
                  id={post._id}
                />
              </div>
            );
          })
        ) : (
          <Typography variant="subtitle1" style={{ textAlign: "center" }}>
            ¯\_(ツ)_/¯ Nothing to see here! <br />{" "}
            <small>
              This means that nobody you're following has posted anything. Your
              following list on GitHub gets transferred here so either they
              haven't signed up or they haven't posted anything.
            </small>
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default Main;
