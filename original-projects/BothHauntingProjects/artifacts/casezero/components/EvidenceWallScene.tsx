import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

export default function EvidenceWallScene({ height = 180 }: { height?: number }) {
  return (
    <Svg width="100%" height={height} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
      <Defs>
        <LinearGradient id="wallWood" x1="0" y1="0" x2="1" y2="1"><Stop offset="0" stopColor="#29313A" /><Stop offset="0.55" stopColor="#151E28" /><Stop offset="1" stopColor="#0A111A" /></LinearGradient>
        <LinearGradient id="paper" x1="0" y1="0" x2="0" y2="1"><Stop offset="0" stopColor="#D8CFB8" /><Stop offset="1" stopColor="#9D9583" /></LinearGradient>
      </Defs>
      <Rect width="1600" height="900" fill="url(#wallWood)" />
      {Array.from({ length: 12 }, (_, i) => <Path key={i} d={`M0 ${i * 82} L1600 ${i * 82 - 35}`} stroke="#6D7780" strokeWidth="2" opacity="0.12" />)}
      <Rect x="72" y="85" width="360" height="270" rx="5" fill="url(#paper)" transform="rotate(-4 72 85)" />
      <Rect x="98" y="120" width="308" height="18" fill="#283746" opacity="0.9" transform="rotate(-4 98 120)" />
      <Rect x="98" y="165" width="238" height="8" fill="#68717A" opacity="0.65" transform="rotate(-4 98 165)" />
      <Rect x="98" y="188" width="270" height="8" fill="#68717A" opacity="0.5" transform="rotate(-4 98 188)" />
      <Rect x="98" y="211" width="220" height="8" fill="#68717A" opacity="0.5" transform="rotate(-4 98 211)" />
      <Rect x="98" y="246" width="110" height="70" fill="#647482" opacity="0.7" transform="rotate(-4 98 246)" />
      <Rect x="224" y="246" width="150" height="8" fill="#68717A" opacity="0.55" transform="rotate(-4 224 246)" />
      <Rect x="224" y="269" width="132" height="8" fill="#68717A" opacity="0.45" transform="rotate(-4 224 269)" />
      <Circle cx="258" cy="86" r="10" fill="#B94E43" stroke="#E4B1A0" strokeWidth="3" />
      <Rect x="570" y="120" width="320" height="390" rx="4" fill="#C7BDA5" transform="rotate(2 570 120)" />
      <Rect x="600" y="160" width="260" height="18" fill="#243548" transform="rotate(2 600 160)" />
      <Rect x="600" y="208" width="240" height="8" fill="#6D6B62" opacity="0.7" transform="rotate(2 600 208)" />
      <Rect x="600" y="235" width="250" height="8" fill="#6D6B62" opacity="0.55" transform="rotate(2 600 235)" />
      <Rect x="600" y="262" width="205" height="8" fill="#6D6B62" opacity="0.55" transform="rotate(2 600 262)" />
      <Rect x="600" y="315" width="245" height="145" fill="#667987" opacity="0.78" transform="rotate(2 600 315)" />
      <Path d="M620 420 L700 350 L760 395 L815 330 L840 420" stroke="#D5C6A3" strokeWidth="8" fill="none" opacity="0.65" />
      <Circle cx="728" cy="121" r="10" fill="#D1B16F" stroke="#F0DCA9" strokeWidth="3" />
      <Rect x="1080" y="90" width="360" height="280" rx="4" fill="#BFB49D" transform="rotate(4 1080 90)" />
      <Rect x="1110" y="130" width="300" height="12" fill="#283746" transform="rotate(4 1110 130)" />
      <Rect x="1110" y="166" width="230" height="8" fill="#6D6B62" opacity="0.7" transform="rotate(4 1110 166)" />
      <Rect x="1110" y="190" width="270" height="8" fill="#6D6B62" opacity="0.55" transform="rotate(4 1110 190)" />
      <Rect x="1110" y="214" width="205" height="8" fill="#6D6B62" opacity="0.55" transform="rotate(4 1110 214)" />
      <Rect x="1110" y="252" width="260" height="80" fill="#394A5A" opacity="0.8" transform="rotate(4 1110 252)" />
      <Circle cx="1280" cy="95" r="10" fill="#B94E43" stroke="#E4B1A0" strokeWidth="3" />
      <Path d="M420 260 L570 280 L890 310 L1080 260" stroke="#B14D42" strokeWidth="5" fill="none" opacity="0.9" />
      <Path d="M430 310 L600 390 L900 450 L1120 320" stroke="#C29A60" strokeWidth="4" fill="none" opacity="0.8" />
      <Path d="M890 310 L1080 200 L1280 95" stroke="#B14D42" strokeWidth="4" fill="none" opacity="0.7" />
      <Path d="M420 260 L260 86" stroke="#B14D42" strokeWidth="4" fill="none" opacity="0.75" />
      <Rect x="520" y="600" width="600" height="210" rx="8" fill="#0C151F" stroke="#6D7881" strokeWidth="5" />
      <Rect x="552" y="628" width="536" height="150" rx="4" fill="#1B2B3A" />
      <Rect x="590" y="660" width="170" height="90" fill="#D4C8AE" />
      <Rect x="786" y="660" width="260" height="9" fill="#A5A08F" opacity="0.7" />
      <Rect x="786" y="686" width="220" height="9" fill="#A5A08F" opacity="0.55" />
      <Rect x="786" y="712" width="240" height="9" fill="#A5A08F" opacity="0.55" />
      <Circle cx="820" cy="605" r="12" fill="#D1B16F" stroke="#F0DCA9" strokeWidth="3" />
      <Path d="M0 0 L1600 0 L1600 900 L0 900 Z" fill="#07101A" opacity="0.35" />
      <Rect x="0" y="0" width="1600" height="900" fill="none" stroke="#B8C2CB" strokeOpacity="0.14" strokeWidth="4" />
    </Svg>
  );
}
