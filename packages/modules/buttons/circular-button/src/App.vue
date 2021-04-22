<template>
    <div id="app">
        <circular-button> hola </circular-button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CircularButton from '@/components/CircularButton.vue'

@Component( {
    components: {
        CircularButton
    }
} )
export default class App extends Vue {}
</script>

<style lang="scss"></style>
