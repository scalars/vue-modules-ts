<template>
  <div class="vm-circular-button-container">
    <custom-button
        :size="size"
        :background-color="backgroundColor"
        :background-hover="backgroundHover"
        :border-size="borderSize"
        :border-color="borderColor"
        :color="color"
        :color-hover="colorHover"
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
    @Prop( { default: '50px' } ) size: string;
    @Prop( { default: '#fff' } ) backgroundColor: string;
    @Prop( { default: '#ff0' } ) backgroundHover: string;
    @Prop( { default: '1px' } ) borderSize: string;
    @Prop( { default: 'black' } ) borderColor: string;
    @Prop( { default: 'black' } ) color: string;
    @Prop( { default: '#fff' } ) colorHover: string;

    @Emit()
    Click() { }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
