import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Typography, Box, Avatar, Link } from "@material-ui/core";
import Navbar from "./Navbar";
import ReactMarkdown from "react-markdown";
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

  useEffect(() => {
    axios.get("/get/posts").then((data) => {
      setPosts(data.data);
    });
    // console.log("Jwt key:", process.env);
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

      <Box style={{ marginTop: "1rem" }}>
        {posts.map((post, i) => {
          return (
            <PostCard
              username={post.username}
              poster_id={post.poster_id}
              body={post.body}
              date={post.date}
            />
          );
        })}
      </Box>
    </Box>
  );
}

export default Main;
