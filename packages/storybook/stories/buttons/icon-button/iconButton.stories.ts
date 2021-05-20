import IconButton from '../../../../modules/buttons/icon-button/src/components/IconButton.vue';
import defaultProps from "../../../../modules/buttons/icon-button/src/components/utils/defaults";

export default {
    title: 'buttons/IconButton',    // Path to the component
    component: IconButton,        // Main component
    subcomponents: {},
    argTypes: {}
}

const Template = (args, { argTypes }) => ({
    components: { IconButton },
    props: Object.keys(argTypes),
    template:`<icon-button v-bind="$props" />`,
});

export const Primary = Template.bind( {} );
Primary.args = {
...defaultProps
}