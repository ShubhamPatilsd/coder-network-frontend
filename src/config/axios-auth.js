
//CHANGE HERE

const auth_header = {
    headers: {
        authorization:`token ${process.env.REACT_APP_AXIOS_AUTH_TOKEN}`
    }
}

export default auth_header;