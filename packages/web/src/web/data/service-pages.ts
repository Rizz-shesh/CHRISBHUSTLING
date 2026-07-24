export type ServiceItem = { title: string; description: string };

export type ServicePage = {
  slug: string;
  title: string;
  image: string;
  gallery: string[];
  intro: string;
  offeringTitle: string;
  offerings: ServiceItem[];
  benefitsTitle: string;
  benefits: ServiceItem[];
};

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: "real-estate-services",
    title: "Real Estate Services",
    image: "/images/svc1.jpg",
    gallery: ["/images/services/real-estate-1.jpg", "/images/services/real-estate-2.jpg", "/images/services/real-estate-3.jpg"],
    intro: "At Chris B Hustling, we understand that real estate transactions are significant milestones in your life. Whether you’re buying, selling, or investing, our dedicated team guides you every step of the way with services tailored to your unique needs and goals.",
    offeringTitle: "Our real estate services include",
    offerings: [
      { title: "Buyer Representation", description: "Looking for your dream home or an investment property? We provide personalized guidance from property search to closing, helping you find a property that meets your criteria and budget." },
      { title: "Seller Representation", description: "Our experienced agents create a strategic marketing plan to maximize exposure and attract qualified buyers. We handle negotiations and paperwork to streamline the selling process." },
      { title: "Investment Properties", description: "We provide market analysis and informed guidance to help seasoned investors and first-time buyers identify promising real estate opportunities." },
      { title: "Market Analysis", description: "Stay informed with insight into local market trends, property values, and investment potential so you can make smarter real estate decisions." },
      { title: "Property Management", description: "Our property management support includes tenant screening, lease agreements, maintenance coordination, and financial reporting to help keep rental investments well maintained." },
    ],
    benefitsTitle: "Why choose Chris B Hustling?",
    benefits: [
      { title: "Expertise", description: "Our team brings extensive local-market knowledge, years of experience, and a commitment to excellence to every transaction." },
      { title: "Personalized Service", description: "We prioritize your goals and provide customized attention throughout the buying, selling, or investing process." },
      { title: "Integrity and Transparency", description: "We provide honest guidance and advocate for your best interests at every stage." },
      { title: "Client Satisfaction", description: "We work to deliver results while making your real estate experience smooth and straightforward." },
    ],
  },
  {
    slug: "credit-restoration",
    title: "Credit Restoration",
    image: "/images/svc2.jpg",
    gallery: ["/images/services/credit-1.jpg", "/images/services/credit-2.jpg", "/images/services/credit-3.jpg"],
    intro: "At Chris B Hustling, we understand the importance of a strong credit score. Whether you want to improve your credit for personal goals or qualify for better interest rates, our credit restoration services are designed to help you move toward your financial aspirations.",
    offeringTitle: "Our credit restoration services include",
    offerings: [
      { title: "Credit Analysis", description: "We thoroughly review your credit report to identify inaccuracies, outdated information, or discrepancies that may negatively affect your score." },
      { title: "Dispute Resolution", description: "Our team helps manage the dispute process with credit bureaus and creditors to challenge inaccuracies and pursue accurate reporting." },
      { title: "Credit Score Improvement Strategies", description: "We provide personalized recommendations that may include debt-management guidance, budgeting practices, and credit-utilization techniques." },
      { title: "Educational Resources", description: "Build your understanding of credit management and financial literacy so you can maintain healthy credit and make informed decisions." },
    ],
    benefitsTitle: "Why choose us for credit restoration?",
    benefits: [
      { title: "Expertise and Experience", description: "Our specialists understand the complexities of credit reporting and scoring systems." },
      { title: "Personalized Approach", description: "Every strategy is tailored to your financial situation, needs, and long-term goals." },
      { title: "Results-Oriented Support", description: "Our aim is measurable progress toward a stronger credit profile and improved financial outlook." },
      { title: "Confidentiality and Trust", description: "Your privacy matters. Sensitive financial information is handled carefully and professionally." },
    ],
  },
  {
    slug: "business-building",
    title: "Business Building",
    image: "/images/svc3.jpg",
    gallery: ["/images/services/business-1.jpg", "/images/services/business-2.jpg", "/images/services/business-3.jpg"],
    intro: "We are passionate about entrepreneurship and helping people turn business ideas into successful ventures. Our business-building services give aspiring entrepreneurs and established owners the tools, resources, and guidance needed to start, grow, and scale effectively.",
    offeringTitle: "Our business-building services include",
    offerings: [
      { title: "Business Planning", description: "Develop a clear plan with market research, competitive analysis, financial projections, and strategic direction tailored to your goals." },
      { title: "Start-Up Consulting", description: "Receive one-on-one guidance to address specific challenges, make informed decisions, and navigate the realities of starting a company." },
      { title: "Brand Development", description: "Create a recognizable identity—from brand messaging to visual direction—that reflects your values and connects with your audience." },
      { title: "Marketing Strategies", description: "Use digital marketing, social media, content, and targeted outreach to build awareness and bring the right people to your offer." },
    ],
    benefitsTitle: "Why choose Chris B Hustling for business building?",
    benefits: [
      { title: "Practical Experience", description: "Seasoned entrepreneurs and business professionals bring proven strategies from diverse industries." },
      { title: "Customized Solutions", description: "Support is adapted to your specific needs, whether you are launching a start-up or scaling an existing operation." },
      { title: "Supportive Environment", description: "Brainstorm, receive useful feedback, and connect with other ambitious business owners." },
      { title: "Long-Term Success", description: "Ongoing mentorship and resources help you respond to challenges and stay focused on sustainable growth." },
    ],
  },
  {
    slug: "mentorship-for-starting-a-business",
    title: "Mentorship For Starting A Business",
    image: "/images/svc4.jpg",
    gallery: ["/images/services/mentorship-1.jpg", "/images/services/mentorship-2.jpg", "/images/services/mentorship-3.jpg"],
    intro: "We believe mentorship can inspire, guide, and empower aspiring entrepreneurs. This program provides personalized direction, practical advice, and lessons from experienced entrepreneurs who have navigated the challenges of starting and growing successful businesses.",
    offeringTitle: "Our mentorship program offers",
    offerings: [
      { title: "Personalized Guidance", description: "Receive one-on-one mentorship tailored to your idea, industry, circumstances, and goals." },
      { title: "Business Strategy Development", description: "Build a roadmap for launching and scaling through planning, market research, competitive analysis, and strategic decision-making." },
      { title: "Networking Opportunities", description: "Connect with entrepreneurs, industry professionals, and potential collaborators who can support your growth." },
      { title: "Problem-Solving and Support", description: "Get experienced perspectives, practical solutions, and encouragement when obstacles arise during the start-up phase." },
    ],
    benefitsTitle: "Why choose Chris B Hustling for mentorship?",
    benefits: [
      { title: "Experienced Mentors", description: "Learn from entrepreneurs committed to sharing knowledge earned through real business experience." },
      { title: "Tailored Approach", description: "The program adapts to your needs, challenges, and aspirations because every business journey is different." },
      { title: "Practical Insights", description: "Receive actionable advice you can apply directly while avoiding common start-up pitfalls." },
      { title: "Long-Term Relationship", description: "We aim to support continued business growth and celebrate your achievements along the way." },
    ],
  },
  {
    slug: "consultation-and-wealth-building",
    title: "Consultation & Wealth Building",
    image: "/images/svc5.jpg",
    gallery: ["/images/services/wealth-1.jpg", "/images/services/wealth-2.jpg", "/images/services/wealth-3.jpg"],
    intro: "Chris B Hustling provides consultation and wealth-building services for people working toward financial independence and long-term prosperity. Our approach combines personalized consultation with strategies tailored to your financial goals.",
    offeringTitle: "Our consultation services include",
    offerings: [
      { title: "Financial Consultation", description: "Assess your current situation, identify opportunities for improvement, and create a practical roadmap toward your financial goals." },
      { title: "Wealth Management", description: "Explore portfolio analysis, asset allocation, risk management, and long-term planning strategies intended to build and preserve wealth." },
      { title: "Debt Management", description: "Develop strategies to manage and reduce credit card debt, loans, and mortgages while strengthening your overall financial position." },
      { title: "Retirement Planning", description: "Plan for a secure retirement with guidance around pensions, Social Security, and an income strategy suited to your lifestyle and aspirations." },
    ],
    benefitsTitle: "Why choose us for consultation and wealth building?",
    benefits: [
      { title: "Expertise and Experience", description: "Our team brings financial-services knowledge and practical strategies to help clients move forward." },
      { title: "Personalized Approach", description: "Recommendations reflect your specific financial circumstances, needs, and aspirations." },
      { title: "Holistic Financial Planning", description: "We consider the full picture—from budgeting and debt to investment strategy and retirement planning." },
      { title: "Client-Centered Focus", description: "Transparency, integrity, and open communication support long-term relationships built on trust." },
    ],
  },
];

export function getServicePage(slug: string) {
  return SERVICE_PAGES.find((service) => service.slug === slug);
}
