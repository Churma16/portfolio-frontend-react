export const PixelPlay = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        style={{ shapeRendering: "crispEdges" }} // KUNCI: Biar garisnya tajam kotak-kotak
    >
        {/* Menggambar segitiga Play dengan kotak-kotak */}
        <path d="M6 4h2v2h2v2h2v2h2v2h2v2h-2v2h-2v2h-2v2h-2v2h-2V4z" />
    </svg>
);

export const PixelChat = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        style={{ shapeRendering: "crispEdges" }}
    >
        {/* Menggambar Bubble Chat kotak-kotak */}
        <path d="M2 6h20v12h-2v2h-2v2h-2v-2H2V6zm2 2v8h12v-2h2V8H4z" />
        {/* Garis-garis isi chat */}
        <rect x="6" y="10" width="8" height="2" />
        <rect x="6" y="13" width="5" height="2" />
    </svg>
);

export const PixelDownload = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    style={{ shapeRendering: 'crispEdges' }}
  >
    {/* Gambar Panah Bawah Kotak-kotak */}
    <path d="M11 5h2v8h2v-2h2v2h-2v2h-2v2h-2v-2H9v-2H7v-2h2v2h2V5z" />
    {/* Garis Bawah (Tray) */}
    <path d="M6 18h12v2H6v-2z" />
  </svg>
);