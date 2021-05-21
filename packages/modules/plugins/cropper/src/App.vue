<template>
    <div id="app">
        <!-- import here your component -->
        <cropper />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Cropper from '@/components/Cropper.vue';

@Component( {
    components:{
        Cropper
    }
} )
export default class App extends Vue {}
</script>

<style lang="scss"></style>
