<template>
    <div id="app">
        <user-widget>
            <template #avatarSlot>
                holo
            </template>
            <template #usernameSlot>
                userDefault
            </template>
            <template #descriptionSlot>
                cargodeafult
            </template>
            <template #actionsSlot>
                <button>
                    holo
                </button>
            </template>
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
