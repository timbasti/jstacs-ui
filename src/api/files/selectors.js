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

// #region selectors for current upload
export const selectIndexOfCurrentUpload = createSelector(selectUploads, (uploads) => {
    const indexOfCurrentUpload = uploads.findIndex((upload) => upload.processing);
    return indexOfCurrentUpload;
});

export const selectHasCurrentUpload = createSelector(selectIndexOfCurrentUpload, (indexOfCurrentUpload) => {
    const hasCurrentUpload = indexOfCurrentUpload !== -1;
    return hasCurrentUpload;
});

export const selectCurrentUpload = createSelector(
    selectUploads,
    selectHasCurrentUpload,
    selectIndexOfCurrentUpload,
    (uploads, hasCurrentUpload, indexOfCurrentUpload) => {
        const currentUpload = hasCurrentUpload ? uploads[indexOfCurrentUpload] : null;
        return currentUpload;
    }
);

export const selectFileNameOfCurrentUpload = createSelector(
    selectCurrentUpload,
    (currentUpload) => currentUpload && currentUpload.fileName
);

export const selectProgressOfCurrentUpload = createSelector(
    selectCurrentUpload,
    (currentUpload) => currentUpload && currentUpload.progress
);
// #endregion

// #region selectors for failed uploads
export const selectIndexOfFailedUpload = createSelector(selectUploads, (uploads) => {
    const indexOfFailedUpload = uploads.findIndex((upload) => Boolean(upload.error));
    return indexOfFailedUpload;
});

export const selectHasFailedUpload = createSelector(
    selectIndexOfFailedUpload,
    (indexOfFailedUpload) => indexOfFailedUpload !== -1
);

export const selectFailedUpload = createSelector(
    selectUploads,
    selectHasFailedUpload,
    selectIndexOfFailedUpload,
    (uploads, hasFailedUpload, indexOfFailedUpload) => (hasFailedUpload ? uploads[indexOfFailedUpload] : null)
);

export const selectErrorOfFailedUpload = createSelector(selectFailedUpload, (failedUpload) => {
    const faliedUploadError = failedUpload && failedUpload.error;
    return faliedUploadError;
});
// #endregion
