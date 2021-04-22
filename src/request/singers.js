import { get } from "./axios";
import pinyin from "pinyin";

const getInitial = (name) => {
  const p = pinyin(name, { style: pinyin.STYLE_NORMAL });
  if (!p || !p.length) {
    return "";
  }
  return p[0][0].slice(0, 1).toUpperCase();
};

export const getSingerTopList = async () => {
  let {
    list: { artists = [] },
  } = await get("/toplist/artist");
  const singerList = artists.map((item) => ({
    name: item.name,
    picUrl: item.picUrl,
    id: item.id,
    initial: getInitial(item.name),
  }));
  const singerMap = {
    "#": {
      initial: "#",
      list: [],
    },
  };
  singerList.forEach((item) => {
    const key = item.initial;
    if (key.match(/[a-zA-Z]/)) {
      if (!singerMap[key]) {
        singerMap[key] = {
          initial: key,
          list: [],
        };
      }
      singerMap[key].list.push(item);
    } else {
      singerMap["#"].list.push(item);
    }
  });
  const list = Object.values(singerMap).filter(
    (item) => item.list.length !== 0
  );

  return list.sort((a, b) => {
    return a.initial.charCodeAt(0) - b.initial.charCodeAt(0);
  });
};

export const getSingerList = async () => {
  let { artists } = await get("/artist/list?type=1&area=96&initial=-1");
  console.log(artists);
  return artists;
};
