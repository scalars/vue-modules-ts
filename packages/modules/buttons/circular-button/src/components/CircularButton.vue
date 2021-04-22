<template>
    <div class="vm-circular-button-container">
        <custom-button
            :size="size"
            :background-color="backgroundColor"
            :background-hover="backgroundHoverColor"
            :border-size="borderSize"
            :border-color="borderColor"
            :color="color"
            :color-hover="hoverColor"
            @click="Click"
        >
            <div class="content">
                <slot />

            </div>
        </custom-button>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import CustomButton from './CustomButton'

@Component( {
    components: {
        CustomButton
    }
} )
export default class CircularButton extends Vue {
    @Prop( { default: 50 } ) size: number;
    @Prop( { default: 1 } ) borderSize: number;
    @Prop( { default: '#ffffff' } ) backgroundColor: string;
    @Prop( { default: '#ffff00' } ) backgroundHoverColor: string;
    @Prop( { default: '#000000' } ) borderColor: string;
    @Prop( { default: '#000000' } ) color: string;
    @Prop( { default: '#ffffff' } ) hoverColor: string;
    @Prop( { default: false } ) disabled: boolean;
    @Prop( { default: 'one' } ) enum: 'one' | 'two' | 'three';

    @Emit()
    Click() { }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
