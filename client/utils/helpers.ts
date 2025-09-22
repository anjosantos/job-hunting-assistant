export const removeTypename = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) => removeTypename(item));
  } else if (typeof obj === "object" && obj !== null) {
    const newObj = { ...obj }; // Create a shallow copy to avoid modifying the original object directly
    delete newObj.__typename;
    for (const key in newObj) {
      if (Object.prototype.hasOwnProperty.call(newObj, key)) {
        newObj[key] = removeTypename(newObj[key]);
      }
    }
    return newObj;
  }
  return obj;
};
