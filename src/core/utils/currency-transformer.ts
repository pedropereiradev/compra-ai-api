export const currencyTransformer = {
  to: (value: number | null): number | null => {
    return value !== null ? Math.round(value * 100) : null;
  },
  from: (value: number | null): number | null => {
    return value !== null ? value / 100 : null;
  },
};
