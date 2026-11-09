import { Image } from 'expo-image';
import { useState, type ReactNode } from 'react';
import { Pressable, Text, TextInput, View, type TextInputProps } from 'react-native';

type Props = TextInputProps & {
  label?: string;
  /** 오른쪽 액세서리 (예: 타이머, 버튼) */
  right?: ReactNode;
  /** true면 비밀번호 보기/숨기기 토글 표시 */
  password?: boolean;
  helper?: ReactNode;
};

// Figma "Field / *" — 기본: surface2 + lineStrong 1px, 포커스: accentBody + accent 2px
export function TextField({ label, right, password, helper, onFocus, onBlur, ...rest }: Props) {
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);

  return (
    <View className="w-full gap-2">
      {label && <Text className="font-sans text-[15px] text-text3">{label}</Text>}
      <View
        className={`h-[52px] flex-row items-center gap-2 rounded-xl px-3.5 ${
          focused ? 'border-2 border-accent bg-accentBody' : 'border border-lineStrong bg-surface2'
        }`}>
        <TextInput
          {...rest}
          secureTextEntry={password && !visible}
          placeholderTextColor="#969CA8"
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          className={`h-full flex-1 p-0 font-sans-medium text-lg ${focused ? 'text-onAccent' : 'text-textBody'}`}
        />
        {right}
        {password && (
          <Pressable
            onPress={() => setVisible((v) => !v)}
            hitSlop={8}
            accessibilityLabel={visible ? '비밀번호 숨기기' : '비밀번호 보기'}
            className="size-5 items-center justify-center">
            {visible ? (
              <Image source={require('@/assets/icons/eye-off.svg')} style={{ width: 18.6675, height: 18.6667 }} />
            ) : (
              <Image source={require('@/assets/icons/eye.svg')} style={{ width: 18.6675, height: 13.6656 }} />
            )}
          </Pressable>
        )}
      </View>
      {helper}
    </View>
  );
}
