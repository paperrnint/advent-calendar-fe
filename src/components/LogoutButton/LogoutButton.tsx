import { useLogout } from '@/hooks/useLogout';
import { LogOut } from 'lucide-react';

export const LogoutButton = () => {
  const { mutate: logout, isPending } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className={`flex gap-2 ${isPending ? 'cursor-wait opacity-70' : 'cursor-pointer'}`}
    >
      <LogOut />
      <span>로그아웃</span>
    </button>
  );
};
