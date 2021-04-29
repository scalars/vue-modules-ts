<template>
    <div
        v-touch:swipe="onSwipe"
        :class="{'vm-slider-container': true }"
        :style="{ width: this.width, height: this.height }"
    >
        <div
            v-for="(item, index) of items"
            :key="index"
            class="vm-slider-slide"
            :style="{
                backgroundImage: `url(${item.image})`,
                left: `calc( -100% * (${active}) )`
            }"
        >
            <div
                v-if="hasContent(item)"
                :class="{ 'vm-slider-content': true, [classContent]: !!classContent }">
                <div
                    v-if="item.title"
                    :class="{ 'vm-slider-title': true, [classTitle]: !!classTitle }">
                    {{item.title}}
                </div>
                <div
                    v-if="item.text"
                    :class="{ 'vm-slider-text': true, [classText]: !!classText }">
                    {{item.text}}
                </div>
                <a
                    v-if="item.link"
                    :class="{ 'vm-slider-link': true, [classLink]: !!classLink }"
                    :href="item.link.url"> {{item.link.text}}
                </a>
            </div>
        </div>
        <div
            class="vm-slider-left-icon"
            @click="setActive(active - 1)">
            <slot name="left-icon">
                &lt;
            </slot>
        </div>
        <div
            class="vm-slider-right-icon"
            @click="setActive(active + 1)">
            <slot name="right-icon">
                &gt;
            </slot>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Item, Directions } from './interfaces';

@Component( { components: {} } )
export default class Slider extends Vue {
    /**
     * Required props
     * **/

    @Prop( { type: Object, required: true } ) items: Item[];

    /**
     * Props
     * **/
    @Prop( { default: '100%' } ) width: string;
    @Prop( { default: '500px' } ) height: string;
    @Prop( { } ) classContent: string;
    @Prop( { } ) classTitle: string;
    @Prop( { } ) classText: string;
    @Prop( { } ) classLink: string;

    /**
     * Private props
     * **/
    private active:number = 0;

    /**
     * Methods
     * **/

    onSwipe( direction: Directions ): void {
        this.setActive( this.active + Directions[`${direction}`] );
    }

    setActive( index: number ): void {
        if ( index < 0 ) {
            this.active = this.items.length - 1;
        } else if ( index >= this.items.length ) {
            this.active = 0;
        } else {
            this.active = index;
        }
    }

    hasContent( item: Item ): boolean {
        return !!( item.title || item.text || item.link );
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.vm-slider-container {
    display: flex;
    overflow: hidden;
    position: relative;
}
.vm-slider-left-icon, .vm-slider-right-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    padding: 10px;
    z-index: 1;
    color: #fff;
    cursor: pointer;
}

.vm-slider-left-icon {
    left: 0;
}

.vm-slider-right-icon {
    right: 0;
}

.vm-slider-slide {
    width: 100%;
    height: 100%;
    min-width: 100%;
    flex: 1 1 auto;
    background-size: cover;
    background-position: center;
    position: relative;
    transition: left 200ms ease-in-out;

    .vm-slider-content {
        display: block;
        width:100%;
        max-width: 500px;
        max-height: 100%;
        padding: 20px;
        position: absolute;
        flex-direction: column;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;

        .vm-slider-title {
            font-size: 1.3em;
            font-weight: bold;
        }

        .vm-slider-link {
            display: inline-block;
            width: auto;
            padding: 10px 15px;
            background-color: var(--primary, teal);
            color: #fff;
            text-decoration: none;
            margin-top: 10px;
            align-self: flex-end;
        }
    }
}
</style>
