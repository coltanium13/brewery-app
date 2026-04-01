import { createApp, provide, h } from 'vue';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';
import App from './App.vue';
import router from './router';
import './style.css';

const apolloClient = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:4000',
  }),
  cache: new InMemoryCache(),
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

app.use(router);
app.mount('#app');
