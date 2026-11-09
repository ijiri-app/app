import { Image } from 'expo-image';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { BackButton } from '@/components/back-button';

// Figma "11 Upload *" 상단: 뒤로 + 제목 + 오른쪽 "다음"
export function UploadHeader({
  title,
  onNext,
  nextEnabled = true,
}: {
  title: string;
  onNext: () => void;
  nextEnabled?: boolean;
}) {
  return (
    <View className="flex-row items-center justify-between px-5">
      <View className="flex-row items-center gap-4">
        <BackButton />
        <Text className="font-sans-semibold text-2xl text-text1">{title}</Text>
      </View>
      <Pressable onPress={onNext} disabled={!nextEnabled} hitSlop={8}>
        <Text className={`font-sans-semibold text-[15px] ${nextEnabled ? 'text-accent' : 'text-muted'}`}>다음</Text>
      </Pressable>
    </View>
  );
}

// 하단 썸네일 스트립 (60×80, 선택 = accent 1.5px)
export function PhotoStrip({
  uris,
  index,
  onSelect,
}: {
  uris: string[];
  index: number;
  onSelect: (i: number) => void;
}) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2.5 px-5">
      {uris.map((uri, i) => (
        <Pressable key={uri + i} onPress={() => onSelect(i)}>
          <Image
            source={{ uri }}
            contentFit="cover"
            style={{
              width: 60,
              height: 80,
              borderRadius: 4,
              borderWidth: i === index ? 1.5 : 0,
              borderColor: '#2D62FF',
            }}
          />
        </Pressable>
      ))}
    </ScrollView>
  );
}
