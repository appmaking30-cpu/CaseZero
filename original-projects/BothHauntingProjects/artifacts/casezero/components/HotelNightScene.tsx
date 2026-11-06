import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

export default function HotelNightScene({ height = 220 }: { height?: number }) {
  return (
    <Svg width="100%" height={height} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
      <Defs>
        <LinearGradient id="hotelWall" x1="0" y1="0" x2="0" y2="1"><Stop offset="0" stopColor="#263746" /><Stop offset="1" stopColor="#101A26" /></LinearGradient>
        <LinearGradient id="hotelFloor" x1="0" y1="0" x2="0" y2="1"><Stop offset="0" stopColor="#5B4A43" /><Stop offset="1" stopColor="#171923" /></LinearGradient>
        <LinearGradient id="hotelLight" x1="0" y1="0" x2="0" y2="1"><Stop offset="0" stopColor="#E8C98C" stopOpacity="0.8" /><Stop offset="1" stopColor="#E8C98C" stopOpacity="0" /></LinearGradient>
      </Defs>
      <Rect width="1600" height="900" fill="url(#hotelWall)" />
      <Path d="M0 0 L1600 0 L1190 420 L410 420 Z" fill="#111C28" />
      <Path d="M0 0 L410 420 L410 900 L0 900 Z" fill="#172634" />
      <Path d="M1600 0 L1190 420 L1190 900 L1600 900 Z" fill="#111E2A" />
      <Path d="M410 420 L1190 420 L1600 900 L0 900 Z" fill="url(#hotelFloor)" />
      <Path d="M0 690 L1600 690" stroke="#C3A16D" strokeWidth="5" opacity="0.4" />
      <Path d="M0 744 L1600 744" stroke="#D9C49E" strokeWidth="2" opacity="0.15" />
      <Path d="M410 420 L0 900 M1190 420 L1600 900" stroke="#A88D6A" strokeWidth="5" opacity="0.3" />
      <Path d="M410 420 L1190 420" stroke="#83909A" strokeWidth="4" opacity="0.35" />
      <Rect x="570" y="180" width="460" height="255" rx="6" fill="#101923" stroke="#77838D" strokeWidth="8" />
      <Rect x="594" y="202" width="412" height="210" fill="#273A49" />
      <Path d="M594 302 L1006 302" stroke="#B89B6E" strokeWidth="4" opacity="0.6" />
      <Path d="M790 202 L790 412 M798 202 L798 412" stroke="#71808C" strokeWidth="3" opacity="0.4" />
      <Rect x="628" y="226" width="130" height="150" fill="#101A25" />
      <Rect x="842" y="226" width="130" height="150" fill="#101A25" />
      <Rect x="648" y="246" width="90" height="110" fill="#B98F59" opacity="0.48" />
      <Rect x="862" y="246" width="90" height="110" fill="#B98F59" opacity="0.38" />
      <Path d="M0 410 L410 420 L410 900 L0 900 Z" fill="#0C1722" opacity="0.4" />
      <Path d="M1190 420 L1600 410 L1600 900 L1190 900 Z" fill="#0C1722" opacity="0.35" />
      <Rect x="145" y="300" width="15" height="260" fill="#0B141E" />
      <Rect x="120" y="275" width="65" height="42" rx="5" fill="#D9B77B" />
      <Path d="M152 318 L-10 650 L320 650 Z" fill="url(#hotelLight)" opacity="0.28" />
      <Rect x="1380" y="300" width="15" height="260" fill="#0B141E" />
      <Rect x="1355" y="275" width="65" height="42" rx="5" fill="#D9B77B" />
      <Path d="M1387 318 L1220 650 L1550 650 Z" fill="url(#hotelLight)" opacity="0.22" />
      <Rect x="1040" y="515" width="300" height="170" rx="8" fill="#182430" stroke="#7B756D" strokeWidth="5" />
      <Rect x="1060" y="535" width="260" height="130" fill="#2B3942" />
      <Path d="M1070 572 L1310 572 M1070 610 L1310 610" stroke="#A88A60" strokeWidth="4" opacity="0.7" />
      <Rect x="1090" y="548" width="74" height="18" rx="3" fill="#C6A36D" />
      <Rect x="1180" y="548" width="100" height="18" rx="3" fill="#D4C5A2" opacity="0.75" />
      <Path d="M1220 0 L1220 120 L1280 120 L1280 172" stroke="#6D7D88" strokeWidth="18" fill="none" />
      <Path d="M1280 172 L1280 225" stroke="#D1B17A" strokeWidth="5" opacity="0.65" />
      <Path d="M1265 225 Q1280 245 1295 225" stroke="#D1B17A" strokeWidth="4" fill="none" />
      <Circle cx="1280" cy="254" r="10" fill="#D8B77D" opacity="0.8" />
      <Path d="M0 0 L1600 0 L1600 900 L0 900 Z" fill="#08111B" opacity="0.22" />
      <Rect x="0" y="0" width="1600" height="900" fill="none" stroke="#B8C2CB" strokeOpacity="0.14" strokeWidth="4" />
    </Svg>
  );
}
