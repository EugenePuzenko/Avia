import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { filterListChange } from '../store/ticketsSlice';
import { onCheckboxClick } from '../store/checkboxListSlice';

import classes from './App.module.scss';

const CheckboxList = () => {
  const dispatch = useDispatch();
  const checkboxList = useSelector((state) => state.checkboxList.checkboxList);

  useEffect(() => {
    dispatch(filterListChange(checkboxList));
  }, [checkboxList]);

  return (
    <div className={classes['checkbox-group']}>
      <span className={classes['checkbox-group-title']}>Количество пересадок</span>
      {checkboxList.map((checkbox) => (
        <label className={classes.label} key={checkbox.value} htmlFor={checkbox.value}>
          <input
            checked={checkbox.isChecked}
            onChange={() => dispatch(onCheckboxClick(checkbox.value))}
            className={classes.checkbox}
            type="checkbox"
            value={checkbox.value}
            id={checkbox.value}
          />
          <span className={classes['custom-checkbox']} />
          {checkbox.value}
        </label>
      ))}
    </div>
  );
};

export default CheckboxList;
