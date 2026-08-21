import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Route segment config
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F3F2F0',
          borderRadius: '8px',
        }}
      >
        {/* We use a scaled down viewBox for the Shri mark */}
        <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#171512" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 9 14 H 39" />
            <path d="M 25 14 V 38" />
            <path d="M 35 14 V 38" />
            <path d="M 25 14 C 25 2, 35 2, 35 14" />
            <path d="M 25 25 L 17 25 C 11 25, 11 15, 17 15 C 21 15, 23 19, 15 27 L 9 37" />
            <path d="M 20 25 L 15 37" />
          </g>
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
