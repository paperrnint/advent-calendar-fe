import { useAtomValue } from 'jotai';
import { Gift, LogIn, LogOut, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '../ui/dropdown-menu';
import { useLogout } from '@/hooks/useLogout';
import { userAtom } from '@/stores/authStore';

const NavigationMenuContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <DropdownMenuContent align="end" alignOffset={6} sideOffset={2} className="w-42">
      {children}
    </DropdownMenuContent>
  );
};

const AuthMenuItems = ({ onDeleteClick }: { onDeleteClick: () => void }) => {
  const router = useRouter();
  const user = useAtomValue(userAtom);
  const { mutate: logout, isPending } = useLogout();

  return (
    <>
      {user.email && (
        <DropdownMenuLabel className="truncate px-2 py-1 text-xs text-neutral-400">
          {user.email}
        </DropdownMenuLabel>
      )}

      <DropdownMenuItem onSelect={() => router.push(`/${user.uuid}`)} disabled={isPending}>
        <Gift />
        <span>내 어드벤트 캘린더</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onSelect={() => logout()} disabled={isPending}>
        <LogOut />
        <span>로그아웃</span>
      </DropdownMenuItem>
      <DropdownMenuItem variant="destructive" onSelect={onDeleteClick} disabled={isPending}>
        <Trash2 />
        <span>탈퇴하기</span>
      </DropdownMenuItem>
    </>
  );
};

const UnauthMenuItems = () => {
  const router = useRouter();

  const goToHome = () => {
    router.push('/');
  };

  return (
    <>
      <DropdownMenuItem onSelect={goToHome}>
        <Gift />
        <span>어드벤트 캘린더 생성</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onSelect={goToHome}>
        <LogIn />
        <span>로그인</span>
      </DropdownMenuItem>
    </>
  );
};

export const NavigationMenu = {
  Content: NavigationMenuContent,
  AuthItems: AuthMenuItems,
  UnauthItems: UnauthMenuItems,
};
