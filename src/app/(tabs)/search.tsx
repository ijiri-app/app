import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GridCard } from '@/components/feed-card';
import { UnderlineTabs } from '@/components/underline-tabs';
import { POPULAR_PARTS, RECENT_KEYWORDS, RECENT_MEMBERS, SEARCH_RESULTS } from '@/data/mock';

type Tab = 'all' | 'car' | 'part';
const TAB_LABEL: Record<Tab, string> = { all: '전체', car: '차량', part: '부품' };

// Figma "09 Search / Home" · "10 Search Result / *"
export default function Search() {
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const [members, setMembers] = useState(RECENT_MEMBERS);
  const [keywords, setKeywords] = useState(RECENT_KEYWORDS);

  const submit = (q: string) => {
    const t = q.trim();
    setInput(t);
    setQuery(t);
    if (t) setKeywords((k) => [t, ...k.filter((x) => x !== t)]);
  };

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-bg">
      <View className="px-5 pt-0">
        <View className="flex-row items-center gap-2.5 rounded-xl border border-lineStrong bg-surface2 px-3.5 py-2.5">
          <View className="size-6 items-center justify-center">
            <Image source={require('@/assets/icons/search.svg')} style={{ width: 20, height: 20 }} />
          </View>
          <TextInput
            value={input}
            onChangeText={(t) => {
              setInput(t);
              if (!t) setQuery('');
            }}
            onSubmitEditing={(e) => submit(e.nativeEvent.text)}
            placeholder="검색"
            placeholderTextColor="#969CA8"
            returnKeyType="search"
            className="flex-1 p-0 font-sans-medium text-lg text-text1"
          />
        </View>
      </View>

      {query ? (
        <Results query={query} />
      ) : (
        <ScrollView contentContainerClassName="gap-6 px-5 pb-32 pt-6" keyboardShouldPersistTaps="handled">
          {(members.length > 0 || keywords.length > 0) && (
            <View className="gap-4">
              <View className="flex-row items-end justify-between">
                <Text className="font-sans-medium text-lg text-text1">최근 검색</Text>
                <Pressable
                  hitSlop={8}
                  onPress={() => {
                    setMembers([]);
                    setKeywords([]);
                  }}>
                  <Text className="font-sans text-[15px] text-text3">모두 지우기</Text>
                </Pressable>
              </View>
              <View className="gap-2">
                {members.map((m, i) => (
                  <View key={m.id} className="flex-row items-center gap-2">
                    <Link href={{ pathname: '/members/[id]', params: { id: m.id } }} asChild>
                      <Pressable className="flex-1 flex-row items-center gap-2">
                        <View
                          className={`size-14 items-center justify-center rounded-full border ${
                            i === 0 ? 'border-accent' : 'border-lineStrong'
                          }`}>
                          <Image source={m.avatar} contentFit="cover" style={{ width: 50, height: 50, borderRadius: 25 }} />
                        </View>
                        <View className="flex-1 gap-1">
                          <Text className="font-sans-semibold text-[15px] text-text1">{m.nickname}</Text>
                          <Text className="font-sans text-[13px] text-text3">{m.meta}</Text>
                        </View>
                      </Pressable>
                    </Link>
                    <Pressable
                      hitSlop={8}
                      accessibilityLabel={`${m.nickname} 삭제`}
                      onPress={() => setMembers((ms) => ms.filter((x) => x.id !== m.id))}>
                      <Image source={require('@/assets/icons/x-24.svg')} style={{ width: 24, height: 24 }} />
                    </Pressable>
                  </View>
                ))}
              </View>
              <View className="flex-row flex-wrap gap-x-2 gap-y-3">
                {keywords.map((k) => (
                  <Pressable
                    key={k}
                    onPress={() => submit(k)}
                    className="flex-row items-center gap-2 rounded-2xl bg-surface2 px-3 py-1.5">
                    <Text className="font-sans text-[15px] text-text1">{k}</Text>
                    <Pressable
                      hitSlop={8}
                      accessibilityLabel={`${k} 삭제`}
                      onPress={() => setKeywords((ks) => ks.filter((x) => x !== k))}>
                      <Image source={require('@/assets/icons/x-16.svg')} style={{ width: 16, height: 16 }} />
                    </Pressable>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          <View className="gap-4">
            {/* TODO: 사용자의 대표 관심 차종으로 */}
            <Text className="font-sans-medium text-lg text-text1">아반떼 N 오너들이 많이 찾는 부품</Text>
            <View className="gap-1">
              {POPULAR_PARTS.map((p, i) => (
                <View key={p.id} className="gap-1">
                  {i > 0 && <View className="h-px bg-surface3" />}
                  <Link href={{ pathname: '/parts/[id]', params: { id: p.id } }} asChild>
                    <Pressable className="flex-row items-center justify-between py-2.5">
                      <View className="flex-row items-center gap-4">
                        <Text className={`font-mono text-[13px] ${i < 3 ? 'text-accent' : 'text-text3'}`}>{i + 1}</Text>
                        <Text className="font-sans-semibold text-[15px] text-onAccent">{p.name}</Text>
                      </View>
                      <Text className="font-sans text-[15px] text-text3">{p.type}</Text>
                    </Pressable>
                  </Link>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

function Results({ query }: { query: string }) {
  const [tab, setTab] = useState<Tab>('all');
  // TODO: 검색 API
  const all = SEARCH_RESULTS;
  const counts = { all: all.length, car: all.filter((r) => r.kind === 'car').length, part: all.filter((r) => r.kind === 'part').length };
  const data = tab === 'all' ? all : all.filter((r) => r.kind === tab);

  return (
    <FlatList
      data={data}
      keyExtractor={(r) => `${r.kind}-${r.id}`}
      numColumns={2}
      columnWrapperClassName="gap-3 px-5"
      contentContainerClassName="gap-3 pb-32"
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={
        <View className="pt-5">
          <UnderlineTabs
            items={['all', 'car', 'part'] as const}
            value={tab}
            onChange={setTab}
            label={(t) => `${TAB_LABEL[t]} ${counts[t]}`}
          />
        </View>
      }
      renderItem={({ item }) => (
        <View className="flex-1">
          <GridCard
            href={
              item.kind === 'car'
                ? { pathname: '/posts/[id]', params: { id: item.id } }
                : { pathname: '/parts/[id]', params: { id: item.id } }
            }
            image={item.image}
            title={item.title}
            meta={
              item.kind === 'car' ? <Text className="font-sans text-[13px] text-text3">{query} 포함</Text> : undefined
            }
          />
        </View>
      )}
    />
  );
}
