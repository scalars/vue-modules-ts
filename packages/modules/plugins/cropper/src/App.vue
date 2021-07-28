<template>
    <div id="app">
        <!-- import here your component -->
        <cropper
            @save-image="logger"
        />
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
export default class App extends Vue {
    logger( file ){
        console.log( file );
    }
}
</script>

<style lang="scss"></style>
