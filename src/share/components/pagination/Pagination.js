import React from 'react';
import styles from './Pagination.module.scss';

const Pagination = ({ pageNumberZeroBased, totalPages, onPageChange }) => {

  const onPageNumberClick = newPageNumberZeroBased => {
    if (newPageNumberZeroBased !== pageNumberZeroBased) {
      onPageChange(newPageNumberZeroBased);
    }
  };

  return (
    <div className={styles['pagination']}>
      {Array.from({ length: totalPages }).map((_, index) =>
        (<div key={index}
          className={`${styles['pagination_item']} ${index === pageNumberZeroBased ? styles['pagination_item__active'] : ''}`}
          onClick={() => onPageNumberClick(index)}>{index + 1}</div>))
      }
    </div>
  );
};

export default Pagination;