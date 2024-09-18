import React from 'react';
import ValidationMessage from './ValidationMessage';
import styles from './GenericForm.module.scss';

const GenericTextInput = ({ label, type, name, placeholder, register, rules, error }) => (
  <div className={styles.form_group}>
    <label className={styles.form_label} htmlFor={name}>{label}</label>
    <input className={styles.form_input}
      type={type}
      id={name} 
      placeholder={placeholder}
      {...register(name, rules)}
    />
    {error && <ValidationMessage message={error.message} />}
  </div>
);

export default GenericTextInput;
