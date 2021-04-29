import {createSelector} from '@reduxjs/toolkit';

export const selectState = (state) => state.applications;

export const selectError = (state) => {
    const applicationsState = selectState(state);
    return applicationsState.error;
};

export const selectProcessing = (state) => {
    const applicationsState = selectState(state);
    return applicationsState.processing;
};

export const selectAvailableApplications = (state) => {
    const applicationsState = selectState(state);
    return applicationsState.available || [];
};

export const selectNumberOfAvailableApplications = createSelector(
    selectAvailableApplications,
    (availableApplications) => {
        const numberOfAvailableApplications = availableApplications?.length || 0;
        return numberOfAvailableApplications;
    }
);
