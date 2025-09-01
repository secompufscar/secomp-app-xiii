enum UserEventStatus {
  Cancelado = 0,
  Inscrito = 1,
  Fechado = 2,
};

interface UserEvent {
  id?: string;
  userId: string;
  eventId: string;
  status: UserEventStatus;
  createdAt: Date;
};

interface CreateRegistrationDTO {
  eventId: string;
};
