<template>
    <div id="app">
        <scroll-container scroll-height="300px" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ScrollContainer from '@/components/ScrollContainer.vue'

@Component( {
    components: {
        ScrollContainer
    }
} )
export default class App extends Vue {}
</script>

<style lang="scss"></style>
