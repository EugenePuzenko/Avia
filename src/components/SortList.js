import { useSelector, useDispatch } from 'react-redux';
import { Radio } from 'antd';

import { onTabListClick } from '../store/ticketsSlice';

import classes from './App.module.scss';

const SortList = () => {
  const dispatch = useDispatch();
  const tabList = useSelector((state) => state.tabList.tabList);

  return (
    <Radio.Group
      className={classes['radio-group']}
      options={tabList}
      onChange={({ target: { value } }) => dispatch(onTabListClick(value))}
      optionType="button"
      buttonStyle="solid"
    />
  );
};

export default SortList;
