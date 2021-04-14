import { get } from "./axios";

export const getBanner = async () => {
  let { banners } = await get("/banner");
  return banners.map((item, index) => ({
    imageUrl: item.imageUrl,
    id: index,
  }));
};

export const getHotRecommend = async () => {
  let { result } = await get("/personalized");
  return result.map((item) => ({
    id: item.id,
    picUrl: item.picUrl,
    playCount: item.playCount,
    playCountText: Math.floor(item.playCount / 10000) + "万",
    name: item.name,
  }));
};
