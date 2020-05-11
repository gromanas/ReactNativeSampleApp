import { Platform } from 'react-native';

export const testProperties = (
  id,
  disableAccessible = false
)  => {
    const disableAccessibility = disableAccessible ? {accessible: false} : {};
    if (Platform.OS === 'ios') {
      return {
        ...disableAccessibility,
        testID: `test-${id}`.trim(),
      };
    }
    return {
      ...disableAccessibility,
      accessibilityLabel: `test-${id}`.trim(),
    };
};
