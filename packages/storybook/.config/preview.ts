import { themes } from '@storybook/theming';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  docs: {
    theme: themes.dark,
  },
  layout: 'centered',
  controls: {
    matchers: {
      color: /(C|color)$/i,
      date: /Date$/,
    },
  },
}