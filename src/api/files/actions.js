import {createAction} from '@reduxjs/toolkit';

const initAllFilesPost = createAction('files/all-files/post/init');
// const completeAllFilesPost = createAction('files/all-files/post/complete');
const initSingleFilePost = createAction('files/single-file/post/init');
// const completeSingleFilePost = createAction('files/single-file/post/complete');
const informSingleFilePost = createAction('files/single-file/post/inform');

export const actions = {
    allFiles: {
        post: {
            init: initAllFilesPost
        }
    },
    singleFile: {
        post: {
            init: initSingleFilePost,
            inform: informSingleFilePost
        }
    }
};
