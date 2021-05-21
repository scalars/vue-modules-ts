<template>
    <div class="container-square-icon" :style="cssProps">
        <slot name="default">
            <i :class="{ [icon]: !!icon, 'icon': true }">

            </i>
        </slot>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component( {} )
export default class IconButton extends Vue {
    /**
     * Main Color
     * */
    @Prop({ } ) color: string;
    /**
     * Icon props
     * */
    @Prop( { required: true } ) icon: string;
    @Prop( { } ) iconColor: string;
    @Prop( { } ) iconHoverColor: string;
    @Prop( { } ) iconSize:string;

    /**
     * Button props
     * */
    @Prop( { default: '40px' } ) buttonSize: string;
    @Prop( { } ) backgroundColor: string;
    @Prop( { } ) backgroundHoverColor: string;
    @Prop( { } ) borderColor: string;
    @Prop( { default: '3px' } ) borderSize: string;
    @Prop( { default: '6px' } ) borderRadius: string;

    increase_brightness (hex, percent) {
        if ( hex ) {
            // strip the leading # if it's there
            hex = hex.replace( /^\s*#|\s*$/g, '' );

            // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
            if(hex.length == 3) {
                hex = hex.replace( /(.)/g, '$1$1' );
            }

            const r = parseInt(hex.substr(0, 2), 16),
                g = parseInt(hex.substr(2, 2), 16),
                b = parseInt(hex.substr(4, 2), 16);

            return '#' +
                ((0|(1<<8) + r + (256 - r) * percent / 100).toString(16)).substr(1) +
                ((0|(1<<8) + g + (256 - g) * percent / 100).toString(16)).substr(1) +
                ((0|(1<<8) + b + (256 - b) * percent / 100).toString(16)).substr(1);
        }
    }

    get cssProps () {
        return {
            '--button-height': this.buttonSize,
            '--button-width': this.buttonSize,
            '--button-border-size': this.borderSize,
            '--button-border-radius': this.borderRadius,
            '--button-background-color': this.backgroundColor ? this.backgroundColor : this.increase_brightness( this.color, 95 ),
            '--button-background-hover-color': this.backgroundHoverColor ? this.backgroundHoverColor : this.increase_brightness( this.color, 10 ),
            '--button-border-color': this.borderColor ? this.borderColor : this.increase_brightness( this.color, 10 ),
            '--icon-color': this.iconColor ? this.iconColor : this.increase_brightness( this.color, 10 ),
            '--icon-color-hover': this.iconHoverColor ? this.iconHoverColor : this.increase_brightness( this.color, 95 ),
            '--icon-size': this.iconSize
        }
    }
}
</script>

<style lang="scss" scoped>
.container-square-icon{
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: var(--button-border-radius);
    border: var(--button-border-size) solid var(--button-border-color);
    background-color: var(--button-background-color);
    height: calc( var(--button-height) + 25px );
    width: calc( var(--button-height) + 25px );
    transition: 0.4s ease;
    .icon{
        font-size: var(--icon-size);
        color: var(--icon-color);
        transition: 0.4s ease;
    }
}
.container-square-icon:hover{
    background-color: var(--button-background-hover-color);
    .icon{
        color: var(--icon-color-hover)
    }
}
</style>