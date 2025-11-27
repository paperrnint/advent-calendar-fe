import { useState } from 'react';

import { DeleteDialog } from '../DeleteDialog/DeleteDialog';
import { Icon } from '../Icon/Icon';
import { Logo } from '../Logo/Logo';
import { NavigationMenu } from '../NavigationMenu/NavigationMenu';
import { DropdownMenu, DropdownMenuTrigger } from '../ui/dropdown-menu';

interface Props {
  isAuthenticated?: boolean | 'unknown';
}

export const NavigationBar = ({ isAuthenticated = 'unknown' }: Props) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const isLoading = isAuthenticated === 'unknown';

  return (
    <>
      <div className="bg-background/50 fixed top-0 right-0 left-0 z-10 backdrop-blur-lg">
        <div className="flex w-full items-center justify-between p-2">
          <Logo />
          <DropdownMenu>
            <DropdownMenuTrigger asChild disabled={isLoading}>
              <button
                className="cursor-pointer rounded-full p-1 text-neutral-700"
                aria-label="메뉴 열기"
              >
                <Icon number={9} size={36} alt="메뉴" />
              </button>
            </DropdownMenuTrigger>
            <NavigationMenu.Content>
              {isAuthenticated === true ? (
                <NavigationMenu.AuthItems onDeleteClick={() => setShowDeleteModal(true)} />
              ) : (
                <NavigationMenu.UnauthItems />
              )}
            </NavigationMenu.Content>
          </DropdownMenu>
        </div>
      </div>

      <DeleteDialog open={showDeleteModal} onOpenChange={setShowDeleteModal} />
    </>
  );
};
