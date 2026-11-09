import { router } from 'expo-router';

import { DoneScreen } from '@/components/auth-step';
import { Cta } from '@/components/cta';

// Figma "06 Password Reset 4 Done"
export default function ResetPasswordDone() {
  return (
    <DoneScreen
      title={'비밀번호 변경에\n성공했어요'}
      bottom={<Cta label="확인" onPress={() => router.dismissTo('/email-login')} />}
    />
  );
}
