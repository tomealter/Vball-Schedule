import { BreadcrumbProps } from '@/source/03-components/Breadcrumb/Breadcrumb';

const breadcrumbArgs = {
  title: 'Breadcrumb',
  breadcrumb: [
    { url: '#0', text: 'Home' },
    { url: '#1', text: 'Level 1' },
    { url: '#2', text: 'Level 2' },
    { text: 'Current item' },
  ],
  titleElement: 'h2',
  hideTitle: true,
} satisfies BreadcrumbProps;

export default breadcrumbArgs;
