import { Typography, Button, Box, TextField, Link } from "@material-ui/core";

import { api } from "../service/api";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import jwt from "jsonwebtoken";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Navbar from "./Navbar";

function Post() {
  const [postCharacters, setPostCharacters] = useState();
  const [errorBool, setErrorBool] = useState(false);
  const [textColor, setTextColor] = useState("black");
  const [label, setLabel] = useState("Your Post");
  const [userData, setUserData] = useState({});

  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <Box overflow="visible" width={450}>
          <SyntaxHighlighter
            style={materialDark}
            language={match[1]}
            PreTag="div"
            showLineNumbers
            children={String(children).replace(/\n$/, "")}
            {...props}
          />
        </Box>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  useEffect(() => {
    if (Cookies.get("userInfo")) {
      setUserData(
        jwt.verify(
          JSON.parse(Cookies.get("userInfo")).data,
          process.env.REACT_APP_JWT_KEY
        ).data
      );
    } else {
      window.location.href = "/";
    }
  }, []);

  if (!Cookies.get("userInfo")) {
    return <Redirect to="/login" />;
  } else {
    const userData = JSON.parse(Cookies.get("userInfo"));

    async function postData(event) {
      event.preventDefault();
      if (postCharacters.length > 500) {
        return;
      } else {
        await api({
          method: "POST",
          url: "/new/post",

          data: {
            data: userData.data,
            body: postCharacters,
          },
        })
          .then((res) => {
            window.location.href = "/";
          })
          .catch((err) => {});
      }
      //
    }

    return (
      <>
        <Navbar />
        <Box style={{ marginTop: "1rem" }}>
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <Box>
              <Box style={{ textAlign: "center" }}>
                <Typography variant="h4" style={{ marginBottom: "1rem" }}>
                  Make a Post
                </Typography>
                <Typography
                  variant="subtitle1"
                  style={{ marginBottom: "1rem" }}
                >
                  Tip: format this text with{" "}
                  <Link href="https://www.markdownguide.org/cheat-sheet">
                    Markdown
                  </Link>
                </Typography>
              </Box>
              <TextField
                error={errorBool}
                style={{ whiteSpace: "pre-wrap" }}
                label={label}
                multiline
                rows={10}
                autoFocus={true}
                variant="outlined"
                onChange={(event) => {
                  event.preventDefault();
                  setPostCharacters(event.target.value);
                  try {
                    event.target.value.length > 500
                      ? setErrorBool(true)
                      : setErrorBool(false);
                    event.target.value.length > 500
                      ? setLabel("Too Many Characters")
                      : setLabel("Your Post");
                    event.target.value.length > 500
                      ? setTextColor("red")
                      : setTextColor("black");
                  } catch (err) {}
                }}
              />
              <Typography style={{ textAlign: "right", color: textColor }}>
                {postCharacters ? postCharacters.trim().length : "0"}/500
              </Typography>
              <Button onClick={postData} variant="contained" color="primary">
                Post
              </Button>
            </Box>
          </Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box style={{ maxWidth: "350px", overflow: "auto" }}>
              <Typography>
                <ReactMarkdown
                  style={{ marginTop: "1rem" }}
                  disallowedElements={[
                    "h1",
                    "h2",
                    "h3",
                    "h4",
                    "h5",
                    "h6",
                    "img",
                    "video",
                  ]}
                  unwrapDisallowed
                  components={components}
                >
                  {postCharacters}
                </ReactMarkdown>
              </Typography>
            </Box>
          </Box>
        </Box>
      </>
    );
  }
}

export default Post;
