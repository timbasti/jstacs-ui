import PropTypes from 'prop-types';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {setRouteData} from '../../api/route/slice';

const View = ({children, title}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setRouteData({view: title}));
    }, [dispatch, title]);

    return {children};
};

View.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
    title: PropTypes.string.isRequired
};

export {View};
