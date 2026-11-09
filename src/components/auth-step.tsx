import { Image } from 'expo-image';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackButton } from '@/components/back-button';

// Figma "05 Signup *" / "06 Password Reset *" 공통 레이아웃: 뒤로가기 + 3단 진행바 + 폼 + 하단 영역
export function StepScreen({
  step,
  children,
  bottom,
}: {
  step: 1 | 2 | 3;
  children: ReactNode;
  bottom: ReactNode;
}) {
  return (
    <SafeAreaView className="flex-1 bg-bg">
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View className="h-8 justify-center px-5 pt-2">
          <BackButton />
          <View className="absolute left-0 right-0 top-[22px] flex-row justify-center gap-1" pointerEvents="none">
            {[1, 2, 3].map((i) => (
              <View key={i} className={`h-1 w-16 rounded ${i <= step ? 'bg-accent' : 'bg-surface4'}`} />
            ))}
          </View>
        </View>
        <ScrollView
          className="flex-1"
          contentContainerClassName="gap-6 px-5 pb-6 pt-[23px]"
          keyboardShouldPersistTaps="handled">
          {children}
        </ScrollView>
        <View className="gap-4 px-5 pb-10 pt-2">{bottom}</View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export function StepHeading({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <View className="gap-4">
      <Text className="font-sans-semibold text-2xl text-text1">{title}</Text>
      {children}
    </View>
  );
}

// "Field / Code": 6칸 인증코드 + 타이머 + 다시 받기
export function CodeField({
  value,
  onChange,
  onResend,
  seconds = 300,
}: {
  value: string;
  onChange: (v: string) => void;
  onResend: () => void;
  seconds?: number;
}) {
  const inputRef = useRef<TextInput>(null);
  const [left, setLeft] = useState(seconds);

  useEffect(() => {
    const id = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  const resend = () => {
    setLeft(seconds);
    onChange('');
    onResend();
  };

  return (
    <View className="gap-3">
      <View className="gap-2">
        <Text className="font-sans text-[15px] text-text3">인증코드</Text>
        <Pressable onPress={() => inputRef.current?.focus()} className="h-[52px] flex-row gap-3">
          {Array.from({ length: 6 }, (_, i) => {
            const ch = value[i];
            return (
              <View
                key={i}
                className={`flex-1 items-center justify-center rounded-xl ${
                  ch ? 'border-2 border-accent bg-accentBody' : 'border border-lineStrong bg-surface2'
                }`}>
                {ch && <Text className="font-sans-semibold text-2xl text-onAccent">{ch}</Text>}
              </View>
            );
          })}
        </Pressable>
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={(t) => onChange(t.replace(/\D/g, '').slice(0, 6))}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoComplete="one-time-code"
          maxLength={6}
          autoFocus
          className="absolute h-px w-px opacity-0"
        />
      </View>
      <View className="flex-row justify-between">
        <View className="flex-row items-baseline gap-1">
          <Text className="font-mono text-[13px] text-text3">
            {Math.floor(left / 60)}:{String(left % 60).padStart(2, '0')}
          </Text>
          <Text className="font-sans text-[15px] text-text3">남음</Text>
        </View>
        <Pressable onPress={resend} hitSlop={8}>
          <Text className="font-sans text-[15px] text-onAccent underline">코드 다시 받기</Text>
        </Pressable>
      </View>
    </View>
  );
}

export function passwordChecks(pw: string) {
  return {
    length: pw.length >= 8,
    letter: /[A-Za-z]/.test(pw),
    number: /\d/.test(pw),
  };
}

export function PasswordRules({ password }: { password: string }) {
  const c = passwordChecks(password);
  const rules: [boolean, string][] = [
    [c.length, '8자 이상'],
    [c.letter, '영문'],
    [c.number, '숫자'],
  ];
  return (
    <View className="flex-row gap-3">
      {rules.map(([ok, label]) => (
        <Text key={label} className={`font-sans text-[15px] ${ok ? 'text-accent' : 'text-text3'}`}>
          ✓ {label}
        </Text>
      ))}
    </View>
  );
}

// "05 Signup 4 Done" / "06 Password Reset 4 Done"
export function DoneScreen({
  title,
  subtitle,
  bottom,
}: {
  title: string;
  subtitle?: string;
  bottom: ReactNode;
}) {
  return (
    <SafeAreaView className="flex-1 bg-bg">
      <View className="flex-1 items-center justify-center gap-6 px-5">
        <View
          className="size-24 items-center justify-center rounded-full bg-accent"
          style={{
            boxShadow: '0px 0px 20px 0px rgba(45, 98, 255, 0.5)',
          }}>
          <Image source={require('@/assets/icons/check-large.svg')} style={{ width: 64, height: 64 }} />
        </View>
        <View className="items-center gap-2">
          <Text className="text-center font-sans-semibold text-[28px] text-text1">{title}</Text>
          {subtitle && <Text className="font-sans text-[15px] text-text3">{subtitle}</Text>}
        </View>
      </View>
      <View className="px-5 pb-10">{bottom}</View>
    </SafeAreaView>
  );
}
