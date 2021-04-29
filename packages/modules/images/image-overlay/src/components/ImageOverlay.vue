<template>
    <div class="vm-image-overlay-container">
        <img :src="image" :alt="{ [alt]: !!alt }" class="vm-image-overlay-image">
        <div :class="overlayClasses" :style="{'background-color': backgroundOverlayColor, 'height': title ? titleHeight : undefined}">
            <slot name="default">
                <div class="text">Hello World</div>
            </slot>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component( { components: {} } )
export default class ImageOverlay extends Vue {
    /**
     * Props
     * **/

    @Prop( { default: true } ) fade: boolean;
    @Prop( { default: '' } ) slide: 'bottom' | 'top' | '';
    @Prop( { default: false } ) zoom: boolean;
    @Prop( { default: false } ) title: boolean;
    @Prop( { default: '80px' } ) titleHeight: string
    @Prop( { default: 'https://i.ytimg.com/vi/hXBU-wYE_l0/maxresdefault.jpg' } ) image: string;
    @Prop( {  } ) alt: string;
    @Prop( { default: '#000' } ) backgroundOverlayColor: string;

    overlayClasses: Record<string, boolean> = {
        'vm-image-overlay-overlay': true,
        'vm-image-overlay-fade': this.fade,
        'vm-image-overlay-slide-bottom': this.slide === 'bottom',
        'vm-image-overlay-slide-top': this.slide === 'top',
        'vm-image-overlay-zoom': this.zoom,
        'vm-image-overlay-title': this.title
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.vm-image-overlay-container{
    position: relative;
    width: 50%;

    .vm-image-overlay-image {
        display: block;
        width: 100%;
        height: auto;
    }

    .vm-image-overlay-overlay {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100%;
        width: 100%;
        overflow: hidden;
        opacity: 0;
        transition: .5s ease;
        &.vm-image-overlay-slide-bottom{
            height: 0;
            top: inherit;
            opacity: 1;
        }
        &.vm-image-overlay-slide-top{
            top: inherit;
            height: 0;
            bottom: 100%;
            opacity: 1;
        }
        &.vm-image-overlay-zoom{
            opacity: 1;
            -webkit-transform: scale(0);
            -ms-transform: scale(0);
            transform: scale(0);
            -webkit-transition: .3s ease;
            transition: .3s ease;

        }
        &.vm-image-overlay-title{
            top: inherit;
            left: inherit;
            right: inherit;
        }
    }



    .text {
        color: white;
        font-size: 20px;
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        text-align: center;
    }
}
.vm-image-overlay-container:hover .vm-image-overlay-overlay.vm-image-overlay- {
    &fade{
        opacity: 1;
    }
    &slide-bottom{
        height: 100%;
    }
    &slide-top{
        bottom: 0;
        height: 100%;
    }
    &zoom{
        -webkit-transform: scale(1);
        -ms-transform: scale(1);
        transform: scale(1);
    }
    &title{
        opacity: 1;
    }
}
</style>
