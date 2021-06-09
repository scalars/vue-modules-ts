<template>
    <div
        :style="cssStyles"
        class="vm-user-widget-container">
        <div
            class="vm-user-widget-user-image"
            @click="$emit( 'image-action')"
        >
            <slot name="avatarSlot">
                <img
                    class="vm-user-widget-user-image"
                    :src="avatar"
                    alt="">
            </slot>
        </div>
        <div class="vm-user-widget-user-info" >
            <span
                :style="{fontSize: usernameSizeLabel, color: usernameLabelColor, usernameFontWeight: weightLabel}"
                class="vm-user-widget-username"
                @click="$emit('username-action')"
            >
                <slot name="usernameSlot">
                    <div v-if="username">
                        {{ username }}
                    </div>
                </slot>
            </span>
            <span
                :style="{fontSize: sizeLabel, color: labelColor, fontWeight: weightLabel}"
                class="vm-user-widget-label"
                @click="$emit('label-action')"
            >
                <slot name="descriptionSlot">
                    <div v-if="label">
                        {{ label }}
                    </div>
                </slot>
            </span>
            <span
                class="vm-user-widget-extra"
                :style="{color: extraColor, textDecoration: decorationExtra }"
            >
                <slot name="extraInfoSlot">
                    <div v-if="extra" >
                        {{ extra }}
                    </div>
                </slot>
            </span>
        </div>
        <div class="vm-user-widget-user-button">
            <slot name="actionsSlot" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component( {} )
export default class UserWidget extends Vue {
    @Prop() avatar: string;
    @Prop( { default: '50px' } ) avatarSize: string;
    @Prop( {} ) username: string;
    @Prop( {} ) label: string;
    @Prop( {} ) extra: string;
    @Prop( { default: '#888' } ) extraColor: string;
    @Prop( { default: '#none' } ) decorationExtra: string;
    @Prop( { default: '0.85em' } ) sizeLabel: string;
    @Prop( { default: '#35C3D0' } ) labelColor: string;
    @Prop( { default: 'normal' } ) weightLabel: string;
    @Prop( { default: '1em' } ) usernameSizeLabel: string;
    @Prop( { default: '#35C3D0' } ) usernameLabelColor: string;
    @Prop( { default: 'normal' } ) usernameWeightLabel: string;
    @Prop( { default: true } ) withDefaultImage: boolean;

    private get cssStyles(){
        return{
            '--avatar-height': this.avatarSize,
            '--avatar-width': this.avatarSize,
        };
    }
}
</script>
<style scoped lang="scss">
.vm-user-widget- {
    &container{
        display: flex;
        align-items: center;
        width: auto;
        flex-direction: row;
    }

    &user-image{
        display: block;
        width: var(--avatar-width);
        height: var(--avatar-height);
    }

    &user-info {
        margin-left: 0.7rem;
        display: flex;
        flex-direction: column;
    }

    &username {
        cursor: pointer;
    }

    &label {
        font-size: 0.85em;
    }

    &extra {
        font-size: 0.6em;
    }

    &user-button{
        margin-left: auto;
    }
}
</style>


