<template>
    <div id="app">
        <user-widget>
            <template #avatar>
                holo
            </template>
            <template #userName>
                userDefault
            </template>
            <template #description>
                cargodeafult
            </template>
            <template #actions>
                <button>
                    holo
                </button>
            </template>
            <!--            <template #button>-->
            <!--                <img src="https://pm1.narvii.com/6454/b43887c5b8ea480a5109fc12f07e293acb29543c_hq.jpg">-->
            <!--            </template>-->
        </user-widget>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UserWidget from '@/components/UserWidget.vue';

@Component( { components:{ UserWidget } } )
export default class App extends Vue {}
</script>

<style lang="scss"></style>
