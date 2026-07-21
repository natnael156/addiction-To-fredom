import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Heart, Target, Shield } from 'lucide-react';

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>About Us — AddictionToFreedom</title>
        <meta
          name="description"
          content="Our mission is to help individuals overcome compulsive habits through compassionate, evidence-based recovery coaching."
        />
      </Head>
      <Header />
      <main className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl font-bold text-gray-900 mb-6">About Us</h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            AddictionToFreedom was built because we know how hard it is to break free from compulsive
            habits — and how much it matters to have the right support when you try.
          </p>

          <div className="space-y-8">
            {[
              {
                Icon: Heart,
                title: 'Our Mission',
                text: 'To provide compassionate, evidence-based tools that make lasting recovery accessible to everyone, regardless of background or circumstance.',
              },
              {
                Icon: Target,
                title: 'Our Approach',
                text: 'We combine proven CBT frameworks, motivational interviewing, and mindfulness-based techniques with community support and daily accountability systems.',
              },
              {
                Icon: Shield,
                title: 'Privacy First',
                text: 'We believe privacy is a right, not a feature. Your data is encrypted, never sold, and you control it entirely. Recover with total confidence.',
              },
            ].map(({ Icon, title, text }) => (
              <div key={title} className="flex gap-5">
                <div className="shrink-0 w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center">
                  <Icon size={22} className="text-primary-600" />
                </div>
                <div>
                  <h2 className="font-heading font-bold text-xl text-gray-900 mb-2">{title}</h2>
                  <p className="text-gray-600 leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-primary-50 rounded-2xl">
            <h2 className="font-heading font-bold text-xl text-gray-900 mb-2">Crisis Resources</h2>
            <p className="text-gray-600 text-sm mb-3">
              If you or someone you know is in crisis, please reach out immediately:
            </p>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>SAMHSA Helpline: 1-800-662-4357</li>
              <li>Crisis Text Line: Text HOME to 741741</li>
              <li>National Suicide Prevention Lifeline: 988</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default About;
