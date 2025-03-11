import { SelectProps } from '@/source/03-components/FormItem/FormItem';

const selectArgs = {
  label: 'Select',
  id: 'select',
  children: (
    <>
      <option>Option One</option>
      <option>Option Two</option>
      <option>Option Three</option>
      <option>Option Four</option>
      <option>Option Five</option>
      <option disabled>Disabled Option</option>
    </>
  ),
} satisfies SelectProps;

export default selectArgs;
