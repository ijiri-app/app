import { router, useLocalSearchParams } from 'expo-router';

import { CodeVerifyScreen } from '@/components/code-verify-screen';

// Figma "05 Signup 2 Code / *"
export default function SignupVerify() {
  const { email = '' } = useLocalSearchParams<{ email?: string }>();
  return (
    <CodeVerifyScreen
      email={email}
      // TODO: 인증코드 확인 API
      onVerified={() => router.push({ pathname: '/signup/profile', params: { email } })}
    />
  );
}
