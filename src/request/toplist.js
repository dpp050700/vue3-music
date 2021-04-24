import { get } from "./axios";

export const getTopList = async () => {
  let { list } = await get("/toplist/detail");
  return list;
};
