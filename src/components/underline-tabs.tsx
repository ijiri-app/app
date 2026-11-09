import type { ReactNode } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

// Figma 상단 밑줄 탭 (피드 차종 탭 / 검색 결과 탭)
export function UnderlineTabs<T extends string>({
  items,
  value,
  onChange,
  label = (v) => v,
  trailing,
}: {
  items: readonly T[];
  value: T;
  onChange: (v: T) => void;
  label?: (v: T) => string;
  trailing?: ReactNode;
}) {
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-5">
        {items.map((item) => {
          const active = item === value;
          return (
            <Pressable
              key={item}
              onPress={() => onChange(item)}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              className="p-2">
              <Text className={`font-sans-medium text-lg ${active ? 'text-text1' : 'text-text2'}`}>{label(item)}</Text>
              {active && <View className="absolute bottom-0 left-0 right-0 h-1 bg-accent" />}
            </Pressable>
          );
        })}
        {trailing}
      </ScrollView>
      <View className="h-px bg-surface3" />
    </View>
  );
}
