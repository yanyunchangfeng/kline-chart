export const safeJsonParse = <T extends Record<keyof any, any>>(str: string, defaultValue = {}): T => {
  try {
    return JSON.parse(str || '{}');
  } catch (err) {
    return defaultValue as T;
  }
};
