import { TextInput, TextInputProps } from '@mantine/core';
import { FaSearch } from 'react-icons/fa';

interface SearchInputProps extends TextInputProps {
  placeholder?: string;
  children?: React.ReactNode;
}

const SearchInput = ({ placeholder, ...props }: SearchInputProps) => {
  return (
    <TextInput
      leftSection={<FaSearch />}
      placeholder={placeholder}
      className="grow"
      {...props}
    />
  );
};

export default SearchInput;
