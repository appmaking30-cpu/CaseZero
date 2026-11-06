import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

type Variant = 'ada' | 'miles' | 'nia' | 'generic';

const palettes: Record<Variant, { glow: string; skin: string; coat: string; hair: string; accent: string }> = {
  ada: { glow: '#75504A', skin: '#D8AD8A', coat: '#29303B', hair: '#39242A', accent: '#D2AD73' },
  miles: { glow: '#405B68', skin: '#B98566', coat: '#202C37', hair: '#302923', accent: '#C7A16B' },
  nia: { glow: '#4A5D63', skin: '#8E5D49', coat: '#263D3D', hair: '#171A20', accent: '#A8B99B' },
  generic: { glow: '#45566A', skin: '#B88970', coat: '#273442', hair: '#24252C', accent: '#C7A66E' },
};

export default function SuspectPortrait({ variant = 'generic', size = 58 }: { variant?: Variant; size?: number }) {
  const p = palettes[variant];
  return (
    <Svg width={size} height={size} viewBox="0 0 160 160">
      <Defs>
        <LinearGradient id="portraitBg" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor={p.glow} />
          <Stop offset="1" stopColor="#101923" />
        </LinearGradient>
        <LinearGradient id="portraitCoat" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={p.coat} />
          <Stop offset="1" stopColor="#101720" />
        </LinearGradient>
      </Defs>
      <Rect width="160" height="160" rx="22" fill="url(#portraitBg)" />
      <Circle cx="80" cy="72" r="58" fill="#D9C7A5" opacity="0.08" />
      <Path d="M16 160 Q22 112 54 105 L106 105 Q138 114 144 160 Z" fill="url(#portraitCoat)" />
      <Path d="M58 104 L80 132 L102 104 L112 160 L48 160 Z" fill={p.accent} opacity="0.8" />
      <Path d="M68 94 L68 116 Q80 132 92 116 L92 94 Z" fill={p.skin} />
      {variant === 'ada' && <Path d="M42 72 Q34 20 78 18 Q126 16 120 72 L112 112 Q101 125 99 99 L98 64 Q82 81 60 65 L58 108 Q44 122 40 96 Z" fill={p.hair} />}
      {variant === 'miles' && <Path d="M44 60 Q39 20 80 18 Q121 18 118 62 L107 49 Q85 57 60 47 L51 73 Z" fill={p.hair} />}
      {variant === 'nia' && <><Circle cx="49" cy="47" r="18" fill={p.hair} /><Circle cx="67" cy="29" r="19" fill={p.hair} /><Circle cx="91" cy="28" r="19" fill={p.hair} /><Circle cx="111" cy="46" r="18" fill={p.hair} /><Path d="M40 52 Q37 91 52 108 L60 70 Z M120 52 Q123 91 108 108 L100 70 Z" fill={p.hair} /></>}
      <Path d="M51 61 Q53 42 80 40 Q107 42 109 65 L105 91 Q99 112 80 114 Q61 112 55 91 Z" fill={p.skin} />
      {variant !== 'nia' && <Path d={variant === 'ada' ? 'M48 61 Q42 25 79 22 Q116 24 112 60 Q96 48 83 50 Q64 53 48 61 Z' : 'M49 57 Q45 25 80 22 Q111 23 112 57 Q91 47 73 49 Q60 50 49 57 Z'} fill={p.hair} />}
      <Path d="M65 77 Q70 73 75 77 M86 77 Q91 73 96 77" stroke="#342B2B" strokeWidth="3" strokeLinecap="round" fill="none" />
      <Path d="M78 94 Q82 97 86 94" stroke="#7B4D42" strokeWidth="3" strokeLinecap="round" fill="none" />
      <Path d="M61 111 L80 133 L99 111" stroke="#E5D4B2" strokeWidth="3" fill="none" opacity="0.65" />
      <Rect x="1.5" y="1.5" width="157" height="157" rx="21" fill="none" stroke={p.accent} strokeOpacity="0.5" strokeWidth="3" />
    </Svg>
  );
}
