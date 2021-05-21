import Cropper from '../../../../modules/plugins/cropper/src/components/Cropper.vue';
import defaultProps from "../../../../modules/plugins/cropper/src/components/utils/defaults";

export default {
    title: 'plugins/Cropper',    // Path to the component
    component: Cropper,        // Main component
    subcomponents: {},
    argTypes: {}
}

const Template = (args, { argTypes }) => ({
components: { Cropper },
props: Object.keys(argTypes),
template:`<cropper v-bind="$props" />`,
});

export const Primary = Template.bind( {} );
Primary.args = {
...defaultProps
}