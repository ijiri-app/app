import { Link, router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackButton } from '@/components/back-button';
import { Cta } from '@/components/cta';
import { TextField } from '@/components/text-field';

// Figma "04 Email Login / *"
export default function EmailLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const ready = email.trim().length > 0 && password.length > 0;

  const submit = () => {
    // TODO: 로그인 API
    router.replace('/feed');
  };

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View className="px-5 pt-2">
          <BackButton />
        </View>
        <ScrollView className="flex-1" contentContainerClassName="items-center gap-6 px-5 pt-[23px]" keyboardShouldPersistTaps="handled">
          <Text className="self-start font-sans-semibold text-2xl text-text1">이메일로 로그인</Text>
          <TextField
            label="이메일"
            value={email}
            onChangeText={setEmail}
            placeholder="name@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
          <TextField
            label="비밀번호"
            value={password}
            onChangeText={setPassword}
            placeholder="비밀번호"
            password
            autoComplete="current-password"
          />
          <Link href="/reset-password/request">
            <Text className="font-sans text-[15px] text-textBody">비밀번호 찾기</Text>
          </Link>
        </ScrollView>

        <View className="items-center gap-6 px-5 pb-10 pt-2">
          <Cta label="로그인" enabled={ready} onPress={submit} />
          <Link href="/signup/email" asChild>
            <Pressable hitSlop={8}>
              <Text className="font-sans text-[15px] text-text2">회원가입</Text>
            </Pressable>
          </Link>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
