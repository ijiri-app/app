import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { PasswordRules, StepHeading, StepScreen, passwordChecks } from '@/components/auth-step';
import { Cta } from '@/components/cta';
import { TextField } from '@/components/text-field';

// Figma "06 Password Reset 3 New Password / *"
export default function ResetPasswordNew() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const c = passwordChecks(password);
  const ready = c.length && c.letter && c.number && password === confirm;

  return (
    <StepScreen
      step={3}
      bottom={
        <Cta
          label="확인"
          enabled={ready}
          // TODO: 비밀번호 변경 API
          onPress={() => router.replace('/reset-password/done')}
        />
      }>
      <StepHeading title="새 비밀번호를 정해주세요" />
      <View className="gap-3">
        <TextField
          label="비밀번호"
          value={password}
          onChangeText={setPassword}
          placeholder="8자 이상, 영문과 숫자 섞기"
          password
          autoComplete="new-password"
        />
        <PasswordRules password={password} />
      </View>
      <TextField
        label="비밀번호 확인"
        value={confirm}
        onChangeText={setConfirm}
        placeholder="비밀번호 확인"
        password
        autoComplete="new-password"
      />
    </StepScreen>
  );
}
