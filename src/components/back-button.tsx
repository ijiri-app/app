import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable } from 'react-native';

// Figma "Back Button" 32×32
export function BackButton({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress ?? (() => router.back())}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel="뒤로 가기"
      className="size-8">
      <Image source={require('@/assets/icons/back.svg')} style={{ width: 32, height: 32 }} />
    </Pressable>
  );
}
