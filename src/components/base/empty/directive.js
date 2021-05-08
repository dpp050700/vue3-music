import Empty from "./empty.vue";

import createLoadingDirective from "@/common/directives/create-loading-empty-directive";

const emptyDirective = createLoadingDirective(Empty);

export default emptyDirective;
