import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Cta } from '@/components/cta';
import { LandingGlow } from '@/components/landing-glow';

export default function OnboardingLanding() {
  return (
    <View className="flex-1 bg-bg">
      <LandingGlow />
      <SafeAreaView className="flex-1 justify-end px-5 pb-10">
        <View className="w-[279px] gap-6">
          <Text className="font-logo text-2xl leading-6 text-text1">IJIRI</Text>
          <View className="gap-4">
            <Text className="font-sans text-[36px] leading-[40px] text-text1">
              등업 없이 바로 보는{'\n'}튜닝 레퍼런스 <Text className="text-accent">이지리</Text>
            </Text>
            <Text className="font-sans text-[15px] text-text2">
              오너들이 실제로 단 부품을 차종별로 모았어요
            </Text>
          </View>
        </View>

        <View className="mt-14 items-center gap-6">
          <Link href="/onboarding/interest-cars" asChild>
            <Cta label="관심 차종 고르기" />
          </Link>
          <View className="flex-row items-center gap-2">
            <Text className="font-sans text-[15px] text-text2">이미 계정이 있나요?</Text>
            <Link href="/login">
              <Text className="font-sans text-[15px] text-accent">로그인</Text>
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
