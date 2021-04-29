/* eslint-disable no-magic-numbers */
import {makeStyles} from '@material-ui/core/styles';

export const useApplicationsSectionStyles = makeStyles((theme) => {
    return {
        gridContainer: {height: '100%'},
        gridItem: {overflow: 'hidden'},
        root: {
            '@media (min-width:0px) and (orientation: landscape)': {height: `calc(100vh - ${48}px)`},
            '@media (min-width:600px)': {height: `calc(100vh - ${64}px)`},
            height: `calc(100vh - ${56}px)`
        }
    };
});
