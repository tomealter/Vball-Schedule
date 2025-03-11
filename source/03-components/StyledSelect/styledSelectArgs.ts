import DropdownOption from '@/source/03-components/StyledSelect/DropdownOption';
import { Props } from 'react-select';

const styledSelectArgs = {
  options: [
    { value: 'one', label: 'Option One' },
    { value: 'two', label: 'Option Two' },
    { value: 'three', label: 'Option Three' },
    { value: 'four', label: 'Option Four' },
    { value: 'five', label: 'Option Five' },
    { value: 'six', label: 'Disabled Option', isDisabled: true },
  ],
  isMulti: true,
  isSearchable: true,
} satisfies Props<DropdownOption>;

export default styledSelectArgs;
