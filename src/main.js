// import { createApp } from "vue";
// import App from "./App.vue";
// import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

// import { ApolloClient } from "apollo-client";
// import { createHttpLink } from "apollo-link-http";
// import { InMemoryCache } from "apollo-cache-inmemory";

// import Vue from "vue";
// import VueApollo from "vue-apollo";

// Vue.use(VueApollo);

// 與 API 的 HTTP 連接
// const httpLink = createHttpLink({
// 	uri: "http://localhost:3020/graphql",
// });

// 暫存
// const cache = new InMemoryCache();

// const apolloClient = new ApolloClient({
// 	link: httpLink,
// 	cache,
// });

// const apolloProvider = new VueApollo({
// 	defaultClient: apolloClient,
// });

//  import ApolloClient from "apollo-client";
//  import { HttpLink } from "apollo-link-http";
//  import { InMemoryCache } from "apollo-cache-inmemory";

//createApp(App).use(apolloProvider.provider).mount("#app");
//createApp(App).use(router).mount("#app");

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import AuthPlugin from "./plugins/auth";

import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import VueApollo from "vue-apollo";
Vue.use(AuthPlugin);
Vue.use(VueApollo);
Vue.config.productionTip = false;
const getHeaders = () => {
	const headers = {};
	const token = window.localStorage.getItem("apollo-token");
	if (token) {
		headers.authorization = `Bearer ${token}`;
	}
	return headers;
};

// Create an http link:
const link = new HttpLink({
	uri: "http://35.189.161.175:8080/v1/graphql",
	fetch,
	headers: getHeaders(),
});

const client = new ApolloClient({
	link: link,
	cache: new InMemoryCache({
		addTypename: true,
	}),
});
const apolloProvider = new VueApollo({
	defaultClient: client,
});

const app = Vue.createApp({
	router,
	apolloProvider,
	render: (h) => h(App),
});
new Vue({
	router,
	apolloProvider,
	render: (h) => h(App),
}).$mount("#app");
