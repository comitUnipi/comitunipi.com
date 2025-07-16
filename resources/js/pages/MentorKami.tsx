import MentorCard from '@/components/core-card-mentor';
import Heading from '@/components/core-heading';
import SubHeading from '@/components/core-sub-heading';
import { mentors } from '@/constants/mentor';
import { Head } from '@inertiajs/react';
import MainLayout from './Layout';

export default function MentorKami() {
    return (
        <>
            <Head title="Mentor Kami" />
            <MainLayout>
                <Heading img="/images/100111.png" />
                <section className="pt-20 pb-10 lg:pt-[120px] lg:pb-20">
                    <div className="container mx-auto">
                        <SubHeading
                            subtitle="Mentor"
                            title="Perkenalkan Mentor Kami"
                            description="Kami mempunyai beberapa mentor yang sudah berpengalaman di bidangnya masing-masing."
                        />
                        <div className="mx-4 flex flex-wrap justify-center">
                            {mentors.map((mentor) => (
                                <MentorCard key={mentor.id} mentor={mentor} />
                            ))}
                        </div>
                    </div>
                </section>
            </MainLayout>
        </>
    );
}
