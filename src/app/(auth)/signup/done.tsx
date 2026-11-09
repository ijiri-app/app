import { router } from 'expo-router';

import { DoneScreen } from '@/components/auth-step';
import { Cta } from '@/components/cta';

// Figma "05 Signup 4 Done"
export default function SignupDone() {
  return (
    <DoneScreen
      title="회원가입에 성공했어요"
      subtitle="지금 바로 구경하러 가요"
      bottom={<Cta label="구경하러 가기" onPress={() => router.replace('/feed')} />}
    />
  );
}
