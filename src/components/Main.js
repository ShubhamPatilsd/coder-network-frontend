import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Typography, Box, Avatar, Link } from "@material-ui/core";
import Navbar from "./Navbar";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import jwt from "jsonwebtoken";

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
      console.log(data.data);
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

  //const userData = JSON.parse(Cookies.get("userInfo"))

  return (
    <div>
      <Navbar />
      <h1>React cookies</h1>

      {/* <p>{userData.jwt_id}</p> */}

      {/* <img src={userData.pfp} alt={userData.username} height='50px' width='50px'/> */}

      <Box>
        {posts.map((post, i) => {
          return (
            <Box
              key={i}
              boxShadow={2}
              borderRadius={8}
              style={{ padding: "2rem" }}
            >
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <Link
                  href={`/profile/${post.username}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "0.5rem",
                  }}
                >
                  <Avatar
                    style={{ borderRadius: "100%" }}
                    src={`https://avatars.githubusercontent.com/u/${post.poster_id}?v=4`}
                    width="50px"
                    height="auto"
                  />
                </Link>
                <Typography>Posted by {post.username}</Typography>
              </Box>
              <Typography>
                <ReactMarkdown
                  style={{ marginTop: "1rem" }}
                  disallowedElements={["h1", "h2", "h3", "h4", "h5", "h6"]}
                  unwrapDisallowed
                  components={components}
                >
                  {post.body}
                </ReactMarkdown>
              </Typography>
              <Typography variant="overline">
                Posted on {new Date(post.date).toLocaleDateString()} at{" "}
                {new Date(post.date).toLocaleTimeString()}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </div>
  );
}

export default Main;
