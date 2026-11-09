import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { CodeField, StepHeading, StepScreen } from '@/components/auth-step';
import { Cta } from '@/components/cta';

// "05 Signup 2 Code" / "06 Password Reset 2 Code" 공통
export function CodeVerifyScreen({ email, onVerified }: { email: string; onVerified: () => void }) {
  const [code, setCode] = useState('');

  return (
    <StepScreen step={2} bottom={<Cta label="확인" enabled={code.length === 6} onPress={onVerified} />}>
      <StepHeading title="메일로 받은 코드를 입력해 주세요">
        <View className="flex-row gap-2">
          <Text className="font-sans text-[15px] text-text3">{email}</Text>
          <Pressable onPress={() => router.back()} hitSlop={8}>
            <Text className="font-sans text-[15px] text-onAccent underline">바꾸기</Text>
          </Pressable>
        </View>
      </StepHeading>
      {/* TODO: 인증코드 재발송 API */}
      <CodeField value={code} onChange={setCode} onResend={() => {}} />
    </StepScreen>
  );
}
