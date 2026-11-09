import { router, useLocalSearchParams } from 'expo-router';

import { CodeVerifyScreen } from '@/components/code-verify-screen';

// Figma "06 Password Reset 2 Code / *"
export default function ResetPasswordVerify() {
  const { email = '' } = useLocalSearchParams<{ email?: string }>();
  return (
    <CodeVerifyScreen
      email={email}
      // TODO: 인증코드 확인 API
      onVerified={() => router.push({ pathname: '/reset-password/new', params: { email } })}
    />
  );
}
