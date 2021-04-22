import CircularButton from '../../../../modules/buttons/circular-button/src/components/CircularButton.vue';

export default {
title: 'buttons/CircularButton',    // Path to the component
component: CircularButton,        // Main component
}

const Template = (args, { argTypes }) => ({
    components: { CircularButton },
    props: Object.keys(argTypes),
    template:`<circular-button v-bind="$props" />`,
});

export const basic = Template.bind( {} );
basic.arg = {
    size: String,
    backgroundColor: 'string',
    backgroundHover: 'string',
    borderSize: 'string',
    borderColor: '#fff',
    color: '#434343',
    colorHover: '#ff00ff'
}
