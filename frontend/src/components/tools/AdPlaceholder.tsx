export default function AdPlaceholder({ variant = 'horizontal' }: { variant?: 'horizontal' | 'sidebar' }) {
  if (process.env.NODE_ENV === 'development') {
    return (
      <div 
        className={`flex items-center justify-center bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg p-4 my-6 text-slate-400 text-sm font-medium ${
          variant === 'horizontal' ? 'w-full h-[100px]' : 'w-[300px] h-[250px]'
        }`}
      >
        Google AdSense Placeholder ({variant})
      </div>
    );
  }

  return (
    <div className={`my-6 ${variant === 'horizontal' ? 'w-full min-h-[100px]' : 'w-[300px] min-h-[250px]'}`}>
      {/* Insert real Google AdSense Ins code here */}
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // TODO: Add real publisher ID
           data-ad-slot="XXXXXXXXXX"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
}
