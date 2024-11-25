import React from 'react';
import Link from 'next/link';

const CompanyPage = () => {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
            {/* Title */}
            <h1 className="text-4xl font-bold text-indigo-700 mb-6">
                Welcome to Our Company
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-gray-700 text-center max-w-2xl mb-8">
                Learn more about who we are, what we do, and how we can help you achieve your goals.
                Explore the sections below to find out more.
            </p>

            {/* Card Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* About Us */}
                <Link href="/company/about" className="group p-6 bg-white rounded-lg shadow hover:shadow-xl">
                    <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-indigo-600">
                        About Us
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Discover our story, mission, and values.
                    </p>
                </Link>

                {/* Careers */}
                <Link href="/company/careers" className="group p-6 bg-white rounded-lg shadow hover:shadow-xl">
                    <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-indigo-600">
                        Careers
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Join our team and grow your career with us.
                    </p>
                </Link>

                {/* Our Team */}
                <Link href="/company/team" className="group p-6 bg-white rounded-lg shadow hover:shadow-xl">
                    <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-indigo-600">
                        Our Team
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Meet the people behind our success.
                    </p>
                </Link>

                {/* Contact Us */}
                <Link href="/company/contact" className="group p-6 bg-white rounded-lg shadow hover:shadow-xl">
                    <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-indigo-600">
                        Contact Us
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Get in touch with us for any inquiries.
                    </p>
                </Link>

                {/* Press */}
                <Link href="/company/press" className="group p-6 bg-white rounded-lg shadow hover:shadow-xl">
                    <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-indigo-600">
                        Press
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Check out our latest news and press releases.
                    </p>
                </Link>
            </div>
        </main>
    );
};

export default CompanyPage;
