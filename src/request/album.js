import { get } from "./axios";
import { getSongDetail } from "./song";

export const getPlayListDetail = async (id) => {
  let { playlist } = await get("/playlist/detail", { id });
  const { songs } = await getSongDetail(
    playlist.trackIds.map((item) => item.id)
  );
  return { name: playlist.name, cover: playlist.coverImgUrl, songs };
};
