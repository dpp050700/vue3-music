import { get } from "./axios";

export const getTopList = async () => {
  let { artistToplist, list } = await get("/toplist");
  return {
    artistToplist,
    list,
  };
};
