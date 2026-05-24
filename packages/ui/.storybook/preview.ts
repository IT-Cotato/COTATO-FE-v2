import type {Preview} from '@storybook/react';
import {cotatoTheme} from './theme';
import './preview.css';

const preview: Preview = {
  parameters: {
    docs: {
      theme: cotatoTheme,
    },
    backgrounds: {
      default: 'white',
      values: [
        {name: 'white', value: '#ffffff'},
        {name: 'neutral-50', value: '#f5f5f5'},
        {name: 'neutral-800', value: '#2a2a2a'},
        {name: 'dark', value: '#1f1f1f'},
      ],
    },
    viewport: {
      viewports: {
        mobile: {name: 'Mobile', styles: {width: '375px', height: '812px'}},
        tablet: {name: 'Tablet', styles: {width: '768px', height: '1024px'}},
        desktop: {name: 'Desktop', styles: {width: '1280px', height: '900px'}},
      },
      defaultViewport: 'desktop',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
  },
};

export default preview;
