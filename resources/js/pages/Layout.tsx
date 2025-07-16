import Footer from '@/components/core-footer';
import Navbar from '@/components/core-navbar';

export default function MainLayout({ children }) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    );
}
