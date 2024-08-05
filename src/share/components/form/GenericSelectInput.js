import React from 'react';
import ValidationMessage from './ValidationMessage';
import styles from './GenericForm.module.scss';

const GenericSelectInput = ({ label, name, options, isMultiple, register, rules, error }) => (
  <div className={styles.form_group}>
    <label className={styles.form_label} htmlFor={name}>{label}</label>
    <select id={name} {...register(name, rules)} className={styles.form_input} multiple={isMultiple}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <ValidationMessage message={error.message} />}
  </div>
);

export default GenericSelectInput;
