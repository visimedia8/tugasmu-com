'use client';

import { useEffect, useState } from 'react';

interface AdSenseSlotProps {
  className?: string;
  adSlot?: string;
  adFormat?: 'auto' | 'fluid' | 'rectangle';
  minHeight?: string;
}

export default function AdSenseSlot({ 
  className = '', 
  adSlot = 'dummy-slot', // Replace with actual ad slot ID later
  adFormat = 'auto',
  minHeight = 'min-h-[100px]' // Default min-height to prevent CLS
}: AdSenseSlotProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // When AdSense is ready, we would push the ad here:
    // try {
    //   (window.adsbygoogle = window.adsbygoogle || []).push({});
    // } catch (err) {
    //   console.error(err);
    // }
  }, []);

  if (!isClient) return <div className={`w-full bg-slate-50 flex flex-col items-center justify-center text-slate-400 text-sm border border-slate-200 border-dashed rounded-lg ${minHeight} ${className}`}>Memuat Iklan...</div>;

  return (
    <div className={`w-full overflow-hidden flex justify-center my-4 ${className} ${minHeight}`}>
      {/* Placeholder for development */}
      <div className={`w-full bg-slate-50 flex flex-col items-center justify-center text-slate-400 text-sm border border-slate-200 border-dashed rounded-lg ${minHeight}`}>
        <span>Ruang Iklan (AdSense Placeholder)</span>
        <span className="text-xs">Slot: {adSlot} | Format: {adFormat}</span>
      </div>

      {/* Actual AdSense Code (Uncomment and configure later) */}
      {/* <ins className="adsbygoogle"
           style={{ display: 'block', width: '100%' }}
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with actual client ID
           data-ad-slot={adSlot}
           data-ad-format={adFormat}
           data-full-width-responsive="true"></ins> */}
    </div>
  );
}
