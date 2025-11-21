export interface CalendarProps {
  uuid: string;
  isOwner: boolean;
  ownerName: string;
  today?: string;
  isDev?: boolean;
}

export interface CalendarDay {
  date: string;
  day: number;
}
