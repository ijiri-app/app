import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, useWindowDimensions, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { scheduleOnRN } from 'react-native-worklets';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PhotoStrip, UploadHeader } from '@/components/upload-header';
import { useUpload, type PlateMask, type UploadPhoto } from '@/components/upload-store';

const BOX_W = 84;
const BOX_H = 40;

// Figma "11 Upload 3 Plate"
export default function UploadPlate() {
  const { width } = useWindowDimensions();
  const { photos, update } = useUpload();
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<'blur' | 'logo'>('blur');
  const photo = photos[index];
  if (!photo) return null;

  const frameW = width - 40;
  const frameH = (frameW * 4) / 3;
  // TODO: 번호판 자동 인식. 지금은 기본 위치에 박스를 놓고 사용자가 옮김
  const mask: PlateMask = photo.plate ?? {
    mode,
    x: frameW / 2 - BOX_W / 2,
    y: frameH * 0.66,
    w: BOX_W,
    h: BOX_H,
  };

  const setMask = (m: PlateMask) => update(photo.id, { plate: m });

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <View className="flex-1 gap-5 pt-2">
        <UploadHeader
          title="번호판 가리기"
          onNext={() => router.push('/upload/tag')}
        />
        <View className="items-center gap-4">
          <PlateEditor photo={photo} width={frameW} mask={photo.plate === null ? null : mask} onChange={setMask} />
          <Text className="self-start px-5 font-sans text-[15px] text-text3">
            사진은 3:4로 올라가요. 끌거나 두 손가락으로 위치를 맞춰 주세요.
          </Text>
          <PhotoStrip uris={photos.map((p) => p.uri)} index={index} onSelect={setIndex} />
        </View>
      </View>

      <View className="gap-2 pb-6">
        <View className="px-5">
          <View className="flex-row gap-2 rounded-xl bg-surface2 p-1">
            {(['blur', 'logo'] as const).map((m) => {
              const active = m === mode;
              return (
                <Pressable
                  key={m}
                  onPress={() => {
                    setMode(m);
                    if (mask) setMask({ ...mask, mode: m });
                  }}
                  className={`flex-1 items-center rounded-xl py-2.5 ${active ? 'bg-surface4' : ''}`}>
                  <Text className={`font-sans-semibold text-[15px] ${active ? 'text-onAccent' : 'text-iconOff'}`}>
                    {m === 'blur' ? '흐리게' : '로고 스티커'}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
        <View className="flex-row gap-3 px-5">
          <Pressable
            onPress={() => setMask({ mode, x: frameW / 2 - BOX_W / 2, y: frameH / 2 - BOX_H / 2, w: BOX_W, h: BOX_H })}
            className="flex-1 items-center rounded-xl bg-surface2 py-2.5 active:opacity-80">
            <Text className="font-sans-semibold text-[15px] text-onAccent">직접 그리기</Text>
          </Pressable>
          <Pressable
            onPress={() => setMask(null)}
            className="flex-1 items-center rounded-xl bg-surface2 py-2.5 active:opacity-80">
            <Text className="font-sans-semibold text-[15px] text-onAccent">번호판 없음</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

function PlateEditor({
  photo,
  width,
  mask,
  onChange,
}: {
  photo: UploadPhoto;
  width: number;
  mask: PlateMask;
  onChange: (m: PlateMask) => void;
}) {
  const height = (width * 4) / 3;
  const { crop } = photo;
  const imageTransform = [
    { translateX: crop.x },
    { translateY: crop.y },
    { scale: crop.scale },
    { rotate: `${crop.rotation}deg` },
  ];

  const move = (dx: number, dy: number) => {
    if (!mask) return;
    onChange({
      ...mask,
      x: Math.max(0, Math.min(width - mask.w, mask.x + dx)),
      y: Math.max(0, Math.min(height - mask.h, mask.y + dy)),
    });
  };

  const pan = Gesture.Pan()
    .onEnd((e) => {
      scheduleOnRN(move, e.translationX, e.translationY);
    });

  return (
    <View style={{ width, height }} className="overflow-hidden rounded-lg bg-surface2">
      <View style={{ width, height, transform: imageTransform }}>
        <Image source={{ uri: photo.uri }} contentFit="cover" style={{ width, height }} />
      </View>
      {mask && (
        <GestureDetector gesture={pan}>
          <View
            style={{ position: 'absolute', left: mask.x, top: mask.y, width: mask.w, height: mask.h }}
            className="overflow-hidden rounded-lg border-2 border-dashed border-accent">
            {mask.mode === 'blur' ? (
              <View style={{ position: 'absolute', left: -mask.x, top: -mask.y, width, height, transform: imageTransform }}>
                <Image source={{ uri: photo.uri }} contentFit="cover" blurRadius={12} style={{ width, height }} />
              </View>
            ) : (
              <View className="flex-1 items-center justify-center bg-accent">
                <Text className="font-logo text-sm text-onAccent">IJIRI</Text>
              </View>
            )}
          </View>
        </GestureDetector>
      )}
    </View>
  );
}
