import { useStore } from "vuex";
import { computed, watch, ref } from "vue";
import { getLyric } from "@/request/song";
import { SET_SONG_LYRIC } from "@/store/player/mutation-type";
import Lyric from "lyric-parser";
export default function useLyric() {
  const store = useStore();
  const currentLyric = ref(null);

  const currentSong = computed(() => store.getters["player/currentSong"]);

  watch(currentSong, async () => {
    const currentSongVal = currentSong.value;
    const id = currentSongVal.id;
    if (!currentSongVal.lyric) {
      let lyric = await getLyric(id);
      store.commit(`player/${SET_SONG_LYRIC}`, {
        id,
        lyric,
      });
    }
    currentLyric.value = new Lyric(currentSongVal.lyric, handleLyric);
  });

  function handleLyric() {}
}
