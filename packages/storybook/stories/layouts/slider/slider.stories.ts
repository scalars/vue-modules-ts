import Slider from '../../../../modules/layouts/slider/src/components/Slider.vue';
import defaultProps from "../../../../modules/layouts/slider/src/utils/defaults";

export default {
    title: 'layouts/Slider',    // Path to the component
    component: Slider,        // Main component
    subcomponents: {},
    argTypes: {}
}

const Template = (args, { argTypes }) => ({
components: { Slider },
props: Object.keys(argTypes),
template:`<slider v-bind="$props" />`,
});

export const Primary = Template.bind( {} );
Primary.args = {
    ...defaultProps
}
