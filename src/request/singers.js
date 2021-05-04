import { get } from "./axios";
import pinyin from "pinyin";
import { getSingers } from "@/utils/help";

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
  let { artists = [], more } = await get("/artist/list", {
    limit,
    offset,
    type,
    area,
    initial,
  });
  return {
    lists: artists.map((item) => ({
      name: item.name,
      picUrl: item.picUrl + "?param=300x300",
      id: item.id,
    })),
    more,
  };
};

export const getSingerTopDetail = async () => {
  let {
    list: { artists = [] },
  } = await get("/toplist/artist");
  return artists.splice(0, 3);
};

/**
 * 获取歌手歌曲列表
 * @param {*} param0
 * @returns
 */
export const getSingerSongs = async ({ id, limit, offset }) => {
  let { songs = [], more } = await get(
    `/artist/songs?id=${id}&limit=${limit}&offset=${offset}`
  );

  const lists = songs.map((item) => {
    return {
      name: item.name,
      singers: getSingers(item.ar),
      album: item.al.name,
    };
  });

  return {
    lists,
    more,
  };
};

export const getSingerDetail = async (id) => {
  let { data } = await get(`/artist/detail?id=${id}`);
  let res = {
    videoCount: data.videoCount,
    cover: data.artist.cover,
    name: data.artist.name,
    musicSize: data.artist.musicSize,
    id: id,
  };
  return res;
};
