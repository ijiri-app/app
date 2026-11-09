import { Image } from 'expo-image';
import { Link, type Href } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';

import type { FeedPost } from '@/data/mock';

// Figma "Feed Card": 이미지 + 캡션 한 줄 (왼쪽 제목, 오른쪽 메타)
export function GridCard({
  href,
  image,
  imageHeight = 176,
  title,
  meta,
}: {
  href: Href;
  image: number;
  imageHeight?: number;
  title?: string;
  meta?: ReactNode;
}) {
  return (
    <Link href={href} asChild>
      <Pressable className="gap-1 active:opacity-80">
        <Image source={image} contentFit="cover" style={{ width: '100%', height: imageHeight, borderRadius: 8 }} />
        {title && (
          <View className="flex-row items-center justify-between gap-2">
            <Text className="flex-shrink font-sans text-[13px] text-textBody" numberOfLines={1}>
              {title}
            </Text>
            {meta}
          </View>
        )}
      </Pressable>
    </Link>
  );
}

export function FeedCard({ post }: { post: FeedPost }) {
  return (
    <GridCard
      href={{ pathname: '/posts/[id]', params: { id: post.id } }}
      image={post.image}
      imageHeight={post.imageHeight}
      title={`${post.year}•${post.car}`}
      meta={
        <View className="flex-row gap-1">
          <Text className="font-sans text-[13px] text-text3">부품</Text>
          <Text className="font-sans text-[13px] text-text3">{post.partCount}</Text>
        </View>
      }
    />
  );
}
