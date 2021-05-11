export const getSingers = (list) => {
  return list.map((item) => item.name).join("/");
};

export const shuffle = (arr) => {
  const list = [...arr];
  for (let index = 0; index < list.length; index++) {
    const randomInt = getRandomInt(index);
    swap(list, index, randomInt);
  }
  return list;
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * (max + 1));
};

const swap = (arr, i, j) => {
  const item = arr[i];
  arr[i] = arr[j];
  arr[j] = item;
};

export const getStoreGetter = (store, name, module) => {
  const key = module ? `${module}/${name}` : name;
  return store.getters[key];
};

export const getSongUrl = (id) => {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
};
