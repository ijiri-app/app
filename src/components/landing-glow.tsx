import {
  Blur,
  Canvas,
  ColorMatrix,
  FractalNoise,
  Group,
  Oval,
  Paint,
  Rect,
} from '@shopify/react-native-skia';
import { StyleSheet, useWindowDimensions } from 'react-native';

// Figma "01 Landing" Glow 1–5 (89:518–522). 좌표는 402pt 프레임 기준 중심점.
const GLOWS = [
  { cx: 379.38, cy: 184.64, w: 278.45, h: 435.983, rot: 31.89, color: '#1943FC' },
  { cx: 91.83, cy: 141.6, w: 242.922, h: 393.174, rot: -28.64, color: '#3969FA' },
  { cx: 270.77, cy: 43.49, w: 225.926, h: 244.625, rot: -28.64, color: '#002EB7' },
  { cx: 188.52, cy: 177.61, w: 57.938, h: 509.526, rot: 132.83, color: '#FFFFFF' },
  { cx: 372.63, cy: 26.93, w: 87.909, h: 105.019, rot: 132.83, color: '#FFFFFF' },
];

// "03 Login" (135:1954–1958): 같은 글로우, 회전만 다름
const LOGIN_ROTATIONS = [139, 79, 79, -120, -120];

const FRAME_WIDTH = 402;
const HEIGHT = 520;

// alpha = 1 if luminance < 0.51 else 0 (가파른 선형 근사)
const GRAIN_MATRIX = [
  0, 0, 0, 0, 0,
  0, 0, 0, 0, 0,
  0, 0, 0, 0, 0,
  -212.5, -715.4, -72.1, 0, 510,
];

export function LandingGlow({ variant = 'landing' }: { variant?: 'landing' | 'login' }) {
  const { width } = useWindowDimensions();
  const scale = width / FRAME_WIDTH;
  const glows =
    variant === 'login' ? GLOWS.map((g, i) => ({ ...g, rot: LOGIN_ROTATIONS[i] })) : GLOWS;

  return (
    <Canvas style={[StyleSheet.absoluteFill, { height: HEIGHT * scale }]} pointerEvents="none">
      <Group transform={[{ scale }]}>
        {glows.map((g, i) => (
          <Group
            key={i}
            blendMode="plus"
            transform={[
              { translateX: g.cx },
              { translateY: g.cy },
              { rotate: (g.rot * Math.PI) / 180 },
            ]}>
            <Oval x={-g.w / 2} y={-g.h / 2} width={g.w} height={g.h} color={g.color}>
              <Blur blur={60} />
            </Oval>
          </Group>
        ))}
        {/* 노이즈 그레인: fractalNoise(0.5, 3 octaves) → luminanceToAlpha → 0.51 임계값, 글로우 영역에만 25% 검정 */}
        <Group layer={<Paint opacity={0.25} />}>
          {glows.map((g, i) => (
            <Group
              key={i}
              transform={[
                { translateX: g.cx },
                { translateY: g.cy },
                { rotate: (g.rot * Math.PI) / 180 },
              ]}>
              <Oval x={-g.w / 2} y={-g.h / 2} width={g.w} height={g.h} color="black">
                <Blur blur={60} />
              </Oval>
            </Group>
          ))}
          <Rect x={0} y={0} width={FRAME_WIDTH} height={HEIGHT} blendMode="dstIn">
            <FractalNoise freqX={0.5} freqY={0.5} octaves={3} seed={7213} />
            <ColorMatrix matrix={GRAIN_MATRIX} />
          </Rect>
        </Group>
      </Group>
    </Canvas>
  );
}

// CTA 하단 글로우 (89:511): 200×48 반타원, 버튼 하단 중앙, blur 30
export function ButtonGlow({ width }: { width: number }) {
  return (
    <Canvas style={StyleSheet.absoluteFill} pointerEvents="none">
      <Oval x={width / 2 - 100} y={52 - 24} width={200} height={48} color="#C5FFF1">
        <Blur blur={30} />
      </Oval>
    </Canvas>
  );
}
