import UserWidget from '../../../../modules/widget/user-widget/src/components/UserWidget.vue';
import defaultProps from "../../../../modules/widget/user-widget/src/components/utils/defaults";

export default {
    title: 'widget/UserWidget',    // Path to the component
    component: UserWidget,        // Main component
    subcomponents: {},
    argTypes: {}
}

const Template = (args, { argTypes }) => ({
components: { UserWidget },
props: Object.keys(argTypes),
template:`<user-widget v-bind="$props" />`,
});

export const Primary = Template.bind( {} );
Primary.args = {
...defaultProps
}