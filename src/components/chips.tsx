import { Pressable, ScrollView, Text } from 'react-native';

// Figma "Brand Chips": 32pt 캡슐, 활성 = text1 배경 + bgDeep SemiBold
export function Chips<T extends string>({
  items,
  value,
  onChange,
}: {
  items: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2 px-5">
      {items.map((item) => {
        const active = item === value;
        return (
          <Pressable
            key={item}
            onPress={() => onChange(item)}
            className={`h-8 items-center justify-center rounded-2xl px-3 ${active ? 'bg-text1' : 'bg-surface2'}`}>
            <Text className={`text-[15px] ${active ? 'font-sans-semibold text-bgDeep' : 'font-sans text-textBody'}`}>
              {item}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
