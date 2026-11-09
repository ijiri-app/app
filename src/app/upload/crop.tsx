import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CropFrame } from '@/components/crop-frame';
import { PhotoStrip, UploadHeader } from '@/components/upload-header';
import { INITIAL_CROP, useUpload } from '@/components/upload-store';

// Figma "11 Upload 2 Crop"
export default function UploadCrop() {
  const { width } = useWindowDimensions();
  const { photos, update } = useUpload();
  const [index, setIndex] = useState(0);
  const photo = photos[index];
  if (!photo) return null;

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <View className="flex-1 gap-5 pt-2">
        <UploadHeader title="이미지 자르기" onNext={() => router.push('/upload/plate')} />
        <View className="items-center gap-4">
          <CropFrame
            key={photo.id}
            uri={photo.uri}
            width={width - 40}
            crop={photo.crop}
            onChange={(crop) => update(photo.id, { crop })}
          />
          <Text className="self-start px-5 font-sans text-[15px] text-text3">
            사진은 3:4로 올라가요. 끌거나 두 손가락으로 위치를 맞춰 주세요.
          </Text>
          <PhotoStrip uris={photos.map((p) => p.uri)} index={index} onSelect={setIndex} />
        </View>
      </View>
      <View className="flex-row gap-3 px-5 pb-6">
        <Pressable
          onPress={() => update(photo.id, { crop: { ...photo.crop, rotation: (photo.crop.rotation + 90) % 360 } })}
          className="flex-1 items-center rounded-xl bg-surface2 py-2.5 active:opacity-80">
          <Text className="font-sans-semibold text-[15px] text-onAccent">90º 돌리기</Text>
        </Pressable>
        <Pressable
          onPress={() => update(photo.id, { crop: INITIAL_CROP })}
          className="flex-1 items-center rounded-xl bg-surface2 py-2.5 active:opacity-80">
          <Text className="font-sans-semibold text-[15px] text-onAccent">처음으로 돌리기</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
