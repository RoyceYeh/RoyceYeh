//import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import Vue from "vue";
import VueApollo from "vue-apollo";
Vue.use(VueApollo);
// 与 API 的 HTTP 连接
const httpLink = createHttpLink({
	// 你需要在这里使用绝对路径
	uri: "http://35.189.161.175:8080/v1/graphql",
});

// 缓存实现
const cache = new InMemoryCache();

// 创建 apollo 客户端
const apolloClient = new ApolloClient({
	link: httpLink,
	cache,
});

const apolloProvider = new VueApollo({
	defaultClient: apolloClient,
});

new Vue({
	router,
	apolloProvider,
	render: (h) => h(App),
}).$mount("#app");
