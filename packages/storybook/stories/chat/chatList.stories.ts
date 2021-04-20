import ChatList from '../../../modules/chat/chat-list/src/ChatList.vue';

export default {
    title: 'chat/chat-list',    // Path to the component
    component: ChatList,        // Main component
    decorators: [],
    parameters: {}
}

export const basic = () => ({
    components: { ChatList },
    template: '<chat-list  chat-list="[]"/>'
});