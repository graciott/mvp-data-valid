export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const isExpired = (expirationDate: Date): boolean => {
  const today = new Date();
  return expirationDate < today;
};

export const daysUntilExpiry = (expirationDate: Date): number => {
  const today = new Date();
  const timeDiff = expirationDate.getTime() - today.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};