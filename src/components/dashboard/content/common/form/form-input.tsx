import { ComboboxStringData, TagsInput, TextInput } from '@mantine/core';
import { Control, Controller } from 'react-hook-form';

type FormInputProps = {
  name: string;
  label: string;
  description: string;
  placeholder: string;
  control: Control<any, any>;
  errorMessage: string | undefined;
} & (
  | {
      isTag: boolean;
      data: ComboboxStringData;
    }
  | {
      isTag?: never;
      data?: never;
    }
);

const FormInput = ({
  isTag,
  data,
  name,
  label,
  description,
  placeholder,
  control,
  errorMessage,
}: FormInputProps) => {
  if (isTag)
    return (
      <Controller
        defaultValue={[]}
        control={control}
        name={name}
        render={({ field }) => (
          <TagsInput
            {...field}
            data={data}
            withAsterisk
            label={label}
            description={description}
            placeholder={placeholder}
            error={errorMessage}
          />
        )}
      />
    );

  return (
    <Controller
      defaultValue=""
      control={control}
      name={name}
      render={({ field }) => (
        <TextInput
          {...field}
          withAsterisk
          label={label}
          description={description}
          placeholder={placeholder}
          error={errorMessage}
        />
      )}
    />
  );
};

export default FormInput;
