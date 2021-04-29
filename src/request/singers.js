import { get } from "./axios";
import pinyin from "pinyin";

const getInitial = (name) => {
  const p = pinyin(name, { style: pinyin.STYLE_NORMAL });
  if (!p || !p.length) {
    return "";
  }
  return p[0][0].slice(0, 1).toUpperCase();
};

/**
 * 获取热门歌手
 * @returns
 */
export const getSingerTopList = async () => {
  let {
    list: { artists = [] },
  } = await get("/toplist/artist");
  const singerList = artists.map((item) => ({
    name: item.name,
    picUrl: item.picUrl + "?param=300x300",
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

/**
 * 获取歌手列表
 * type -1:全部 1:男歌手 2:女歌手 3:乐队
 * area -1:全部 7华语 96欧美 8:日本 16韩国 0:其他
 * initial: 按首字母索引查找参数,热门传-1
 * @returns
 */
export const getSingerList = async ({
  limit = 30,
  offset = 0,
  type = -1,
  area = -1,
  initial = "-1",
}) => {
  let { artists } = await get("/artist/list", {
    limit,
    offset,
    type,
    area,
    initial,
  });
  return artists.map((item) => ({
    name: item.name,
    picUrl: item.picUrl + "?param=300x300",
    id: item.id,
  }));
};

export const getSingerTopDetail = async () => {
  let {
    list: { artists = [] },
  } = await get("/toplist/artist");
  return artists.splice(0, 3);
};
