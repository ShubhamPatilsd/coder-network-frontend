import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Typography, Box, Avatar, Link, IconButton } from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import Cookies from "js-cookie";
import axios from "axios";
import { api } from "../service/api";
import jwt from "jsonwebtoken";
import nFormatter from "../service/number_format";

function PostCard(propped) {
  const [upvotes, setUpvotes] = useState(
    propped.initialVotes ? propped.initialVotes : []
  );

  const [downvotes, setDownVotes] = useState(
    propped.initialDownVotes ? propped.initialDownVotes : []
  );
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (Cookies.get("userInfo")) {
      setUserData(
        jwt.verify(
          JSON.parse(Cookies.get("userInfo")).data,
          process.env.REACT_APP_JWT_KEY
        ).data
      );
    }
  }, []);

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

  return (
    <Box
      boxShadow={2}
      borderRadius={8}
      style={{
        paddingLeft: "1rem",
        paddingRight: "2rem",
        paddingTop: "2rem",
        paddingBottom: "2rem",
      }}
    >
      <Box style={{ display: "flex", alignItems: "center" }}>
        <Box style={{ marginRight: "0.5rem" }}>
          <IconButton
            onClick={() => {
              if (!Cookies.get("userInfo")) {
                window.location.href = "/login";
              }
              // axios
              //   .post("/add/upvote", {
              //     headers: {
              //       post_id: propped.id,
              //       data: JSON.parse(Cookies.get("userInfo")),
              //     },
              //   })
              api({
                method: "POST",
                url: "/add/upvote",
                data: {
                  data: {
                    post_id: propped.id,
                    data: JSON.parse(Cookies.get("userInfo")),
                  },
                },
              })
                .then((res) => {
                  setUpvotes(res.data[0]);
                  setDownVotes(res.data[1]);
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
            disabled={upvotes.includes(userData.jwt_id)}
          >
            <ArrowUpwardIcon />
          </IconButton>
          <Typography style={{ textAlign: "center" }}>
            {nFormatter(upvotes.length - downvotes.length, 1)}
          </Typography>
          <IconButton
            onClick={() => {
              if (!Cookies.get("userInfo")) {
                window.location.href = "/login";
              }
              // axios
              //   .post("/add/downvote", {
              //     headers: {
              //       post_id: propped.id,
              //       data: JSON.parse(Cookies.get("userInfo")),
              //     },
              //   })
              api({
                method: "POST",
                url: "/add/downvote",
                data: {
                  data: {
                    post_id: propped.id,
                    data: JSON.parse(Cookies.get("userInfo")),
                  },
                },
              })
                .then((res) => {
                  setUpvotes(res.data[0]);
                  setDownVotes(res.data[1]);
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
            disabled={downvotes.includes(userData.jwt_id)}
          >
            <ArrowDownwardIcon />
          </IconButton>
        </Box>

        <Box style={{ overflow: "auto" }}>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <Link
              href={`/profile/${propped.username}`}
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "0.5rem",
              }}
            >
              <Avatar
                style={{ borderRadius: "100%" }}
                src={`https://avatars.githubusercontent.com/u/${propped.poster_id}?v=4`}
                width="50px"
                height="auto"
              />
            </Link>
            <Link href={`/profile/${propped.username}`}>
              <Typography>Posted by {propped.username}</Typography>
            </Link>
          </Box>
          <Box>
            <Typography>
              <Box style={{ overflow: "auto" }}>
                <ReactMarkdown
                  style={{ marginTop: "1rem" }}
                  disallowedElements={["h1", "h2", "h3", "h4", "h5", "h6"]}
                  unwrapDisallowed
                  components={components}
                >
                  {propped.body}
                </ReactMarkdown>
              </Box>
            </Typography>
          </Box>
          <Typography variant="overline">
            Posted on {new Date(propped.date).toLocaleDateString()} at{" "}
            {new Date(propped.date).toLocaleTimeString()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default PostCard;
