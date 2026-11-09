import { Link } from 'expo-router';
import { Pressable, Text } from 'react-native';

export type PartCategory = 'ext' | 'int' | 'pwr' | 'und';

export const CATEGORY_LABEL: Record<PartCategory, string> = {
  ext: '익스테리어',
  int: '인테리어',
  pwr: '파워트레인',
  und: '하체',
};

// Figma 부품 칩 (244:455–458) 카테고리별 배경색
const BG: Record<PartCategory, string> = {
  ext: 'bg-[#2E4A6E]',
  int: 'bg-[#6B4F2A]',
  pwr: 'bg-[#5A2E4E]',
  und: 'bg-[#2B5641]',
};

export function PartChip({ id, name, category }: { id: string; name: string; category: PartCategory }) {
  return (
    <Link href={{ pathname: '/parts/[id]', params: { id } }} asChild>
      <Pressable className={`items-center justify-center rounded-2xl px-3 py-1.5 active:opacity-80 ${BG[category]}`}>
        <Text className="font-sans text-[15px] text-onAccent">{name}</Text>
      </Pressable>
    </Link>
  );
}
