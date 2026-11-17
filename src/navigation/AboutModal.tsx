import { AppText } from '@/shared/components/AppText';
import { ScreenWrapper } from '@/shared/components/ScreenWrapper';
import { useAppState } from '@/shared/hooks/useAppState';

export function AboutModal() {
  const appState = useAppState();

  return (
    <ScreenWrapper scroll>
      <AppText variant="title">About</AppText>
      <AppText>
        Server data stays in TanStack Query. The session and cart stay in Zustand and are cleared
        together on logout.
      </AppText>
      <AppText variant="caption">App state: {appState}</AppText>
    </ScreenWrapper>
  );
}
