import { Image } from 'expo-image';
import { useEffect } from 'react';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

import type { CropState } from '@/components/upload-store';

// 3:4 프레임 안에서 끌기/핀치로 위치 조정
export function CropFrame({
  uri,
  width,
  crop,
  onChange,
}: {
  uri: string;
  width: number;
  crop: CropState;
  onChange: (c: CropState) => void;
}) {
  const height = (width * 4) / 3;
  const scale = useSharedValue(crop.scale);
  const x = useSharedValue(crop.x);
  const y = useSharedValue(crop.y);
  const startScale = useSharedValue(1);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  // 사진 전환/리셋/회전 시 외부 값 반영
  useEffect(() => {
    scale.set(crop.scale);
    x.set(crop.x);
    y.set(crop.y);
  }, [crop.scale, crop.x, crop.y, scale, x, y]);

  const commit = () => {
    'worklet';
    scheduleOnRN(onChange, { ...crop, scale: scale.get(), x: x.get(), y: y.get() });
  };

  const pan = Gesture.Pan()
    .onStart(() => {
      startX.set(x.get());
      startY.set(y.get());
    })
    .onUpdate((e) => {
      x.set(startX.get() + e.translationX);
      y.set(startY.get() + e.translationY);
    })
    .onEnd(commit);

  const pinch = Gesture.Pinch()
    .onStart(() => {
      startScale.set(scale.get());
    })
    .onUpdate((e) => {
      scale.set(Math.max(1, Math.min(5, startScale.get() * e.scale)));
    })
    .onEnd(commit);

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: x.get() },
      { translateY: y.get() },
      { scale: scale.get() },
      { rotate: `${crop.rotation}deg` },
    ],
  }));

  return (
    <GestureDetector gesture={Gesture.Simultaneous(pan, pinch)}>
      <View style={{ width, height }} className="overflow-hidden rounded-lg border border-white bg-surface2">
        <Animated.View style={[{ width, height }, style]}>
          <Image source={{ uri }} contentFit="cover" style={{ width, height }} />
        </Animated.View>
        <Image
          source={require('@/assets/icons/crop-grid.svg')}
          contentFit="fill"
          pointerEvents="none"
          style={{ position: 'absolute', inset: 0 }}
        />
      </View>
    </GestureDetector>
  );
}
