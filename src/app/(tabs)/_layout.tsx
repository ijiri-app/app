import { Tabs } from 'expo-router/js-tabs';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="feed" options={{ title: '피드' }} />
      <Tabs.Screen name="search" options={{ title: '검색' }} />
      <Tabs.Screen name="upload" options={{ title: '올리기' }} />
      <Tabs.Screen name="wishlist" options={{ title: '위시리스트' }} />
      <Tabs.Screen name="my" options={{ title: '마이' }} />
    </Tabs>
  );
}
