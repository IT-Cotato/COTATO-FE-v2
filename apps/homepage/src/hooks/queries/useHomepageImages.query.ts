'use client';

import {useQuery} from '@tanstack/react-query';
import {QUERY_KEYS} from '@/constants/query-keys';
import {
  getHomepageImages,
  getHomepageImagePermission,
} from '@/services/api/homepage-images.api';
import {useHomepageImagePreviewActor} from '@/components/homepage-images/HomepageImagePreviewContext';

export const useHomepageImagesQuery = (enabled = true) => {
  const actor = useHomepageImagePreviewActor();
  return useQuery({
    queryKey: QUERY_KEYS.HOMEPAGE_IMAGES.PUBLIC,
    queryFn: () => getHomepageImages(actor),
    enabled,
    staleTime: 30_000,
    retry: 0,
  });
};

export const useHomepageImagePermissionQuery = (enabled = true) => {
  const actor = useHomepageImagePreviewActor();
  return useQuery({
    queryKey: QUERY_KEYS.HOMEPAGE_IMAGES.PERMISSION(actor ?? 'authenticated'),
    queryFn: () => getHomepageImagePermission(actor),
    enabled,
    staleTime: 15_000,
    retry: 0,
    refetchOnWindowFocus: true,
  });
};
