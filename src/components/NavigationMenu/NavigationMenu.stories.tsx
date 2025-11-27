import { Provider as JotaiProvider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';

import type { Meta, StoryObj } from '@storybook/nextjs';

import { NavigationMenu } from './NavigationMenu';
import { Icon } from '../Icon/Icon';
import { DropdownMenu, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { userAtom } from '@/stores/authStore';
import { UserState } from '@/stores/authStore';

// Helper 컴포넌트
const HydrateAtoms = ({
  initialValues,
  children,
}: {
  initialValues: [[typeof userAtom, UserState]];
  children: React.ReactNode;
}) => {
  useHydrateAtoms(initialValues);
  return children;
};

const meta = {
  title: 'Components/NavigationMenu',
  component: NavigationMenu.Content,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
        query: {},
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <JotaiProvider>
        <div className="flex min-h-[400px] items-start justify-center pt-4">
          <Story />
        </div>
      </JotaiProvider>
    ),
  ],
} satisfies Meta<typeof NavigationMenu.Content>;

export default meta;
type Story = StoryObj<typeof meta>;

// 인증된 사용자 메뉴
export const AuthenticatedMenu: Omit<Story, 'args'> = {
  render: () => {
    return (
      <JotaiProvider>
        <HydrateAtoms
          initialValues={[
            [
              userAtom,
              {
                uuid: 'test-uuid-123',
                email: 'santa@christmas.com',
                name: '산타',
                color: 'red' as const,
                isAuthenticated: true as const,
              },
            ],
          ]}
        >
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
              <NavigationMenu.AuthItems onDeleteClick={() => console.log('Delete clicked')} />
            </NavigationMenu.Content>
          </DropdownMenu>
        </HydrateAtoms>
      </JotaiProvider>
    );
  },
};

// 미인증 사용자 메뉴
export const UnauthenticatedMenu: Omit<Story, 'args'> = {
  render: () => {
    return (
      <JotaiProvider>
        <HydrateAtoms
          initialValues={[
            [
              userAtom,
              {
                uuid: null,
                email: null,
                name: null,
                color: null,
                isAuthenticated: false as const,
              },
            ],
          ]}
        >
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
              <NavigationMenu.UnauthItems />
            </NavigationMenu.Content>
          </DropdownMenu>
        </HydrateAtoms>
      </JotaiProvider>
    );
  },
};

// 긴 이메일 테스트
export const LongEmailMenu: Omit<Story, 'args'> = {
  render: () => {
    return (
      <JotaiProvider>
        <HydrateAtoms
          initialValues={[
            [
              userAtom,
              {
                uuid: 'test-uuid-123',
                email: 'very.long.email.address.test@christmas-calendar-example.com',
                name: '산타',
                color: 'red' as const,
                isAuthenticated: true as const,
              },
            ],
          ]}
        >
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
              <NavigationMenu.AuthItems onDeleteClick={() => console.log('Delete clicked')} />
            </NavigationMenu.Content>
          </DropdownMenu>
        </HydrateAtoms>
      </JotaiProvider>
    );
  },
};
