import { useColorScheme } from 'react-native';
import colors from '@/constants/colors';

/**
 * Returns the palette for the active app appearance.
 * CaseZero is configured dark-first, with a light fallback for previews.
 */
export function useColors() {
  const scheme = useColorScheme();
  const palette = scheme === 'dark' ? colors.dark : colors.light;
  return { ...palette, radius: colors.radius };
}
