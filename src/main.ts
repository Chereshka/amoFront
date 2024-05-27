import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'


import { fas } from '@fortawesome/free-solid-svg-icons'

import { dom, library } from "@fortawesome/fontawesome-svg-core";

const app = createApp(App);

dom.watch();

library.add(fas);


app.mount("#app");
