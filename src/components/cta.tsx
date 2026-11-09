import { useState } from 'react';
import { Pressable, Text, type PressableProps } from 'react-native';

import { ButtonGlow } from '@/components/landing-glow';

type Props = Omit<PressableProps, 'children'> & {
  label: string;
  enabled?: boolean;
};

// Figma "CTA" 컴포넌트 (244:354 활성 / 244:359 비활성)
export function Cta({ label, enabled = true, className, ...rest }: Props & { className?: string }) {
  const [width, setWidth] = useState(0);

  return (
    <Pressable
      {...rest}
      disabled={!enabled}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      className={`h-[52px] w-full items-center justify-center overflow-hidden rounded-xl active:opacity-80 ${
        enabled ? 'bg-[#1C45F8]' : 'bg-surface2'
      } ${className ?? ''}`}>
      {enabled && width > 0 && <ButtonGlow width={width} />}
      <Text className={`font-sans-semibold text-xl ${enabled ? 'text-text1' : 'text-muted'}`}>
        {label}
      </Text>
    </Pressable>
  );
}
