import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@/core/theme/ThemeProvider';

type ScreenWrapperProps = {
  children: ReactNode;
  scroll?: boolean;
};

export function ScreenWrapper({ children, scroll = false }: ScreenWrapperProps) {
  const theme = useTheme();
  const content = scroll ? (
    <ScrollView
      contentContainerStyle={[styles.content, { padding: theme.spacing.lg, gap: theme.spacing.md }]}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.content, styles.fill, { padding: theme.spacing.lg, gap: theme.spacing.md }]}>
      {children}
    </View>
  );

  return (
    <SafeAreaView
      edges={['bottom', 'left', 'right']}
      style={[styles.fill, { backgroundColor: theme.colors.background }]}
    >
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
});
