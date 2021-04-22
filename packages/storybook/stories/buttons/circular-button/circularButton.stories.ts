import CircularButton from '../../../../modules/buttons/circular-button/src/components/CircularButton.vue';

export default {
    title: 'buttons/CircularButton',    // Path to the component
    component: CircularButton,        // Main component
    subcomponents: {},
    argTypes: {
        size : {
            control: { type: 'range', min:0, max:100, step: 1 }
        },
        enum: {
            control: { type:'select', options: ['one','two','three'] }
        }
    }
}

const Template = (args, { argTypes }) => ({
    components: { CircularButton },
    props: Object.keys(argTypes),
    template:`<circular-button v-bind="$props" />`,
});


export const Primary = Template.bind( {} );
