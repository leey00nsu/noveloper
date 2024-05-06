import {
  ComboboxStringData,
  TagsInput,
  TagsInputProps,
  TextInput,
  TextInputProps,
  Textarea,
  TextareaProps,
} from '@mantine/core';
import { Control, Controller } from 'react-hook-form';

type FormInputProps = {
  name: string;
  control: Control<any, any>;
  errorMessage: string | undefined;
  isTextarea?: boolean;
} & (
  | {
      isTag: boolean;
      data: ComboboxStringData;
    }
  | {
      isTag?: never;
      data?: never;
    }
) &
  TagsInputProps &
  TextInputProps &
  TextareaProps;

const FormTagsInput = ({
  data,
  name,
  label,
  description,
  placeholder,
  control,
  errorMessage,
  ...props
}: FormInputProps) => {
  return (
    <Controller
      defaultValue={[]}
      control={control}
      name={name}
      render={({ field }) => (
        <TagsInput
          {...field}
          {...props}
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
};

const FormTextInput = ({
  name,
  label,
  description,
  placeholder,
  control,
  errorMessage,
  ...props
}: FormInputProps) => {
  return (
    <Controller
      defaultValue=""
      control={control}
      name={name}
      render={({ field }) => (
        <TextInput
          {...field}
          {...props}
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

const FormTextareaInput = ({
  name,
  label,
  description,
  placeholder,
  control,
  errorMessage,
  ...props
}: FormInputProps) => {
  return (
    <Controller
      defaultValue=""
      control={control}
      name={name}
      render={({ field }) => (
        <Textarea
          {...field}
          {...props}
          withAsterisk
          label={label}
          description={description}
          placeholder={placeholder}
          error={errorMessage}
          autosize
        />
      )}
    />
  );
};

const FormInput = ({ isTag, isTextarea, data, ...props }: FormInputProps) => {
  if (isTag) {
    return <FormTagsInput isTag={isTag} data={data} {...props} />;
  }

  if (isTextarea) {
    return <FormTextareaInput {...props} />;
  }

  return <FormTextInput {...props} />;
};

export default FormInput;
