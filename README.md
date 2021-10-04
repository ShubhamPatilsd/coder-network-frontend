# coder-network-frontend

<div align="center"><img width="150" height="auto" src="https://github.githubassets.com/images/modules/logos_page/Octocat.png"/></div>
<p align="center">Supports GitHub authentication!</p>


<br/><br/>
The frontend (React) for a social media platform for programmers

Backend can be found at: https://github.com/ShubhamPatilsd/coder-network-backend

Environment variables:

```
REACT_APP_JWT_KEY=
REACT_APP_API_URL=


REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGING_SENDER_ID=
REACT_APP_APP_ID=

REACT_APP_AXIOS_AUTH_TOKEN=
```
The `REACT_APP_JWT_KEY` is a randomly generated key to sign JWTs

`REACT_APP_API_URL` is the URL to the API

The 
```
REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGING_SENDER_ID=
REACT_APP_APP_ID=
```
is basically Firebase Authentication stuff. The text after the `REACT_APP_` prefix is the corresponding attribute for Firebase config. (Ex: `REACT_APP_AUTH_DOMAIN` is the `auth domain` in the Firebase docs.

`REACT_APP_AXIOS_AUTH_TOKEN=` is the GitHub access token to allow more requests to the GitHub API.


