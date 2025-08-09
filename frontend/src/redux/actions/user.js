import axios from "axios";
import { server } from "../../server";

// load user
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: "LOAD_USER_REQUEST" });
        const { data } = await axios.get(`${server}/user/getuser`, { withCredentials: true });
        dispatch({ type: "LOAD_USER_SUCCESS", payload: data.user });
    } catch (error) {
        dispatch({ type: "LOAD_USER_FAILURE", payload: error.response.data.message });
    }
};