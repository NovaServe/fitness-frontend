import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import helpers from '../../styles/Helpers.module.scss';
import GenericSelectInput from '../form/GenericSelectInput';
import GenericTextInput from '../form/GenericTextInput';
import styles from './GenericFilter.module.scss';

const GenericFilter = ({ inputs, onSubmit, onClear, onReset }) => {
  const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm();
  const [isVisible, setIsVisible] = useState(false);
  const handleClear = () => {
    reset();
    if (onClear) {
      onClear();
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    onReset();
    handleClear();
  };

  const handleFilterVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div className={styles.form_btn} onClick={handleFilterVisibility}>{isVisible ? 'Hide Filter' : 'Filter'}</div>
      {isVisible && (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles['form_upper']}>
            {inputs.map((inputProps, index) => {
              const {label, type, name, placeholder, options, isMultiple, rules} = inputProps;
              const Component = type === 'select' ? GenericSelectInput : GenericTextInput;

              return (
                <Component
                  key={index}
                  label={label}
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  options={options}
                  isMultiple={isMultiple}
                  rules={rules}
                  register={register}
                  error={errors[name]}
                  getValues={getValues}
                />
              );
            })}
          </div>
          <div className={styles['form_lower']}>
            <button className={`${styles.form_btn} ${helpers['mr-sm']}`} onClick={handleReset}>Reset</button>
            <button className={`${styles.form_btn} ${helpers['mr-sm']}`} type="button" onClick={handleClear}>Clear</button>
            <button className={styles.form_btn} type="submit">Submit</button>
          </div>

        </form>
      )}
    </>
  );
};

export default GenericFilter;
