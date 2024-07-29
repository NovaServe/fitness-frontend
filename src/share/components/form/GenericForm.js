import React from 'react';
import { useForm } from 'react-hook-form';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import styles from './GenericForm.module.scss';
import helpers from '../../styles/Helpers.module.scss';

const GenericForm = ({ inputs, onSubmit, onClear }) => {
  const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm();

  const handleClear = () => {
    reset();
    if (onClear) {
      onClear();
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {inputs.map((inputProps, index) => {
        const { label, type, name, options, rules } = inputProps;
        const Component = type === 'select' ? SelectInput : TextInput;

        return (
          <Component
            key={index}
            label={label}
            type={type}
            name={name}
            options={options}
            rules={rules}
            register={register}
            error={errors[name]}
            getValues={getValues}
          />
        );
      })}
      <button className={`${styles.form_btn} ${helpers['mr-sm']}`} type="button" onClick={handleClear}>Clear</button>
      <button className={styles.form_btn} type="submit">Submit</button>
    </form>
  );
};

export default GenericForm;
