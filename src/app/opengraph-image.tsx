import { ImageResponse } from 'next/og';
import { siteConfig } from '@/lib/data/metadata';

export const size = {
  width: 1200,
  height: 630,
};

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          color: '#fff',
        }}
      >
        <h1 style={{ fontSize: 60 }}>{siteConfig.name}</h1>
        <p style={{ fontSize: 30 }}>{siteConfig.description}</p>
      </div>
    ),
    {
      ...size,
    }
  );
}

