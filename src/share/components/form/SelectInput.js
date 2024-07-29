import React from 'react';
import ValidationMessage from './ValidationMessage';
import styles from './GenericForm.module.scss';

const SelectInput = ({ label, name, options, register, rules, error }) => (
  <div className={styles.form_group}>
    <label className={styles.form_label} htmlFor={name}>{label}</label>
    <select id={name} {...register(name, rules)} className={styles.form_input}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <ValidationMessage message={error.message} />}
  </div>
);

export default SelectInput;
