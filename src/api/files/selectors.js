import {createSelector} from '@reduxjs/toolkit';

export const selectState = (state) => state.files;

export const selectUploads = (state) => {
    const filesState = selectState(state);
    return filesState.uploads;
};

export const selectProcessing = (state) => {
    const filesState = selectState(state);
    return filesState.processing;
};

//#region selectors for current upload
export const selectIndexOfCurrentUpload = createSelector(
    [selectUploads],
    (uploads) => {
        return uploads.findIndex((upload) => upload.processing);
    }
);

export const selectHasCurrentUpload = createSelector(
    [selectIndexOfCurrentUpload],
    (indexOfCurrentUpload) => {
        return indexOfCurrentUpload !== -1;
    }
);

export const selectCurrentUpload = createSelector(
    [selectUploads, selectHasCurrentUpload, selectIndexOfCurrentUpload],
    (uploads, hasCurrentUpload, indexOfCurrentUpload) => {
        return hasCurrentUpload ? uploads[indexOfCurrentUpload] : null;
    }
);

export const selectFileNameOfCurrentUpload = createSelector(
    [selectCurrentUpload],
    (currentUpload) => {
        return currentUpload && currentUpload.fileName;
    }
);

export const selectProgressOfCurrentUpload = createSelector(
    [selectCurrentUpload],
    (currentUpload) => {
        return currentUpload && currentUpload.progress;
    }
);
//#endregion

//#region selectors for failed uploads
export const selectIndexOfFailedUpload = createSelector(
    [selectUploads],
    (uploads) => {
        return uploads.findIndex((upload) => !!upload.error);
    }
);

export const selectHasFailedUpload = createSelector(
    [selectIndexOfFailedUpload],
    (indexOfFailedUpload) => {
        return indexOfFailedUpload !== -1;
    }
);

export const selectFailedUpload = createSelector(
    [selectUploads, selectHasFailedUpload, selectIndexOfFailedUpload],
    (uploads, hasFailedUpload, indexOfFailedUpload) => {
        return hasFailedUpload ? uploads[indexOfFailedUpload] : null;
    }
);

export const selectErrorOfFailedUpload = createSelector(
    [selectFailedUpload],
    (failedUpload) => {
        return failedUpload && failedUpload.error;
    }
);
//#endregion
