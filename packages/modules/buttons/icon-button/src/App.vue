<template>
    <div id="app">
        <!-- import here your component -->
        <icon-button icon="mdi mdi-home" color="#e01d1d" icon-size="50px"/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import IconButton from '@/components/IconButton.vue';

@Component( {
    components:{
        IconButton
    }
} )
export default class App extends Vue {}
</script>

<style lang="scss">
@import url( 'https://cdn.materialdesignicons.com/5.4.55/css/materialdesignicons.min.css' );
</style>
