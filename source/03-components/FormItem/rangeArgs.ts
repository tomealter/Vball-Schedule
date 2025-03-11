import { InputProps } from '@/source/03-components/FormItem/FormItem';

const rangeArgs = {
  id: 'range',
  label: 'Range',
  type: 'range',
  step: 1,
  min: 0,
  max: 100,
} satisfies InputProps;

export default rangeArgs;
