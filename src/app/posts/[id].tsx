import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackButton } from '@/components/back-button';
import { CATEGORY_LABEL, PartChip, type PartCategory } from '@/components/part-chip';
import { POST_DETAIL } from '@/data/mock';

const CATEGORIES: PartCategory[] = ['ext', 'int', 'pwr', 'und'];

// Figma "08 Post Detail"
export default function PostDetail() {
  // TODO: useLocalSearchParams 의 id 로 게시글 조회
  const post = POST_DETAIL;
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [page, setPage] = useState(0);
  const [liked, setLiked] = useState(false);
  const imageHeight = (width * 503) / 402;

  return (
    <View className="flex-1 bg-bg">
      <ScrollView contentContainerClassName="gap-3" contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => setPage(Math.round(e.nativeEvent.contentOffset.x / width))}>
          {post.images.map((src, i) => (
            <Image key={i} source={src} contentFit="cover" style={{ width, height: imageHeight }} />
          ))}
        </ScrollView>

        <View className="flex-row items-center justify-center gap-1.5 px-5">
          {post.images.map((_, i) => (
            <View key={i} className={`h-1.5 rounded ${i === page ? 'w-6 bg-accent' : 'w-1.5 bg-muted'}`} />
          ))}
        </View>

        <View className="flex-row items-end justify-between px-5">
          <Link href={{ pathname: '/members/[id]', params: { id: post.author.id } }} asChild>
            <Pressable className="flex-row items-center gap-2.5">
              <Image source={post.author.avatar} style={{ width: 36, height: 36, borderRadius: 24 }} />
              <View className="h-9 justify-between">
                <Text className="font-sans-semibold text-[15px] text-text1">{post.author.nickname}</Text>
                <Text className="font-sans text-[13px] text-text3">
                  {post.car} · {post.year} · {post.style}
                </Text>
              </View>
            </Pressable>
          </Link>
          <View className="flex-row items-center gap-0.5">
            <Text className="font-mono text-[11px] text-text3">{post.daysAgo}</Text>
            <Text className="font-sans text-[13px] text-text3">일전</Text>
          </View>
        </View>

        <View className="gap-4 px-5">
          <Text className="font-sans-semibold text-2xl text-text1">{post.title}</Text>
          <Text className="font-sans text-[15px] text-textBody">
            {post.body}
            {'\n'}
            <Text className="text-accent">{post.tags.map((t) => `#${t}`).join(' ')}</Text>
          </Text>
        </View>

        <View className="flex-row gap-2 px-5">
          <Pressable
            onPress={() => setLiked((v) => !v)}
            accessibilityLabel="좋아요"
            className="h-8 flex-row items-center gap-2 rounded-2xl bg-surface2 px-[15px]">
            <Image
              source={require('@/assets/icons/heart.svg')}
              style={{ width: 16, height: 16 }}
              tintColor={liked ? '#2D62FF' : undefined}
            />
            <Text className="font-mono text-[13px] text-text1">{post.likes + (liked ? 1 : 0)}</Text>
          </Pressable>
          {/* TODO: 댓글 */}
          <Pressable accessibilityLabel="댓글" className="h-8 flex-row items-center gap-2 rounded-2xl bg-surface2 px-[15px]">
            <Image source={require('@/assets/icons/message.svg')} style={{ width: 16, height: 16 }} />
            <Text className="font-mono text-[13px] text-text1">{post.comments}</Text>
          </Pressable>
        </View>

        <View className="h-2 bg-bgDeep" />

        <View className="flex-row items-end justify-between px-5">
          <Text className="font-sans-semibold text-2xl text-text1">튜닝 목록</Text>
          <View className="flex-row items-center gap-0.5">
            <Text className="font-mono text-[11px] text-text3">{post.partCount}</Text>
            <Text className="font-sans text-[13px] text-text3">개</Text>
          </View>
        </View>

        {CATEGORIES.map((cat) => {
          const parts = post.parts.filter((p) => p.category === cat);
          if (parts.length === 0) return null;
          return (
            <View key={cat} className="gap-2 px-5">
              <View className="flex-row items-end gap-2">
                <Text className="font-sans-medium text-lg text-text1">{CATEGORY_LABEL[cat]}</Text>
                <Text className="font-mono text-[13px] text-text3">{parts.length}</Text>
              </View>
              <View className="flex-row flex-wrap gap-2">
                {parts.map((p) => (
                  <PartChip key={p.id} {...p} />
                ))}
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View className="absolute left-5" style={{ top: insets.top + 6 }}>
        <BackButton />
      </View>
    </View>
  );
}
