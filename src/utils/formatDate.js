import { format } from 'date-fns';

const formatDate = input => {
  const date = new Date(input);
  return format(date, 'dd.MM.yyyy');
};

export default formatDate;
