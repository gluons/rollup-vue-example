import Vue from 'vue/dist/vue'; // Use Vue UMD version on dev server.
import VueHelloRollup from '../src/index';

Vue.use(VueHelloRollup);

// eslint-disable-next-line no-new
new Vue({
	el: '#app',
	render: h => h('hello')
});
