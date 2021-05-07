import { createApp } from "vue";
import { addClass, removeClass } from "@/common/utils/dom";
const relativeClass = "global-relative";
export default function createLoadingDirective(Comp) {
  return {
    mounted(el, binding) {
      const app = createApp(Comp);
      const instance = app.mount(document.createElement("div"));
      const name = Comp.name;
      if (!el[name]) {
        el[name] = {};
      }
      el[name].instance = instance;
      const arg = binding.arg;
      let loadingConfig = {};
      if (typeof arg === "string") {
        loadingConfig.title = arg;
      } else {
        loadingConfig = arg;
      }
      instance.setConfig(loadingConfig);
      if (binding.value) {
        append(el);
      }
    },
    updated(el, binding) {
      const arg = binding.arg;
      const name = Comp.name;
      let loadingConfig = {};
      if (typeof arg === "string") {
        loadingConfig.title = arg;
      } else {
        loadingConfig = arg;
      }
      el[name].instance.setConfig(loadingConfig);

      if (binding.value !== binding.oldValue) {
        binding.value ? append(el) : remove(el);
      }
    },
  };

  function append(el) {
    const name = Comp.name;
    const style = getComputedStyle(el);
    if (["absolute", "fixed", "relative"].indexOf(style.position) === -1) {
      addClass(el, relativeClass);
    }
    el.appendChild(el[name].instance.$el);
  }
  function remove(el) {
    const name = Comp.name;
    removeClass(el, relativeClass);
    el.removeChild(el[name].instance.$el);
  }
}
