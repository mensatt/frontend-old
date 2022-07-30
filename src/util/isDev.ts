export const isDev =
  process.env.NEXT_PUBLIC_APP_ENV === 'development' ||
  process.env.NODE_ENV === 'development';
