import cookies from "react-cookies";

export default function MyCompareReducer(state, action) {
    switch (action.type) {
        case 'ADD_SERVICE':
            if (state.services.length >= 3) {
                alert("Bạn chỉ có thể so sánh tối đa 3 dịch vụ!");
                return state;
            }
            if (state.services.find(s => s.id === action.payload.id)) {
                alert("Dịch vụ này đã có trong danh sách so sánh!");
                return state;
            }
            
            const addedState = { ...state, services: [...state.services, action.payload] };
            cookies.save('compare_list', addedState.services);
            return addedState;

        case 'REMOVE_SERVICE':
            const removedState = {
                ...state,
                services: state.services.filter(s => s.id !== action.payload)
            };
            cookies.save('compare_list', removedState.services);
            return removedState;

        case 'LOAD_SERVICES':
            return { ...state, services: action.payload };

        default:
            return state;
    }
};