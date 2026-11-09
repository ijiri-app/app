import { Stack } from 'expo-router';

import { UploadProvider } from '@/components/upload-store';

export default function UploadLayout() {
  return (
    <UploadProvider>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#111418' } }} />
    </UploadProvider>
  );
}
