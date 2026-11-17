import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, radii, spacing, typography } from '@/core/theme/tokens';

type ErrorFallbackProps = {
  error: Error;
  onReset: () => void;
};

export function ErrorFallback({ error, onReset }: ErrorFallbackProps) {
  return (
    <Pressable style={styles.container} onPress={onReset}>
      <Text style={styles.title}>Something went wrong</Text>
      <Text style={styles.message}>{error.message}</Text>
      <Text style={styles.action}>Tap to try again</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    backgroundColor: colors.background,
    gap: spacing.sm,
  },
  title: {
    color: colors.text,
    fontSize: typography.title,
    fontWeight: '700',
    textAlign: 'center',
  },
  message: {
    color: colors.textMuted,
    fontSize: typography.body,
    textAlign: 'center',
  },
  action: {
    marginTop: spacing.sm,
    color: colors.primaryText,
    backgroundColor: colors.primary,
    overflow: 'hidden',
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.body,
    fontWeight: '600',
  },
});
