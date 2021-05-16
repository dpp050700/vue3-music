import storage from "good-storage";

export function getStorage(key) {
  return storage.get(key, []);
}

export function clearStorage(key) {
  storage.remove(key);
  return [];
}

export function save(key, items = []) {
  storage.set(key, items);
}

export function removeItem(key, compare) {
  const items = storage.get(key, []);
  deleteFromArray(items, compare);
  storage.set(key, items);
  return items;
}

export function saveItem(item, key, compare, maxLen) {
  const items = storage.get(key, []);
  insertArray(items, item, compare, maxLen);
  storage.set(key, items);
  return items;
}

function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare);
  if (index === 0) {
    return;
  }
  if (index > 0) {
    arr.splice(index, 1);
  }
  arr.unshift(val);
  if (maxLen && arr.length > maxLen) {
    arr.pop();
  }
}

function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare);
  if (index > -1) {
    arr.splice(index, 1);
  }
}
