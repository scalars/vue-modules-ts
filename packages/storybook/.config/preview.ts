import MadrovTheme from './MadrovTheme';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  docs: {
    theme: MadrovTheme,
  },
  layout: 'centered',
  controls: {
    matchers: {
      color: /(C|color)$/i,
      date: /Date$/,
    },
  },
}