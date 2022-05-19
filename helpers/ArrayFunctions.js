/**
 * function to get the index of an item from an array of objects with a speficic key
 * @param {Array} arrName - the array of objects you want to search through
 * @param {string} key - the name of the key you are searching for
 * @param {string} value - the value of the key
 */
const getObjectIndexFromKey = (arrName, key, value) => {
  return arrName.findIndex(object => object[key] && object[key] === value);
};

const deepFilter = (obj, value) => {
  const thing = Object.values(obj).some(v => {
    if (
      typeof v === "string" &&
      v.toLowerCase().includes(value.toLowerCase())
    ) {
      return true;
    }
    if (v && typeof v === "object") {
      return deepFilter(v, value);
    }
    return false;
  });
  return thing;
};

export { getObjectIndexFromKey, deepFilter }