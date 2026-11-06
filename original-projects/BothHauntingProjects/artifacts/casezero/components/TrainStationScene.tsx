import Svg, { Circle, Defs, Ellipse, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

export default function TrainStationScene({ height = 220 }: { height?: number }) {
  return (
    <Svg width="100%" height={height} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
      <Defs>
        <LinearGradient id="nightSky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#17283A" />
          <Stop offset="0.58" stopColor="#24374A" />
          <Stop offset="1" stopColor="#0B1420" />
        </LinearGradient>
        <LinearGradient id="platformFloor" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#394653" />
          <Stop offset="1" stopColor="#090F18" />
        </LinearGradient>
        <LinearGradient id="trainBody" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#53616B" />
          <Stop offset="0.3" stopColor="#263642" />
          <Stop offset="1" stopColor="#111B26" />
        </LinearGradient>
        <LinearGradient id="windowGlow" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#E9C98C" stopOpacity="0.9" />
          <Stop offset="1" stopColor="#9B7148" stopOpacity="0.25" />
        </LinearGradient>
        <LinearGradient id="lampGlow" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#F2D39A" stopOpacity="0.9" />
          <Stop offset="1" stopColor="#E2B66F" stopOpacity="0" />
        </LinearGradient>
      </Defs>
      <Rect width="1600" height="900" fill="url(#nightSky)" />
      <Circle cx="1290" cy="140" r="94" fill="#D4C4A0" opacity="0.12" />
      <Path d="M0 350 L1600 250 L1600 0 L0 0 Z" fill="#0A1420" opacity="0.36" />
      <Path d="M0 110 L1600 30 L1600 76 L0 166 Z" fill="#111D2A" />
      <Path d="M0 170 L1600 92 L1600 110 L0 190 Z" fill="#617080" opacity="0.32" />
      <Path d="M0 0 L1600 0 L1600 36 L0 124 Z" fill="#0A111A" />
      {Array.from({ length: 9 }, (_, i) => {
        const x = i * 220 - 40;
        return <Path key={i} d={`M${x} 0 L${x + 38} 0 L${x + 168} 310 L${x + 132} 314 Z`} fill="#0D1722" opacity="0.86" />;
      })}
      <Path d="M0 318 L1600 248 L1600 285 L0 365 Z" fill="#0C1621" />
      <Path d="M0 365 L1600 286 L1600 312 L0 393 Z" fill="#71808D" opacity="0.35" />
      <Path d="M0 398 L1600 332 L1600 580 L0 620 Z" fill="#182635" />
      <Path d="M0 620 L1600 580 L1600 900 L0 900 Z" fill="url(#platformFloor)" />
      <Path d="M0 655 L1600 604" stroke="#D7B978" strokeWidth="5" opacity="0.55" />
      <Path d="M0 688 L1600 638" stroke="#E6D7B3" strokeWidth="2" opacity="0.2" />
      <Path d="M0 850 L1600 790" stroke="#71808A" strokeWidth="3" opacity="0.25" />
      <Path d="M0 885 L1600 830" stroke="#71808A" strokeWidth="3" opacity="0.2" />
      <Path d="M0 740 L1600 690" stroke="#0A1119" strokeWidth="18" opacity="0.5" />
      <Path d="M0 780 L1600 730" stroke="#AAB4BB" strokeWidth="3" opacity="0.24" />
      <Path d="M0 900 L1600 830" stroke="#070C12" strokeWidth="20" opacity="0.65" />
      <Path d="M130 378 L130 620 M1460 322 L1460 586" stroke="#0B121B" strokeWidth="22" />
      <Path d="M118 390 L118 610 M1448 334 L1448 574" stroke="#697783" strokeWidth="4" opacity="0.55" />
      <Path d="M0 458 L1600 404" stroke="#A8B3BA" strokeWidth="2" opacity="0.12" />
      <Path d="M0 478 L1600 424" stroke="#A8B3BA" strokeWidth="2" opacity="0.12" />
      <Path d="M0 515 L1600 463" stroke="#A8B3BA" strokeWidth="2" opacity="0.1" />
      <Path d="M0 0 L0 560 L340 544 L340 365 L0 398 Z" fill="#0C1723" opacity="0.6" />
      <Path d="M1600 0 L1600 520 L1270 535 L1270 320 L1600 300 Z" fill="#0B1520" opacity="0.5" />
      <Path d="M0 500 L930 470 L930 630 L0 660 Z" fill="url(#trainBody)" />
      <Path d="M0 500 L930 470 L930 492 L0 523 Z" fill="#87939A" opacity="0.55" />
      {Array.from({ length: 6 }, (_, i) => <Rect key={i} x={44 + i * 142} y={526 - i * 4} width="104" height="74" rx="5" fill="url(#windowGlow)" opacity="0.86" />)}
      <Path d="M930 470 L1028 486 L1060 616 L930 598 Z" fill="#1B2B38" />
      <Path d="M1018 501 L1080 520 L1080 607 L1052 615 Z" fill="#D5B879" opacity="0.7" />
      <Ellipse cx="1038" cy="600" rx="28" ry="12" fill="#F2D39A" opacity="0.3" />
      <Path d="M0 648 L930 620 L1110 650 L0 690 Z" fill="#0B1119" opacity="0.6" />
      <Path d="M1080 345 L1094 345 L1110 560 L1064 560 Z" fill="#101A25" />
      <Rect x="1065" y="324" width="44" height="23" rx="4" fill="#E4C48B" />
      <Path d="M1087 347 L1008 600 L1168 600 Z" fill="url(#lampGlow)" opacity="0.23" />
      <Rect x="1370" y="372" width="12" height="182" fill="#111A25" />
      <Rect x="1350" y="352" width="52" height="30" rx="4" fill="#D7B879" />
      <Path d="M1376 382 L1290 590 L1462 590 Z" fill="url(#lampGlow)" opacity="0.16" />
      <Path d="M0 0 L1600 0 L1600 900 L0 900 Z" fill="#07101B" opacity="0.24" />
      <Rect x="0" y="0" width="1600" height="900" fill="none" stroke="#B8C2CB" strokeOpacity="0.14" strokeWidth="4" />
    </Svg>
  );
}
