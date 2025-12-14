import React from 'react';

const CTASection = () => {
    return (
        <section className="py-16 bg-fuchsia-50/30">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">


                <div className="bg-[#7065f0] rounded-[2.5rem] py-16 px-6 md:px-20 text-center shadow-xl shadow-indigo-200">


                    <h2 className="text-3xl md:text-5xl font-bold text-white font-serif mb-6">
                        Ready to Start Your Growth Journey?
                    </h2>


                    <p className="text-indigo-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                        Join thousands of learners who are documenting their wisdom and growing together
                    </p>


                    <div className="flex flex-col sm:flex-row justify-center items-center gap-5 mb-8">


                        <button className="bg-white text-[#7065f0] hover:bg-gray-50 transition-colors px-8 py-3.5 rounded-lg font-bold text-base flex items-center shadow-sm">

                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M2.255 12.86a2.27 2.27 0 0 1-.355-2.07c.56-1.89 2.05-4.8 5.62-7.58a17.2 17.2 0 0 1 7.9-3.17c.54-.06 1.04.28 1.22.8.58 1.7 1.07 4.54.55 7.8a12.85 12.85 0 0 1-5.06 7.42c-2.3 1.63-4.66 2.06-6.12 1.58a2.27 2.27 0 0 1-1.34-1.2l-2.4-3.6Zm15.7-8.14c.2.14.3.4.24.64a13.34 13.34 0 0 0-.6 3.65 1 1 0 0 0 2 0c0-1.04.14-2.05.4-3.02.06-.24-.04-.5-.24-.64-.2-.14-.48-.15-.68-.03a11.96 11.96 0 0 0-3.37 3.37c-.12.2-.11.48.03.68.14.2.4.3.64.24 1-.26 2-.4 3.02-.4.16 0 .32 0 .48.01l-1.92-4.5Z" />
                            </svg>
                            Get Started Free
                        </button>


                        <button className="bg-transparent border border-white text-white hover:bg-white/10 transition-colors px-8 py-3.5 rounded-lg font-bold text-base flex items-center">

                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Schedule Demo
                        </button>
                    </div>


                    <p className="text-indigo-200 text-sm font-medium">
                        No credit card required • Free forever plan available
                    </p>

                </div>
            </div>
        </section>
    );
};

export default CTASection;