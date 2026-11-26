import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mirabilia Early Learning Centre & Kindergarten',
    short_name: 'Mirabilia',
    start_url: '/',
    display: 'browser',
    background_color: '#fffcf6',
    theme_color: '#812990',
    icons: [{ src: '/icon.png', sizes: '512x512', type: 'image/png' }],
  };
}
