interface Notification {
    id: string;
    title: string;
    message: string;
    data?: Prisma.InputJsonValue; // Use JsonValue do Prisma
    status: 'PENDING' | 'SENT' | 'FAILED';
    error?: string;
    sentAt: Date;
    createdBy?: string;

    sender?: User;
    recipients: User[];
};

interface CreateNotificationDTO {
  title: string;
  message: string;
  recipientIds: string[];
  data?: Record<string, unknown>;
  sound?: boolean;
  badge?: number;
};

interface SendToAllNotificationDTO extends Omit<CreateNotificationDTO, "recipientIds"> {};