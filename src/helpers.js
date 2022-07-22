export const calculateFlightDuration = (time) => {
  return time.map((flight) => flight.duration).reduce((prev, next) => prev + next, 0);
};

export const convertTime = (minutes) => {
  const hours = minutes / 60;
  const floorHours = Math.floor(hours);
  const min = (hours - floorHours) * 60;
  const roundMinutes = Math.round(min);
  return [floorHours, roundMinutes];
};

export const formatTime = (hr, min) => {
  const hours = hr < 10 ? `0${hr}` : hr;
  const minutes = min < 10 ? `0${min}` : min;
  return [hours, minutes];
};

export const formatMinutesDurationToHours = (minutes) => {
  const [hr, mins] = convertTime(minutes);
  const [hours, min] = formatTime(hr, mins);
  return `${hours}ч ${min}м`;
};

export const formatCorrectTransfersText = (countOfTransfers) => {
  if (countOfTransfers === 0 || countOfTransfers >= 5) return `${countOfTransfers} пересадок`;
  if (countOfTransfers === 1) return `${countOfTransfers} пересадка`;
  return `${countOfTransfers} пересадки`;
};

export const calculateFlightStart = (startOfFlight) => {
  const hoursOfStart = new Date(startOfFlight).getHours();
  const minutesOfStart = new Date(startOfFlight).getMinutes();
  const [hours, minutes] = formatTime(hoursOfStart, minutesOfStart);
  return `${hours}:${minutes}`;
};

export const calculateFlightEnd = (startOfFlight, duration) => {
  const date = new Date(startOfFlight);
  let hr = date.getHours() + Math.trunc(duration / 60);
  const min = (date.getMinutes() + duration) % 60;
  if (hr >= 24) hr -= 24;

  const [hours, minutes] = formatTime(hr, min);

  return `${hours}:${minutes}`;
};

export const formatPrice = (price) => `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} Р`;

export const filterTicketsListByTransfers = (ticketsList, filtersList) => {
  return ticketsList.filter((ticket) => {
    return filtersList.includes(
      ticket.segments
        .map((element) => element.stops.length)
        .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
    );
  });
};

export const updateCheckboxList = (state, value) => {
  const index = state.findIndex((el) => el.value === value);

  if (value === 'Все') {
    if (state[index].isChecked) {
      return state.map((box) => {
        return { ...box, isChecked: false };
      });
    }
    return state.map((box) => {
      return { ...box, isChecked: true };
    });
  }

  if (
    !state[0].isChecked &&
    !state[index].isChecked &&
    !state.slice(1, index).filter((el) => !el.isChecked).length &&
    !state.slice(index + 1).filter((el) => !el.isChecked).length
  ) {
    return state.map((box) => {
      return { ...box, isChecked: true };
    });
  }

  return [
    { ...state[0], isChecked: false },
    ...state.slice(1, index),
    { ...state[index], isChecked: !state[index].isChecked },
    ...state.slice(index + 1),
  ];
};
