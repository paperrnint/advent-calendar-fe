import { GuestProps, NotLoggedInProps, OwnerProps } from '../CalendarAction/CalendarAction';
import { UserState } from '@/stores/authStore';

export const getCalendarActionProps = (
  curUser: UserState,
  pageUuid: string,
): NotLoggedInProps | OwnerProps | GuestProps => {
  if (curUser.isAuthenticated === 'unknown') {
    return {
      isLoading: true,
      isLoggedIn: false,
      isOwner: false,
      userUuid: null,
    };
  }

  if (!curUser.isAuthenticated) {
    return {
      isLoading: false,
      isLoggedIn: false,
      isOwner: false,
      userUuid: null,
    };
  }

  const isOwner = curUser.uuid === pageUuid;
  return isOwner
    ? {
        isLoading: false,
        isLoggedIn: true,
        isOwner: true,
        userUuid: curUser.uuid,
      }
    : {
        isLoading: false,
        isLoggedIn: true,
        isOwner: false,
        userUuid: curUser.uuid,
      };
};
