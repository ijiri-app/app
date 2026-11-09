import type { BottomTabBarProps } from 'expo-router/js-tabs';
import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ICONS: Record<string, { source: number; w: number; h: number; label: string }> = {
  feed: { source: require('@/assets/icons/tab-grid.svg'), w: 20, h: 20, label: '피드' },
  search: { source: require('@/assets/icons/tab-search.svg'), w: 20, h: 20, label: '검색' },
  upload: { source: require('@/assets/icons/tab-upload.svg'), w: 20, h: 20, label: '올리기' },
  wishlist: { source: require('@/assets/icons/tab-gauge.svg'), w: 24, h: 24, label: '위시리스트' },
  my: { source: require('@/assets/icons/tab-user.svg'), w: 16, h: 20, label: '마이' },
};

const glass = isLiquidGlassAvailable();

// Figma "Footer" (444:638): 떠 있는 64pt 캡슐, 활성 탭은 64×48 글래스 필
export function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      pointerEvents="box-none"
      className="absolute bottom-0 left-0 right-0 px-5"
      style={{ paddingBottom: Math.max(insets.bottom, 16) }}>
      <Container>
        {state.routes.map((route, index) => {
          const icon = ICONS[route.name];
          if (!icon) return null;
          const focused = state.index === index;
          const onPress = () => {
            // 올리기 탭은 탭 화면 대신 업로드 모달을 띄움
            if (route.name === 'upload') {
              router.push('/upload/pick');
              return;
            }
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!focused && !event.defaultPrevented) navigation.navigate(route.name, route.params);
          };
          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              accessibilityRole="tab"
              accessibilityState={{ selected: focused }}
              accessibilityLabel={icon.label}
              className="h-12 w-16 items-center justify-center overflow-hidden rounded-3xl">
              {focused &&
                (glass ? (
                  <GlassView isInteractive style={{ position: 'absolute', inset: 0, borderRadius: 24 }} />
                ) : (
                  <View className="absolute inset-0 rounded-3xl border border-white/10 bg-white/10" />
                ))}
              <View className="size-6 items-center justify-center">
                <Image
                  source={icon.source}
                  style={{ width: icon.w, height: icon.h }}
                  tintColor={focused ? '#F2F3F5' : '#8A909C'}
                />
              </View>
            </Pressable>
          );
        })}
      </Container>
    </View>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  const cls = 'h-16 flex-row items-center justify-center overflow-hidden rounded-[32px] px-4';
  if (glass) {
    return (
      <GlassView glassEffectStyle="regular" style={{ borderRadius: 32 }}>
        <View className={cls}>{children}</View>
      </GlassView>
    );
  }
  return <View className={`${cls} bg-[rgba(35,39,47,0.5)]`}>{children}</View>;
}
