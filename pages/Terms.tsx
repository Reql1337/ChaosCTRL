import React from 'react';

const Terms: React.FC = () => {
    return (
        <div className="pt-32 pb-20 max-w-4xl mx-auto px-4">
            <h1 className="text-4xl font-display font-bold mb-8">Terms of Use</h1>
            <div className="prose prose-invert max-w-none space-y-6 text-gray-400">
                <p>Last Updated: February 2026</p>
                <section>
                    <h2 className="text-xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                    <p>By accessing or using ChaosCtrl, you agree to be bound by these Terms of Use and all applicable laws and regulations.</p>
                </section>
                <section>
                    <h2 className="text-xl font-bold text-white mb-4">2. Use License</h2>
                    <p>Permission is granted to use ChaosCtrl for your internal project management purposes. This is the grant of a license, not a transfer of title.</p>
                </section>
                <p>This is a placeholder Terms of Use for the ChaosCtrl prototype.</p>
            </div>
        </div>
    );
};

export default Terms;
