import { OverlayMenuProps } from '@/source/03-components/Menu/OverlayMenu/OverlayMenu';

const overlayMenuArgs = {
  items: [
    { title: 'Home', url: '#0', inActiveTrail: false },
    { title: 'About', url: '#0', inActiveTrail: false },
    { title: 'Resources', url: '#0', inActiveTrail: false },
    { title: 'Contact', url: '#0', inActiveTrail: false },
  ],
} satisfies OverlayMenuProps;

export default overlayMenuArgs;
