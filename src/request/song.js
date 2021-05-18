import { get } from "./axios";
import { getSingers } from "@/common/utils/help";

export const getSongDetail = async (ids) => {
  let res = await get(`/song/detail?ids=${ids.join(",")}`);
  return {
    songs: res.songs.map((item) => {
      item.al.picUrl = item.al.picUrl + "?param=300x300";
      return {
        name: item.name,
        singers: getSingers(item.ar),
        album: item.al,
        id: item.id,
        dt: item.dt / 1000,
      };
    }),
  };
};

// /playlist/tracks
