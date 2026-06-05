const MyMessageReducer = (state, action) => {
    switch (action.type) {
        case "SET_UNREAD_COUNT":
            return action.payload;
        case "DECREASE_UNREAD_COUNT":
            return Math.max(0, state - 1);
        default:
            return state;
    }
};

export default MyMessageReducer;