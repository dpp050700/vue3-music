export const getSingers = (list) => {
  return list.map((item) => item.name).join("/");
};
