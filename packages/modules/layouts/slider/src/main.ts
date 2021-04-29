import Vue from 'vue';
import Slider from './components/Slider.vue';
import Vue2TouchEvents from 'vue2-touch-events';

Vue.config.productionTip = false;
Vue.use( Vue2TouchEvents );

new Vue( { render: ( h ) => h( Slider ) } ).$mount( '#app' );
