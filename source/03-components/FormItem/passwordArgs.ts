import { InputProps } from '@/source/03-components/FormItem/FormItem';

const passwordArgs = {
  id: 'password',
  label: 'Password',
  type: 'password',
  size: 60,
  maxLength: 128,
} satisfies InputProps;

export default passwordArgs;
