export interface CalendarProps {
  uuid: string;
  isAuthLoading: boolean;
  isOwner: boolean;
  ownerName: string;
  today?: string;
  isDev?: boolean;
}

export interface CalendarDay {
  date: string;
  day: number;
}
