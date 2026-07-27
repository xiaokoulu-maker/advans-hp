import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import WhyRevans from '@/components/home/WhyRevans';
import Flow from '@/components/home/Flow';
import Works from '@/components/home/Works';
import ContactCta from '@/components/home/ContactCta';

// トップは layout の default タイトル（REVANS｜中小企業に、前進する革命を。）を使用
export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <WhyRevans />
      <Flow />
      <Works />
      <ContactCta />
    </>
  );
}
