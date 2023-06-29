export const deepCopy = <T extends unknown>(object: T): T => JSON.parse(JSON.stringify(object));

export const hasValue = (object: unknown): boolean => typeof object !== 'undefined' && object !== null;

export const hasValues = (...args: unknown[]): boolean => {
  let flag = true;
  for (const arg of args) {
    if (!hasValue(arg)) {
      flag = false;
      break;
    }
  }
  return flag;
};

export const hasAnyValue = (...object: unknown[]): boolean => {
  let flag = false;
  for (const objectItem of object) {
    if (hasValue(objectItem)) {
      flag = true;
      break;
    }
  }
  return flag;
};
