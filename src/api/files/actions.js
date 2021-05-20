import {createAction} from '@reduxjs/toolkit';

export const setFileSavingProgress = createAction('files/single-file/set/progress');

export const initFileSaving = createAction('files/all-files/init');
