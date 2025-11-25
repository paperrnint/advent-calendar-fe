import { Flap } from '../Flap/Flap';
import { Icon } from '../Icon/Icon';
import { generateCalendarDays } from '@/utils';

export const PreviewCalendar = () => {
  const days = generateCalendarDays();

  return (
    <div className="bg-background-beige pointer-events-none rounded-lg p-4">
      <div className="grid grid-cols-5 gap-2">
        {days.map(({ day }) => {
          return (
            <Flap key={day}>
              <Icon number={day} />
            </Flap>
          );
        })}
      </div>
    </div>
  );
};
