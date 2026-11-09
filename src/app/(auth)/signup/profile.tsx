import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { PasswordRules, StepHeading, StepScreen, passwordChecks } from '@/components/auth-step';
import { Cta } from '@/components/cta';
import { TextField } from '@/components/text-field';

const TERMS = [
  { key: 'age', label: '[필수] 만 14세 이상이에요', viewable: false },
  { key: 'tos', label: '[필수] 이용약관 동의', viewable: true },
  { key: 'privacy', label: '[필수] 개인정보 수집•이용 동의', viewable: true },
] as const;

type TermKey = (typeof TERMS)[number]['key'];

// Figma "05 Signup 3 Profile / *"
export default function SignupProfile() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [agreed, setAgreed] = useState<Record<TermKey, boolean>>({ age: false, tos: false, privacy: false });

  const allAgreed = TERMS.every((t) => agreed[t.key]);
  const c = passwordChecks(password);
  const nick = nickname.trim();
  const ready =
    c.length && c.letter && c.number && password === confirm && nick.length >= 2 && nick.length <= 12 && allAgreed;

  const toggleAll = () => {
    const v = !allAgreed;
    setAgreed({ age: v, tos: v, privacy: v });
  };

  return (
    <StepScreen
      step={3}
      bottom={
        <>
          <View className="gap-4 overflow-hidden rounded-xl bg-surface1 p-4">
            <Pressable onPress={toggleAll} className="flex-row items-center gap-2.5" accessibilityRole="checkbox" accessibilityState={{ checked: allAgreed }}>
              <Checkbox checked={allAgreed} />
              <Text className="font-sans-semibold text-[15px] text-text1">전체 동의</Text>
            </Pressable>
            <View className="gap-3">
              <View className="h-px bg-lineStrong" />
              {TERMS.map((t) => (
                <View key={t.key} className="flex-row items-center justify-between">
                  <Pressable
                    onPress={() => setAgreed((a) => ({ ...a, [t.key]: !a[t.key] }))}
                    className="flex-row items-center gap-2.5"
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: agreed[t.key] }}>
                    <Checkbox checked={agreed[t.key]} />
                    <Text className="font-sans text-[15px] text-text2">{t.label}</Text>
                  </Pressable>
                  {t.viewable && (
                    // TODO: 약관 상세 화면
                    <Pressable hitSlop={8}>
                      <Text className="font-sans text-[15px] text-text3 underline">보기</Text>
                    </Pressable>
                  )}
                </View>
              ))}
            </View>
          </View>
          <Cta
            label="확인"
            enabled={ready}
            // TODO: 회원가입 API
            onPress={() => router.replace('/signup/done')}
          />
        </>
      }>
      <StepHeading title="거의 다 됐어요" />
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
      <View className="gap-3">
        <TextField
          label="닉네임"
          value={nickname}
          onChangeText={setNickname}
          placeholder="2~12자"
          maxLength={12}
          autoCapitalize="none"
        />
        <Text className="font-sans text-[15px] text-text3">나중에 마이에서 바꿀 수 있어요</Text>
      </View>
    </StepScreen>
  );
}

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <View
      className={`size-5 items-center justify-center rounded border-2 ${
        checked ? 'border-accent bg-accent' : 'border-lineStrong bg-surface1'
      }`}>
      {checked && <Image source={require('@/assets/icons/check-on.svg')} style={{ width: 12, height: 12 }} />}
    </View>
  );
}
