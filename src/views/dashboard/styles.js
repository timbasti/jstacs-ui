import {makeStyles} from '@material-ui/core';

export const useStatefulExecutionsStyles = makeStyles((theme) => ({
    container: {height: '100%'},
    item: {height: '50%'}
}));

export const useToolExecutionsOverviewStyles = makeStyles((theme) => ({
    content: {height: '100%'},
    root: {height: '100%'}
}));

export const useToolExecutionListStyles = makeStyles((theme) => ({root: {overflow: 'auto'}}));

export const useDashboardViewStyles = makeStyles((theme) => ({
    content: {height: '100%'},
    grid: {height: '100%'},
    gridContent: {flex: 1},
    root: {height: '100%'}
}));
