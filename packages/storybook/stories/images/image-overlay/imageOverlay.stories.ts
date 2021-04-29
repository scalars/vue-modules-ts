import ImageOverlay from '../../../../modules/images/image-overlay/src/components/ImageOverlay.vue';
import defaultProps from "../../../../modules/images/image-overlay/src/components/utils/defaults";

export default {
    title: 'images/ImageOverlay',    // Path to the component
    component: ImageOverlay,        // Main component
    subcomponents: {},
    argTypes: {
        slide: {
            control: { type:'select', options: ['bottom','top'] }
        }
    }
}

const Template = (args, { argTypes }) => ({
components: { ImageOverlay },
props: Object.keys(argTypes),
template:`<image-overlay v-bind="$props" />`,
});

export const Primary = Template.bind( {} );
Primary.args = {
...defaultProps
}
