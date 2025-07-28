// Depois isso irá combinar com a definição no BD de ítem do cronograma
// Esqueleto de um ítem do cronograma
export type ScheduleItemProps = {
  title: string;
  speaker: string;
  hour: string;
  date: string;
  description: string;
  location: string;
  subscribed?: boolean;
};
