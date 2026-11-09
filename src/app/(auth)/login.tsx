import { Image } from 'expo-image';
import { Link, useLocalSearchParams } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LandingGlow } from '@/components/landing-glow';

type Method = 'kakao' | 'google' | 'email';

// Figma "03 Login / Default" · "03 Login / Last Used"
export default function Login() {
  // TODO: 마지막 로그인 방법을 저장소에서 읽어오기
  const { last } = useLocalSearchParams<{ last?: Method }>();

  return (
    <View className="flex-1 bg-bg">
      <LandingGlow variant="login" />
      <SafeAreaView className="flex-1 justify-end px-5 pb-10">
        <View className="w-[279px] gap-6">
          <Text className="font-logo text-2xl leading-6 text-text1">IJIRI</Text>
          <View className="gap-4">
            <Text className="font-sans text-[36px] leading-[40px] text-text1">
              {last ? '다시 오셨네요\n담아 둔 부품이 기다려요' : '마음에 드는 부품,\n로그인하고 모아 두세요'}
            </Text>
            <Text className="font-sans text-[15px] text-text2">이지리 | 즐거운 카라이프를 공유하다</Text>
          </View>
        </View>

        <View className="mt-14 items-center gap-6">
          <View className="w-full gap-3">
            <LoginButton
              lastUsed={last === 'kakao'}
              className="bg-[#FEE500]"
              icon={<Image source={require('@/assets/icons/kakao.svg')} style={{ width: 20, height: 20 }} />}
              label="카카오 로그인"
              labelClassName="text-black"
            />
            <LoginButton
              lastUsed={last === 'google'}
              className="bg-[#F2F2F2]"
              icon={<Image source={require('@/assets/icons/google.svg')} style={{ width: 20, height: 20 }} />}
              label="Google 계정으로 로그인"
              labelClassName="text-black"
            />
            <Link href="/email-login" asChild>
              <LoginButton
                lastUsed={last === 'email'}
                className="bg-surface2"
                icon={
                  <View className="size-5 items-center justify-center">
                    <Image source={require('@/assets/icons/mail.svg')} style={{ width: 18.6669, height: 15.3333 }} />
                  </View>
                }
                label="이메일로 로그인"
                labelClassName="text-text1"
              />
            </Link>
          </View>

          <Text className="font-sans text-[15px] text-text3">
            로그인하면 <Text className="text-onAccent underline">이용약관</Text>과{' '}
            <Text className="text-onAccent underline">개인정보처리방침</Text>에 동의하게 돼요
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

function LoginButton({
  icon,
  label,
  className,
  labelClassName,
  lastUsed,
  onPress,
}: {
  icon: ReactNode;
  label: string;
  className: string;
  labelClassName: string;
  lastUsed?: boolean;
  onPress?: () => void;
}) {
  return (
    <View>
      <Pressable
        onPress={onPress}
        className={`h-[52px] flex-row items-center justify-center gap-2 rounded-xl active:opacity-80 ${className}`}>
        {icon}
        <Text className={`font-sans-semibold text-xl ${labelClassName}`}>{label}</Text>
      </Pressable>
      {lastUsed && (
        <View
          pointerEvents="none"
          className="absolute -top-[13px] right-[11px] rounded-2xl bg-accent px-3 py-1">
          <Text className="font-sans-semibold text-[15px] text-text1">
            최근에 이 방법으로 로그인했어요
          </Text>
        </View>
      )}
    </View>
  );
}
