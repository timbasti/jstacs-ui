export const not = (listA, listB) => listA.filter((value) => listB.indexOf(value) === -1);

export const intersection = (listA, listB) => listA.filter((value) => listB.indexOf(value) !== -1);

export const union = (listA, listB) => [...listA, ...not(listB, listA)];
