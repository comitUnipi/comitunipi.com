import Footer from '@/components/core-footer';
import Navbar from '@/components/core-navbar';
import Loading from '@/components/loading';
import useLoading from '@/hooks/use-loading';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { isLoading } = useLoading();
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <main className="bg-white">{children}</main>
      <Footer />
    </>
  );
}
