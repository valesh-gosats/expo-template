import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';

import { useTheme } from '@/core/theme/ThemeProvider';

type AppInputProps = TextInputProps & {
  label: string;
  error?: string;
};

export function AppInput({ label, error, style, ...props }: AppInputProps) {
  const theme = useTheme();

  return (
    <View style={{ gap: theme.spacing.xs }}>
      <Text style={{ color: theme.colors.text, fontSize: theme.typography.caption, fontWeight: '600' }}>
        {label}
      </Text>
      <TextInput
        placeholderTextColor={theme.colors.textMuted}
        {...props}
        style={[
          styles.input,
          {
            borderColor: error ? theme.colors.danger : theme.colors.border,
            borderRadius: theme.radii.md,
            color: theme.colors.text,
            fontSize: theme.typography.body,
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.sm,
          },
          style,
        ]}
      />
      {error ? (
        <Text style={{ color: theme.colors.danger, fontSize: theme.typography.caption }}>{error}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    minHeight: 48,
  },
});
