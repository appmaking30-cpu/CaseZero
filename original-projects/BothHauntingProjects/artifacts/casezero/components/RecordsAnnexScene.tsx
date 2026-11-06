import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

export default function RecordsAnnexScene({ height = 220 }: { height?: number }) {
  return (
    <Svg width="100%" height={height} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
      <Defs>
        <LinearGradient id="annexWall" x1="0" y1="0" x2="0" y2="1"><Stop offset="0" stopColor="#1C2A3B" /><Stop offset="1" stopColor="#090F19" /></LinearGradient>
        <LinearGradient id="annexDesk" x1="0" y1="0" x2="0" y2="1"><Stop offset="0" stopColor="#5A4A3B" /><Stop offset="1" stopColor="#171A20" /></LinearGradient>
      </Defs>
      <Rect width="1600" height="900" fill="url(#annexWall)" />
      <Path d="M0 0 L1600 0 L1600 180 L0 250 Z" fill="#0C1420" />
      <Path d="M0 250 L1600 180 L1600 700 L0 760 Z" fill="#172434" />
      {Array.from({ length: 5 }, (_, i) => {
        const x = 65 + i * 300;
        return <Svg key={i} x={x} y={245 + i * 3} width="260" height="455" viewBox="0 0 260 455">
          <Rect width="260" height="455" fill="#101A26" stroke="#697986" strokeWidth="8" />
          {Array.from({ length: 5 }, (_, row) => <Rect key={row} x="16" y={24 + row * 82} width="228" height="5" fill="#9A8060" opacity="0.6" />)}
          {Array.from({ length: 4 }, (_, row) => Array.from({ length: 4 }, (_, col) => <Rect key={row + "-" + col} x={23 + col * 54} y={34 + row * 82} width="42" height="68" rx="2" fill={["#8B6B4F", "#526779", "#A18B6D", "#43586B"][(row + col + i) % 4]} opacity="0.75" />))}
        </Svg>;
      })}
      <Path d="M0 700 L1600 660 L1600 900 L0 900 Z" fill="url(#annexDesk)" />
      <Path d="M0 730 L1600 688" stroke="#C2A274" strokeWidth="5" opacity="0.55" />
      <Rect x="410" y="485" width="510" height="205" rx="8" fill="#0C1520" stroke="#7C8790" strokeWidth="5" />
      <Rect x="438" y="510" width="454" height="155" fill="#223746" />
      <Rect x="466" y="532" width="210" height="105" fill="#101D29" />
      <Path d="M484 556 L656 556 M484 579 L640 579 M484 602 L620 602" stroke="#C6B18A" strokeWidth="5" opacity="0.6" />
      <Rect x="704" y="532" width="160" height="105" fill="#121E2A" />
      <Path d="M724 555 L840 555 M724 579 L840 579 M724 603 L818 603" stroke="#B9A477" strokeWidth="4" opacity="0.5" />
      <Rect x="980" y="535" width="250" height="150" rx="5" fill="#D3C6A7" />
      <Path d="M1010 570 L1200 570 M1010 595 L1180 595 M1010 620 L1160 620" stroke="#6E6558" strokeWidth="5" opacity="0.7" />
      <Rect x="1090" y="505" width="110" height="22" rx="3" fill="#9E3F3D" />
      <Path d="M0 0 L1600 0 L1600 900 L0 900 Z" fill="#07101A" opacity="0.24" />
      <Rect x="0" y="0" width="1600" height="900" fill="none" stroke="#B8C2CB" strokeOpacity="0.14" strokeWidth="4" />
    </Svg>
  );
}
