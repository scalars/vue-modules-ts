<template>
    <div
        class="vm-cropper-container"
        :style="cssProps"
    >
        <input
            ref="input"
            type="file"
            name="image"
            accept="image/*"
            @change="imageInputParser"
        >
        <slot name="header" />
        <slot name="content">
            <div class="vm-cropper">
                <transition name="fade">
                    <vue-cropper
                        v-show="imageSource"
                        ref="cropper"
                        :class="{'cropper': true, 'circle': circle}"
                        :guides="false"
                        :center="false"
                        :highlight="false"
                        :background="false"
                        :container-style="resetStyles"
                        :aspect-ratio="1"
                        :view-mode="1"
                        :src="imageSource"
                    />
                </transition>
                <div
                    v-show="!imageSource"
                    class="vm-cropper-chose-an-image"
                >
                    <button
                        class="vm-cropper-container-button"
                        @click="imageChooser"
                    >
                        {{ noImageLabel }}
                    </button>
                </div>
            </div >
        </slot>
        <slot name="actions">
            <transition name="fade">
                <div v-show="imageSource">
                    <div class="vm-cropper-container-actions">
                        <button
                            class="vm-cropper-container-button"
                            @click="imageChooser"
                        >
                            {{ changeImage }}
                        </button>
                        <button
                            class="vm-cropper-container-button"
                            @click="imageSaver"
                        >
                            {{ saveLabel }}
                        </button>
                    </div>
                </div>
            </transition>
        </slot>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

@Component( { components: { VueCropper } } )
export default class Cropper extends Vue {
    /**
     * Props
     * **/
    @Prop( { } ) image: Blob
    @Prop( { default: true } ) circle: boolean;
    @Prop( { default: '#823deb' } ) color: string;
    @Prop( { } ) cropperWidth: string;
    @Prop( { } ) cropperHeight: string;
    @Prop( { default: 'Change image' } ) changeImage: string;
    @Prop( { default: 'Save' } ) saveLabel: string;
    @Prop( { default: 'Please select an image' } ) noImageLabel: string;
    @Prop( { default: 350 } ) exportSize: number;

    /**
     * Private variables
     * **/
    private resetStyles: { height: string, width: string } = { height: 'inherit', width: 'inherit' }

    private cropperImage: Blob;


    /**
     * Private Methods
     * **/
    private get imageSource (): Blob {
        return this.cropperImage ? this.cropperImage : this.image;
    }

    private set imageSource ( newValue: Blob ) {
        this.cropperImage = newValue;
    }

    @Watch( 'image' )
    private externalImageHandler( old: unknown, newValue: string ): void {
        this.imageSource = ( newValue || old ) as Blob;
    }

    private get cssProps () {
        return {
            '--color-hex': this.color,
            '--cropper-height': this.cropperHeight,
            '--cropper-width': this.cropperWidth,
        };
    }

    private imageInputParser ( input: { target: { files: FileList } } | null ):void {
        if ( input ) {
            const file = input.target.files[0] || this.imageSource;
            const reader = new FileReader();
            if ( file ) {
                reader.readAsDataURL( file );
                reader.onload = ( event ) => {
                    if ( event.target ) {
                        this.imageSource = event.target.result as Blob;
                        ( this.$refs.cropper as any ).replace( this.imageSource );
                    } else {
                        console.log( event );
                    }
                };
            }
        }
    }

    /**
    * Public Methods
    * **/

    imageSaver (): void {
        // we cant use decorator @Emit because storybook can't recognize it
        this.$emit( 'save-image',
            ( this.$refs.cropper as any ).getCroppedCanvas( {
                width: this.exportSize,
                height: this.exportSize,
                imageSmoothingQuality: 'high'
            } ).toDataURL()
        );
    }

    imageChooser () {
        ( this.$refs.input as HTMLInputElement ).click();
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
input{
    display: none;
}
.vm-cropper-container{
    /* Wrapper cropper */
    height: var(--cropper-height);
    width: var(--cropper-width);
    .vm-cropper-chose-an-image{
        display: flex;
        justify-content: center;
        align-items: center;
        height: var(--cropper-height);
        width: var(--cropper-width);
    }
    /* Button styles */
    &-button{
        padding: 8px;
        margin: 2px;
        border-radius: 4px;
        color: var(--color-hex);
        border: var(--color-hex) solid 1px;
        background-color: white;
        text-align: center;
        text-decoration: none;
        transition-duration: 0.4s;
        cursor: pointer;
    }
    &-button:hover{
        color: white;
        background-color: var(--color-hex);
    }
    &-button:focus{
        outline: none;
    }
    &-actions{
        display: flex;
        justify-content: flex-end;
    }
    /* inner styles of cropper */
    ::v-deep.cropper{
        .cropper-container > .cropper-crop-box > .cropper-view-box {
            outline: var(--color-hex) solid 1px;
        }
        .cropper-container .cropper-crop-box{
            .cropper-point{
                background-color: var(--color-hex);
            }
            .cropper-line{
                background-color: var(--color-hex);
            }
        }
    }
    ::v-deep.cropper.circle{
        .cropper-container > .cropper-crop-box > .cropper-view-box {
            border-radius: 50%;
        }
    }
}
/* Transition */
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>
