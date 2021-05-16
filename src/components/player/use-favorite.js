import { useStore } from "vuex";
import { computed } from "vue";
import { SET_FAVORITE_LIST } from "../../store/player/mutation-type";
import { FAVORITE_KEY } from "@/common/config/index";
import { removeItem, saveItem } from "@/common/utils/arr-storage.js";
export default function useFavorite() {
  const store = useStore();
  const favoriteList = computed(() => store.getters["player/favoriteList"]);
  function getFavoriteIcon(song) {
    return isFavorite(song) ? "icon-favorite" : "icon-not-favorite";
  }

  function toggleFavorite(song) {
    let list = [];
    function compare(item) {
      return item.id === song.id;
    }
    if (isFavorite(song)) {
      list = removeItem(FAVORITE_KEY, compare);
    } else {
      list = saveItem(song, FAVORITE_KEY, compare, 100);
    }
    store.commit(`player/${SET_FAVORITE_LIST}`, list);
  }

  function isFavorite(song) {
    return favoriteList.value.findIndex((item) => item.id === song.id) > -1;
  }

  return {
    getFavoriteIcon,
    toggleFavorite,
  };
}
