import { Image } from 'expo-image';
import { AssetField, MediaType, Query, usePermissions, type Asset } from 'expo-media-library';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Cta } from '@/components/cta';
import { UploadHeader } from '@/components/upload-header';
import { INITIAL_CROP, useUpload } from '@/components/upload-store';

const COLUMNS = 4;
const GAP = 3;
const MAX = 10;

// Figma "11 Upload 1 Pick / *"
export default function UploadPick() {
  const { width } = useWindowDimensions();
  const { setPhotos } = useUpload();
  const [permission, requestPermission] = usePermissions({ granularPermissions: ['photo'] });
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [preview, setPreview] = useState<string | null>(null);

  const granted = permission?.granted;

  useEffect(() => {
    if (!granted) return;
    new Query()
      .eq(AssetField.MEDIA_TYPE, MediaType.IMAGE)
      .orderBy({ key: AssetField.CREATION_TIME, ascending: false })
      .limit(200)
      .exe()
      .then((list) => {
        setAssets(list);
        if (list[0]) setPreview(list[0].id);
      });
  }, [granted]);

  const toggle = (id: string) => {
    setPreview(id);
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : s.length >= MAX ? s : [...s, id]));
  };

  const next = () => {
    setPhotos(selected.map((id) => ({ id, uri: id, crop: INITIAL_CROP })));
    router.push('/upload/crop');
  };

  const cell = (width - GAP * (COLUMNS - 1)) / COLUMNS;

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <View className="pt-2">
        <UploadHeader title="새 게시물" onNext={next} nextEnabled={selected.length > 0} />
      </View>

      {!granted ? (
        <View className="flex-1 justify-center gap-4 px-5">
          <Text className="text-center font-sans text-[15px] text-text3">
            사진을 올리려면 앨범 접근 권한이 필요해요
          </Text>
          <Cta label="앨범 접근 허용" onPress={requestPermission} />
        </View>
      ) : (
        <FlatList
          data={assets}
          keyExtractor={(a) => a.id}
          numColumns={COLUMNS}
          columnWrapperStyle={{ gap: GAP }}
          contentContainerStyle={{ gap: GAP, paddingBottom: 40 }}
          ListHeaderComponent={
            <View className="gap-5 pb-5 pt-5">
              <View style={{ width, height: width }} className="bg-surface2">
                {preview && <Image source={{ uri: preview }} contentFit="cover" style={{ width, height: width }} />}
              </View>
              <View className="flex-row items-end justify-between px-5">
                <Text className="font-sans-medium text-lg text-text1">최근 항목</Text>
                <Text className="font-sans text-[15px] text-text3">누른 순서대로 올라가요</Text>
              </View>
            </View>
          }
          renderItem={({ item }) => {
            const order = selected.indexOf(item.id);
            return (
              <Pressable onPress={() => toggle(item.id)} style={{ width: cell, height: cell }} className="bg-surface2">
                <Image source={{ uri: item.id }} contentFit="cover" style={{ width: cell, height: cell }} />
                <View
                  className={`absolute right-2.5 top-2.5 size-5 items-center justify-center rounded-[10px] border ${
                    order >= 0 ? 'border-accent bg-accent' : 'border-muted bg-[rgba(11,13,16,0.5)]'
                  }`}>
                  {order >= 0 && <Text className="font-mono text-[11px] text-onAccent">{order + 1}</Text>}
                </View>
              </Pressable>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}
