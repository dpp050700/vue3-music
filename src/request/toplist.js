import { get } from "./axios";

export const getTopList = async () => {
  let { list } = await get("/toplist/detail");
  const officialList = list.filter((item) => item.tracks.length);
  const globalList = list.filter((item) => !item.tracks.length);
  return { officialList, globalList };
};
