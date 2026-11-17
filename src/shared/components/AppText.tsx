import { Text, type TextProps, type TextStyle } from 'react-native';

import { useTheme } from '@/core/theme/ThemeProvider';

type AppTextProps = TextProps & {
  variant?: 'title' | 'body' | 'caption' | 'error';
};

export function AppText({ variant = 'body', style, ...props }: AppTextProps) {
  const theme = useTheme();
  const variantStyle: TextStyle =
    variant === 'title'
      ? { fontSize: theme.typography.title, fontWeight: '700', color: theme.colors.text }
      : variant === 'caption'
        ? { fontSize: theme.typography.caption, color: theme.colors.textMuted }
        : variant === 'error'
          ? { fontSize: theme.typography.caption, color: theme.colors.danger }
          : { fontSize: theme.typography.body, color: theme.colors.text };

  return <Text {...props} style={[variantStyle, style]} />;
}
