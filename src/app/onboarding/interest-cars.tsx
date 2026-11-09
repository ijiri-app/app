import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackButton } from '@/components/back-button';
import { Cta } from '@/components/cta';

const BRANDS = ['전체', '현대', '기아', 'BMW', '제네시스', '벤츠', '토요타'] as const;

// TODO: API 연동 전 목업 데이터
const CARS = [
  { id: 'avante-n', brand: '현대', name: '아반떼 N' },
  { id: 'ioniq5-n', brand: '현대', name: '아이오닉 5 N' },
  { id: 'k5', brand: '기아', name: 'K5' },
  { id: 'genesis-coupe', brand: '현대', name: '제네시스 쿠페' },
  { id: 'stinger', brand: '기아', name: '스팅어' },
  { id: 'gr86', brand: '토요타', name: 'GR86' },
  { id: 'm4', brand: 'BMW', name: 'M4' },
  { id: 'm3', brand: 'BMW', name: 'M3' },
];

export default function OnboardingInterestCars() {
  const [brand, setBrand] = useState<(typeof BRANDS)[number]>('전체');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const cars = useMemo(
    () =>
      CARS.filter(
        (c) => (brand === '전체' || c.brand === brand) && c.name.includes(query.trim()),
      ),
    [brand, query],
  );

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const goFeed = () => router.replace('/feed');

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <View className="px-5 pt-2">
        <BackButton />
      </View>

      <ScrollView className="flex-1" contentContainerClassName="gap-6 pb-6 pt-[23px]">
        <View className="gap-4">
          <View className="gap-3 px-5">
            <View className="gap-4">
              <Text className="font-sans-semibold text-2xl text-text1">어떤 차가 궁금하세요?</Text>
              <Text className="font-sans text-[15px] text-text2">
                여러 대 골라도 돼요. 나중에 언제든 바꿀 수 있어요.
              </Text>
            </View>
            <View className="flex-row items-center gap-2 rounded-xl border border-lineStrong bg-surface2 px-3.5 py-2.5">
              <View className="size-6 items-center justify-center">
                <Image source={require('@/assets/icons/search.svg')} style={{ width: 20, height: 20 }} />
              </View>
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="차종 이름으로 찾기"
                placeholderTextColor="#969CA8"
                className="flex-1 p-0 font-sans-medium text-lg text-text1"
              />
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="gap-2 px-5">
            {BRANDS.map((b) => {
              const active = b === brand;
              return (
                <Pressable
                  key={b}
                  onPress={() => setBrand(b)}
                  className={`h-8 items-center justify-center rounded-2xl px-3 ${
                    active ? 'bg-text1' : 'bg-surface2'
                  }`}>
                  <Text
                    className={`text-[15px] ${
                      active ? 'font-sans-semibold text-bgDeep' : 'font-sans text-textBody'
                    }`}>
                    {b}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <View className="flex-row flex-wrap gap-2 px-5">
          {cars.map((car) => (
            <CarCard
              key={car.id}
              brand={car.brand}
              name={car.name}
              selected={selected.has(car.id)}
              onPress={() => toggle(car.id)}
            />
          ))}
        </View>
      </ScrollView>

      <View className="items-center gap-6 px-5 pb-10 pt-2">
        <Cta
          enabled={selected.size > 0}
          label={selected.size > 0 ? `${selected.size}대 구경하러 가기` : '차종을 골라주세요'}
          onPress={goFeed}
        />
        <Pressable onPress={goFeed} hitSlop={8}>
          <Text className="font-sans text-[15px] text-text2">건너뛰기</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function CarCard({
  brand,
  name,
  selected,
  onPress,
}: {
  brand: string;
  name: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      className={`h-20 basis-[48%] flex-grow flex-row items-center justify-between overflow-hidden rounded-lg px-4 py-2 ${
        selected ? 'border-2 border-accent bg-accentBody' : 'bg-surface2'
      }`}>
      <View className="gap-1">
        <Text className="font-sans text-[15px] text-textBody">{brand}</Text>
        <Text className="font-sans-medium text-lg text-text1">{name}</Text>
      </View>
      <View className="h-[43px]">
        <View
          className={`size-5 items-center justify-center rounded-[10px] border-2 ${
            selected ? 'border-accent bg-accent' : 'border-lineStrong bg-surface1'
          }`}>
          <Image
            source={
              selected
                ? require('@/assets/icons/check-on.svg')
                : require('@/assets/icons/check-off.svg')
            }
            style={{ width: 12, height: 12 }}
          />
        </View>
      </View>
    </Pressable>
  );
}
