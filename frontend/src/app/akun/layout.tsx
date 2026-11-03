export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Dashboard Akun Pelajar',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AkunLayout({ children }: { children: React.ReactNode }) {
  return children;
}
