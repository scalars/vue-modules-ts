<template>
    <div
        ref="scroll"
        class="vm-scroll-container-container"
        :style="{ height: this.scrollHeight }"
        v-on:scroll="scrollHandler"
    >
        <slot name="default">
            <p
                v-for="i in 40"
                :key="i">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus amet consequatur deserunt dolorum enim error ex, excepturi inventore libero maiores minus quia repellendus temporibus? Et eveniet facere laboriosam quisquam voluptatem.
            </p>
        </slot>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';

@Component( { components: {} } )
export default class ScrollContainer extends Vue {
    /**
     * Props
     * **/

    @Prop( { default: 200 } ) scrollEventBefore: number;
    @Prop( { default: false } ) disableEvent: boolean;

    /**
     * Required props
     * ***/

    @Prop( { required: true, default: '300px' } ) scrollHeight: string;

    /**
     * Private props
     * **/

    private scrollReference: Element;

    /**
     * Methods
     * **/

    mounted ( ):void {
        this.scrollReference = this.$refs.scroll as Element;
    }

    get reference(): Element {
        return this.scrollReference;
    }

    private isEndOfScroll ( scrollHeight: number, scrollPos: number, pixelsFromBottom: number ):void {
        if ( ( scrollHeight - scrollPos ) <= pixelsFromBottom ) {
            if ( this.disableEvent ) {
                this.endScroll();
            }
        }
    }

    private scrollHandler ():void {
        const scrollHeight = this.scrollReference.scrollHeight;
        const scrollPosition = this.scrollReference.scrollTop + this.scrollReference.clientHeight;
        this.isEndOfScroll( scrollHeight, scrollPosition, this.scrollEventBefore );
    }

    /**
     * Events
     * ***/

    @Emit()
    endScroll ():boolean {
        return true;
    }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.vm-scroll-container-container{
    overflow: auto;
}
</style>
