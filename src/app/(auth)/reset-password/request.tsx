import { router } from 'expo-router';
import { useState } from 'react';
import { Text } from 'react-native';

import { StepHeading, StepScreen } from '@/components/auth-step';
import { Cta } from '@/components/cta';
import { TextField } from '@/components/text-field';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Figma "06 Password Reset 1 Email / *"
export default function ResetPasswordRequest() {
  const [email, setEmail] = useState('');
  const ready = EMAIL_RE.test(email.trim());

  return (
    <StepScreen
      step={1}
      bottom={
        <Cta
          label="인증코드 받기"
          enabled={ready}
          // TODO: 인증코드 발송 API
          onPress={() =>
            router.push({ pathname: '/reset-password/verify', params: { email: email.trim() } })
          }
        />
      }>
      <StepHeading title="가입한 이메일을 입력해 주세요">
        <Text className="font-sans text-[15px] text-text3">입력한 주소로 인증코드를 보내 드려요</Text>
      </StepHeading>
      <TextField
        label="이메일"
        value={email}
        onChangeText={setEmail}
        placeholder="name@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        autoFocus
      />
    </StepScreen>
  );
}
