import React from 'react';

// স্টার আইকন কম্পোনেন্ট (পুনরাবৃত্তি কমানোর জন্য)
const StarIcon = () => (
  <svg 
    className="w-5 h-5 text-yellow-400" 
    fill="currentColor" 
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Mitchell",
      role: "Life Coach",
      text: "\"This platform has transformed how I reflect on my experiences. I've documented over 50 lessons and it's amazing to see my growth journey!\"",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80", // স্যাম্পল ছবি
      bgColor: "bg-fuchsia-50", // হালকা পিংক/বেগুনি ব্যাকগ্রাউন্ড
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Entrepreneur",
      text: "\"The community here is incredible. I've learned so much from others' experiences and love sharing my own lessons. Highly recommend!\"",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80",
      bgColor: "bg-sky-50", // হালকা নীল ব্যাকগ্রাউন্ড
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Student",
      text: "\"A beautiful platform for personal growth. The organization features help me revisit important lessons whenever I need them most.\"",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80",
      bgColor: "bg-green-50", // হালকা সবুজ ব্যাকগ্রাউন্ড
    }
  ];

  return (
    <section className="py-16 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* উপরের হেডিং সেকশন */}
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-purple-100 text-purple-600 text-sm font-semibold mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-serif mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-500">
            Real stories from real people
          </p>
        </div>

        {/* কার্ড গ্রিড সেকশন */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div 
              key={item.id} 
              className={`${item.bgColor} p-8 rounded-3xl transition-transform hover:scale-105 duration-300`}
            >
              {/* রেটিং স্টার */}
              <div className="flex space-x-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>

              {/* রিভিউ টেক্সট */}
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {item.text}
              </p>

              {/* ইউজার ইনফো */}
              <div className="flex items-center">
                <img 
                  className="h-12 w-12 rounded-full object-cover mr-4" 
                  src={item.image} 
                  alt={item.name} 
                />
                <div>
                  <h4 className="text-gray-900 font-bold text-base">
                    {item.name}
                  </h4>
                  <p className="text-gray-500 text-sm">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;