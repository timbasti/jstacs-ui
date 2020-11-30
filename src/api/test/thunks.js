import axios from 'axios';
import {
    getParameterSetStart,
    getParameterSetSuccess,
    getParameterSetFailure
} from './actions';

export const getToolParameterSet = () => (dispatch) => {
    dispatch(getParameterSetStart());
    axios
        .get('http://localhost:8080/test')
        .then((response) => {
            dispatch(getParameterSetSuccess(response.data));
        })
        .catch((error) => {
            dispatch(getParameterSetFailure(error));
        });
};
