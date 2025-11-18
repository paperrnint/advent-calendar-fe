import { GuestProps, NotLoggedInProps, OwnerProps } from '../CalendarAction/CalendarAction';
import { UserState } from '@/stores/authStore';

export const getCalendarActionProps = (
  curUser: UserState,
  pageUuid: string,
): NotLoggedInProps | OwnerProps | GuestProps => {
  if (!curUser.isAuthenticated) {
    return { isLoggedIn: false, isOwner: false, userUuid: null };
  }

  const isOwner = curUser.uuid === pageUuid;
  return isOwner
    ? { isLoggedIn: true, isOwner: true, userUuid: curUser.uuid }
    : { isLoggedIn: true, isOwner: false, userUuid: curUser.uuid };
};
