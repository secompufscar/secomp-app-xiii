interface Events {
  id?: string;
  year: number;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
};

type UpdateEvent = Partial<Events>;