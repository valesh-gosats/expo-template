import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

import { useTheme } from '@/core/theme/ThemeProvider';

type AppButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  loading?: boolean;
};

export function AppButton({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
}: AppButtonProps) {
  const theme = useTheme();
  const isDisabled = disabled || loading;
  const backgroundColor = variant === 'primary' ? theme.colors.primary : theme.colors.secondary;
  const textColor = variant === 'primary' ? theme.colors.primaryText : theme.colors.secondaryText;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor,
          borderRadius: theme.radii.md,
          opacity: isDisabled ? 0.5 : pressed ? 0.85 : 1,
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm + 4,
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.label, { color: textColor, fontSize: theme.typography.body }]}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  label: {
    fontWeight: '600',
  },
});
