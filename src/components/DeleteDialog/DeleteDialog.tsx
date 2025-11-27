import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { useDeleteUser } from '@/hooks/useDeleteUser';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DeleteDialog = ({ open, onOpenChange }: Props) => {
  const { mutate: deleteUser, isPending } = useDeleteUser();

  const confirm = () => {
    deleteUser();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader className="pb-4 text-left">
          <AlertDialogTitle className="text-base">계정을 삭제할까요?</AlertDialogTitle>
          <AlertDialogDescription className="text-xs">
            모든 데이터는 영구적으로 삭제되며 복구할 수 없습니다
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isPending}
            className="bg-white shadow-none hover:bg-neutral-50"
          >
            취소
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={confirm}
            disabled={isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
