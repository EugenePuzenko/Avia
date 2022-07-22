import { Alert } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import logo from '../assets/img/Logo.svg';
import { fetchSearchId, fetchTicketsPart, getMoreFiveTickets } from '../store/ticketsSlice';
import { filterTicketsListByTransfers } from '../helpers';

import classes from './App.module.scss';
import LoadingSpin from './LoadingSpin';
import CheckboxList from './CheckboxList';
import SortList from './SortList';
import TicketsList from './TicketsList';

const App = () => {
  const {
    ticketsList,
    countOfVisibleTickets,
    searchId,
    requestError,
    stopFetchTickets,
    isLoading,
    filtersList,
    ticketsListStatus,
  } = useSelector((state) => state.ticketsList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSearchId());
  }, []);

  useEffect(() => {
    if (searchId && !stopFetchTickets) {
      dispatch(fetchTicketsPart(searchId));
    }
  }, [searchId, ticketsList, requestError]);

  const filteredTickets = filterTicketsListByTransfers(ticketsList, filtersList);

  let visibleTicketsList;

  if (ticketsList !== undefined) {
    visibleTicketsList = filteredTickets.slice(0, countOfVisibleTickets);
  }

  const isZeroResultMessage = !visibleTicketsList.length && !isLoading && (
    <Alert
      message="Результат фильтрации:"
      description="Рейсов, подходящих под заданные фильтры, не найдено."
      type="info"
      showIcon
    />
  );

  const isResourceIsntAvailableMessage = ticketsListStatus === 'rejected' && (
    <Alert message="Сервис временно недоступен" type="error" showIcon />
  );

  const LoadingSpinner = isLoading && ticketsListStatus !== 'rejected' && <LoadingSpin />;

  const showMoreTicketsBtn = filteredTickets.length > countOfVisibleTickets && (
    <button onClick={() => dispatch(getMoreFiveTickets())} className={classes['btn-more-tickets']} type="button">
      Показать еще 5 билетов!
    </button>
  );

  return (
    <main className={classes.main}>
      <img className={classes.logo} src={logo} alt="logo" />
      <div className={classes.content}>
        <CheckboxList />
        <div className={classes['ticket-block']}>
          <SortList />
          {isZeroResultMessage}
          {isResourceIsntAvailableMessage}
          {LoadingSpinner}
          <TicketsList />
          {showMoreTicketsBtn}
        </div>
      </div>
    </main>
  );
};

export default App;
