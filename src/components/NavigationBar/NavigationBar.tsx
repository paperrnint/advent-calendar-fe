import { Icon } from '../Icon/Icon';
import { Logo } from '../Logo/Logo';
import { NavigationMenu } from '../NavigationMenu/NavigationMenu';
import { DropdownMenu, DropdownMenuTrigger } from '../ui/dropdown-menu';

interface Props {
  isAuthenticated?: boolean;
}

export const NavigationBar = ({ isAuthenticated }: Props) => {
  return (
    <div className="bg-background/50 fixed top-0 right-0 left-0 z-10 backdrop-blur-lg">
      <div className="flex w-full items-center justify-between p-2">
        <Logo />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="cursor-pointer rounded-full p-1 text-neutral-700"
              aria-label="메뉴 열기"
            >
              <Icon number={9} size={36} alt="메뉴" />
            </button>
          </DropdownMenuTrigger>
          <NavigationMenu.Content>
            {isAuthenticated ? <NavigationMenu.AuthItems /> : <NavigationMenu.UnauthItems />}
          </NavigationMenu.Content>
        </DropdownMenu>
      </div>
    </div>
  );
};
