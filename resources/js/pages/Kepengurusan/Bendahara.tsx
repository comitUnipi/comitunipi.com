import KepengurusanCard from '@/components/core-card-kepengurusan';
import Heading from '@/components/core-heading';
import KepengurusanHeading from '@/components/core-heading-kepengurusan';
import { kepengurusan } from '@/constants/kepengurusan/bendahara';
import MainLayout from '../Layout';
import { Head } from '@inertiajs/react';

export default function Bendahara() {
    return (
        <>
        <Head title='Bendahara Kami' />
            <MainLayout>
                <Heading img="/images/100101.png" />
                <section className="pt-20 pb-10 lg:pt-[120px] lg:pb-20">
                    <div className="container mx-auto">
                        <KepengurusanHeading jobdesk="Bendahara Kami" />
                        <div className="mx-4 flex flex-wrap justify-center gap-20">
                            {kepengurusan.map((pengurus) => (
                                <KepengurusanCard key={pengurus.id} pengurus={pengurus} />
                            ))}
                        </div>
                    </div>
                </section>
            </MainLayout>
        </>
    );
}
