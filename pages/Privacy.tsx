import React from 'react';

const Privacy: React.FC = () => {
    return (
        <div className="pt-32 pb-20 max-w-4xl mx-auto px-4">
            <h1 className="text-4xl font-display font-bold mb-8">Privacy Policy</h1>
            <div className="prose prose-invert max-w-none space-y-6 text-gray-400">
                <p>Last Updated: February 2026</p>
                <section>
                    <h2 className="text-xl font-bold text-white mb-4">1. Information We Collect</h2>
                    <p>ChaosCtrl collects information necessary to provide project management and AI analysis services. This includes account information, and data from integration services (e.g., Jira, Slack) if authorized by the user.</p>
                </section>
                <section>
                    <h2 className="text-xl font-bold text-white mb-4">2. How We Use Information</h2>
                    <p>We use your information to provide, maintain, and improve our services, including the generation of AI-driven project insights and risk analysis.</p>
                </section>
                <p>This is a placeholder privacy policy for the ChaosCtrl prototype.</p>
            </div>
        </div>
    );
};

export default Privacy;
