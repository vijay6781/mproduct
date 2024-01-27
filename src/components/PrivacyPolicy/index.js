// PrivacyPolicy.js

import React from 'react';
import { Link } from 'react-router-dom'; // If you are using React Router

const PrivacyPolicy = () => {
    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

            <p className="mb-4">
                Welcome to CreditPaisa. This Privacy Policy is designed to help you understand how we collect, use, and safeguard your personal information.
            </p>

            <h2 className="text-xl font-bold mb-2">1. Information We Collect</h2>
            <p className="mb-4">
                We collect personal information that you voluntarily provide to us when using our services. This may include your name, email address, and any other information you choose to share but we don't store  not sensitive information.
            </p>

            <h2 className="text-xl font-bold mb-2">2. How We Use Your Information</h2>
            <p className="mb-4">
                We use the collected information to provide, maintain, and improve our services. This includes personalization, communication, and responding to your inquiries. We may also use your information for analytics and marketing purposes.
            </p>

            <h2 className="text-xl font-bold mb-2">3. Cookies</h2>
            <p className="mb-4">
                We use cookies to enhance your experience on our website. Cookies are small text files that are stored on your device. You can set your browser to refuse all or some browser cookies or to alert you when websites set or access cookies.
            </p>

            <h2 className="text-xl font-bold mb-2">4. Data Security</h2>
            <p className="mb-4">
                We implement reasonable security measures to protect the confidentiality and security of your personal information. However, no method of transmission over the internet or electronic storage is completely secure.
            </p>

            <h2 className="text-xl font-bold mb-2">5. Third-Party Services</h2>
            <p className="mb-4">
                We may use third-party services that collect, monitor, and analyze information. These services have their own privacy policies addressing how they use such information.
            </p>

            <h2 className="text-xl font-bold mb-2">6. Changes to This Privacy Policy</h2>
            <p className="mb-4">
                We may update our Privacy Policy from time to time. Any changes will be posted on this page, and the effective date will be updated accordingly. We encourage you to review this Privacy Policy periodically for any changes.
            </p>

            <h2 className="text-xl font-bold mb-2">7. Contact Us</h2>
            <p className="mb-4">
                If you have any questions about our Privacy Policy, please <Link to="#">contact us: info@creditpaisa.com</Link>.
            </p>

            <p>
                Last Updated: 20/01/2024
            </p>
        </div>
    );
};

export default PrivacyPolicy;
