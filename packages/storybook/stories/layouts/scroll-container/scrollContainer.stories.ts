import ScrollContainer from '../../../../modules/layouts/scroll-container/src/components/ScrollContainer.vue';

export default {
    title: 'layouts/ScrollContainer',    // Path to the component
    component: ScrollContainer,        // Main component
    subcomponents: {},
    argTypes: {}
}

const Template = (args, { argTypes }) => ({
    components: { ScrollContainer },
    props: Object.keys(argTypes),
    template:`<scroll-container v-bind="$props" />`,
});

export const Primary = Template.bind( {} );