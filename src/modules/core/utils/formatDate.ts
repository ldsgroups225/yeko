import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export const formatDate = (date: Date, formatString: string = 'EEEE dd MMMM'): string => {
  return format(date, formatString, { locale: fr });
};
