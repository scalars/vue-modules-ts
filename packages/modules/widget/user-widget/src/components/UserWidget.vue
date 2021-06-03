<template>
    <div class="vm-user-widget-container">
        <slot name="avatar" >

        </slot>
        <img :src="picture" class="vm-user-widget-user-image">
        <div v-if="username || label" class="vm-user-widget-user-info">
            <span v-if="username" class="vm-user-widget-username" @click="$emit('usernameAction')">{{ username }}</span>
            <span
                v-if="label"
                :style="{fontSize: sizeLabel, color: colorLabel, fontWeight: weightLabel}"
                class="vm-user-widget-label"
                @click="$emit('labelAction')"
            >
                {{ label }}
            </span>
            <span v-if="extra" class="vm-user-widget-extra" :style="{color: colorExtra, textDecoration: decorationExtra }">{{ extra }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import Avatar from './utils/Avatar.vue'

@Component( { components: { Avatar } } )
export default class UserWidget extends Vue {
    @Prop( { default: 'https://pm1.narvii.com/6454/b43887c5b8ea480a5109fc12f07e293acb29543c_hq.jpg' } ) picture: string;
    @Prop( { default: '30px' } ) pictureSize: string;
    @Prop( {} ) username: string;
    @Prop( {} ) label: string;
    @Prop( {} ) extra: string;
    @Prop( { default: '#888' } ) colorExtra: string;
    @Prop( { default: '#none' } ) decorationExtra: string;
    @Prop( { default: '0.85em' } ) sizeLabel: string;
    @Prop( { default: '#35C3D0' } ) colorLabel: string;
    @Prop( { default: 'normal' } ) weightLabel: string;
    @Prop( { default: true } ) withDefaultImage: boolean;

    @Emit( 'avatar-click' )
    avatarClick() {
        return
    }
}
</script>
<style scoped lang="scss">
.vm-user-widget- {
    &container{
        display: flex;
        align-items: center;
        width: auto;
    }

    &user-image{
        display: block;
        width: 20%;
        height: auto;
        padding-right: 1%;
    }

    &user-info {
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
}
</style>


