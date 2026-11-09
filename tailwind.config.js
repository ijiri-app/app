/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      // Freesentation 굵기별로 패밀리가 따로 등록됨 (RN은 커스텀 폰트에 fontWeight를 매핑하지 않음)
      fontFamily: {
        sans: ['Freesentation-Regular'],
        'sans-medium': ['Freesentation-Medium'],
        'sans-semibold': ['Freesentation-SemiBold'],
        mono: ['JetBrainsMono-Medium'],
        logo: ['FugazOne-Regular'],
      },
      // Figma 이지리 color styles
      colors: {
        bg: '#111418',
        bgDeep: '#0B0D10',
        surface1: '#1B1F26',
        surface2: '#1E222A',
        surface3: '#23272F',
        surface4: '#2A2F38',
        lineStrong: '#3A404C',
        onAccent: '#FFFFFF',
        text1: '#F2F3F5',
        textBody: '#D5D8DE',
        text2: '#C9CDD4',
        text3: '#969CA8',
        iconOff: '#8A909C',
        muted: '#6B7180',
        accent: '#2D62FF',
        accentBody: '#202D46',
      },
    },
  },
  plugins: [],
};
