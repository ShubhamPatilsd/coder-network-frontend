import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Typography, Box, Avatar, Link } from "@material-ui/core";

function PostCard(propped) {
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
    <Box boxShadow={2} borderRadius={8} style={{ padding: "2rem" }}>
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
        <Typography>Posted by {propped.username}</Typography>
      </Box>
      <Typography>
        <ReactMarkdown
          style={{ marginTop: "1rem" }}
          disallowedElements={["h1", "h2", "h3", "h4", "h5", "h6"]}
          unwrapDisallowed
          components={components}
        >
          {propped.body}
        </ReactMarkdown>
      </Typography>
      <Typography variant="overline">
        Posted on {new Date(propped.date).toLocaleDateString()} at{" "}
        {new Date(propped.date).toLocaleTimeString()}
      </Typography>
    </Box>
  );
}

export default PostCard;
