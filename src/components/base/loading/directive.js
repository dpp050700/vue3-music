import Loading from "./loading.vue";

import createLoadingDirective from "@/common/directives/create-loading-empty-directive";

const loadingDirective = createLoadingDirective(Loading);

export default loadingDirective;
