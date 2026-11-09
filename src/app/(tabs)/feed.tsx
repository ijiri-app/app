import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Chips } from '@/components/chips';
import { FeedCard } from '@/components/feed-card';
import { UnderlineTabs } from '@/components/underline-tabs';
import { FEED_POSTS, INTEREST_CARS, STYLE_TAGS } from '@/data/mock';

// Figma "07 Feed"
export default function Feed() {
  const [car, setCar] = useState('전체');
  const [tag, setTag] = useState(STYLE_TAGS[0]);
  const posts = car === '전체' ? FEED_POSTS : FEED_POSTS.filter((p) => p.car === car);

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-bg">
      <View className="flex-row items-center justify-between px-5 pt-2">
        <Link href="/upload/pick" asChild>
          <Pressable hitSlop={8} accessibilityLabel="올리기">
            <Image source={require('@/assets/icons/plus-32.svg')} style={{ width: 32, height: 32 }} />
          </Pressable>
        </Link>
        <Text className="font-logo text-[22px] text-text1">IJIRI</Text>
        {/* TODO: 알림 화면 */}
        <Pressable hitSlop={8} accessibilityLabel="알림">
          <Image source={require('@/assets/icons/bell.svg')} style={{ width: 32, height: 32 }} />
        </Pressable>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(p) => p.id}
        numColumns={2}
        columnWrapperClassName="gap-3 px-5"
        contentContainerClassName="gap-3 pb-32"
        ListHeaderComponent={
          <View className="mt-[34px] gap-3 pb-1">
            <UnderlineTabs
              items={['전체', ...INTEREST_CARS]}
              value={car}
              onChange={setCar}
              trailing={
                <Link href="/settings/interest-cars" asChild>
                  <Pressable className="justify-center p-2" accessibilityLabel="관심 차종 추가">
                    <Image source={require('@/assets/icons/plus-20.svg')} style={{ width: 20, height: 20 }} />
                  </Pressable>
                </Link>
              }
            />
            <Chips items={STYLE_TAGS} value={tag} onChange={setTag} />
          </View>
        }
        renderItem={({ item }) => (
          <View className="flex-1">
            <FeedCard post={item} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
