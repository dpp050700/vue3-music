import { get } from "./axios";
import { getSingers } from "@/common/utils/help";

export const getSongDetail = async (ids) => {
  let res = await get(`/song/detail?ids=${ids.join(",")}`);
  return {
    songs: res.songs.map((item) => {
      return {
        name: item.name,
        singers: getSingers(item.ar),
        album: item.al,
      };
    }),
  };
};
