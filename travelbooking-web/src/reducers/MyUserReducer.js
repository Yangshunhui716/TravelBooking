import cookies from 'react-cookies';

const MyUserReducer = (current, action) => {
    switch (action.type) {
        case "LOGIN":
            return action.payload;

        case "LOGOUT":
            cookies.remove("token");
            return null;
    }

    return current;
}

export default MyUserReducer;