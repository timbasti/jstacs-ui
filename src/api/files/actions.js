import {createAction} from '@reduxjs/toolkit';

const informSingleFilePost = createAction('files/single-file/post/inform');

export const actions = {
    singleFile: {
        post: {
            inform: informSingleFilePost
        }
    }
};
