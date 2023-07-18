import { useMemo } from 'react';
import { GET_NAVIGATION, Navigation } from 'src/graphql/queries';

import { useQuery } from '@apollo/client';

// Get "URL-Base" from currently active backend
// Example: https://api.mensatt.de/v1/graphql => https://api.mensatt.de
export function useBackendUrlBase() {
  const { data: navData } = useQuery<Navigation>(GET_NAVIGATION);
  const backendURLBase = useMemo(() => {
    const { protocol, hostname } = new URL(
      navData?.backends[navData.activeBackendIdx].url ||
        'https://api.mensatt.de/v1/graphql',
    );
    return `${protocol}//${hostname}`;
  }, [navData]);
  return backendURLBase;
}
