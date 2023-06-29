export const isArrayEmpty = (array: any[] | undefined): boolean => array === undefined || array.length === 0;

export const removeDuplicates = <T>(array: T[]): T[] => [...new Set(array)];
