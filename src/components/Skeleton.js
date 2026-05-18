import React from 'react';

// Base shimmer animation
const shimmerStyle = {
  background: 'linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)',
  backgroundSize: '400px 100%',
  animation: 'shimmerAnim 1.4s ease-in-out infinite',
  borderRadius: 8,
};

export const SkeletonBox = ({ width = '100%', height = 16, radius = 8, style = {} }) => (
  <div style={{ ...shimmerStyle, width, height, borderRadius: radius, flexShrink: 0, ...style }} />
);

export const SkeletonText = ({ lines = 3, style = {} }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, ...style }}>
    {Array.from({ length: lines }).map((_, i) => (
      <SkeletonBox key={i} width={i === lines - 1 ? '65%' : '100%'} height={13} />
    ))}
  </div>
);

// Feature card skeleton
export const FeatureCardSkeleton = () => (
  <div style={{ background: 'white', borderRadius: 24, border: '1px solid rgba(34,197,94,0.1)', padding: 28 }}>
    <SkeletonBox width={56} height={56} radius={18} style={{ marginBottom: 20 }} />
    <SkeletonBox width="60%" height={20} style={{ marginBottom: 10 }} />
    <SkeletonText lines={2} />
    <SkeletonBox width="30%" height={12} style={{ marginTop: 20 }} />
  </div>
);

// Modal content skeleton
export const ModalSkeleton = ({ rows = 4 }) => (
  <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} style={{ background: '#fafafa', border: '1px solid #f0f0f0', borderRadius: 18, padding: '16px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, alignItems: 'center' }}>
          <SkeletonBox width="45%" height={18} />
          <SkeletonBox width={60} height={24} radius={20} />
        </div>
        <SkeletonBox height={8} radius={4} style={{ marginBottom: 6 }} />
        <SkeletonBox width="40%" height={10} />
      </div>
    ))}
  </div>
);

// Chart skeleton
export const ChartSkeleton = ({ bars = 6 }) => (
  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 100, padding: '0 4px' }}>
    {Array.from({ length: bars }).map((_, i) => (
      <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
        <SkeletonBox width="100%" height={20 + Math.random() * 60} radius={4} />
        <SkeletonBox width={24} height={10} />
      </div>
    ))}
  </div>
);

// Stats row skeleton
export const StatsSkeleton = ({ cols = 4 }) => (
  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 12 }}>
    {Array.from({ length: cols }).map((_, i) => (
      <div key={i} style={{ background: '#fafafa', borderRadius: 18, padding: '14px 16px' }}>
        <SkeletonBox width={36} height={36} radius={12} style={{ marginBottom: 10 }} />
        <SkeletonBox width="60%" height={22} style={{ marginBottom: 6 }} />
        <SkeletonBox width="80%" height={11} />
      </div>
    ))}
  </div>
);

// Map / image placeholder skeleton
export const ImageSkeleton = ({ height = 220, radius = 20 }) => (
  <SkeletonBox width="100%" height={height} radius={radius} />
);

// Full page loading skeleton
export const PageSkeleton = () => (
  <div style={{ padding: '88px 40px 40px', maxWidth: 1100, margin: '0 auto' }}>
    <SkeletonBox width={200} height={14} style={{ marginBottom: 16 }} />
    <SkeletonBox width="50%" height={48} style={{ marginBottom: 40 }} />
    <StatsSkeleton cols={4} />
    <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20 }}>
      {Array.from({ length: 6 }).map((_, i) => <FeatureCardSkeleton key={i} />)}
    </div>
  </div>
);

export const shimmerCSS = `
  @keyframes shimmerAnim {
    0%   { background-position: -400px 0; }
    100% { background-position:  400px 0; }
  }
`;

export default SkeletonBox;
