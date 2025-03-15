
import React from 'react';
import Navbar from '@/components/Navbar';
import { FadeIn, useInView } from '@/utils/animations';

const About: React.FC = () => {
  const [ref, isInView] = useInView(0.1);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-32 pb-16">
        <div ref={ref} className="max-w-3xl mx-auto">
          <FadeIn show={isInView} className="space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">About Curated</h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Curated is a premium shopping destination for those who appreciate thoughtfully selected products that combine quality, design, and functionality.
            </p>
            
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-300">
                We believe that surrounding yourself with well-designed objects enhances everyday experiences. Our mission is to help you discover products that are not only beautiful but also functional and made to last.
              </p>
              
              <h2 className="text-2xl font-semibold">Our Curation Process</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Every item in our store has been carefully selected by our team of experts who have deep knowledge in design, craftsmanship, and sustainability. We partner with brands that share our values and maintain ethical business practices.
              </p>
              
              <h2 className="text-2xl font-semibold">Sustainability Commitment</h2>
              <p className="text-gray-600 dark:text-gray-300">
                We are committed to promoting sustainable consumption by offering products that are built to last. We believe in buying less but better, and our curation reflects this philosophy.
              </p>
            </div>
            
            <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold mb-4">Connect With Us</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Have questions or suggestions? We'd love to hear from you. Reach out to our team at <a href="mailto:hello@curated.com" className="text-primary hover:underline">hello@curated.com</a>
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default About;
