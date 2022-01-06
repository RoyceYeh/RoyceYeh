import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap";

//  import ApolloClient from "apollo-client";
//  import { HttpLink } from "apollo-link-http";
//  import { InMemoryCache } from "apollo-cache-inmemory";

createApp(App).use(router).mount("#app");
