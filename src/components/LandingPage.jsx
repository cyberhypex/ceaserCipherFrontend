import React from 'react';
import { useNavigate } from 'react-router-dom';

export function LandingPage(props) {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex flex-col items-center justify-center p-6">
            <h1 className="text-4xl md:text-5xl font-bold text-green-400 mb-4 tracking-wide">Caesar Cipher</h1>
            <p className="text-center text-lg md:text-xl max-w-2xl mb-4 text-gray-300">
                The Caesar Cipher is one of the oldest encryption techniques. It shifts each letter in your message by a fixed number of positions in the alphabet. It's simple, elegant, and historically used by Julius Caesar himself.
            </p>

            {/* Attribution Line */}
            <p className="text-sm text-gray-500 mb-8">
                Built by{' '}
                <a
                    href="https://www.linkedin.com/in/anshuman-gogoi-b99671211/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                >
                    Anshuman
                </a>
            </p>

            <div className="flex flex-col md:flex-row gap-6">
                <button
                    onClick={() => navigate('/encrypt')}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg tracking-wide transition-all duration-300"
                >
                    Encrypt Message
                </button>
                <button
                    onClick={() => navigate('/decrypt')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg tracking-wide transition-all duration-300"
                >
                    Decrypt Message
                </button>
            </div>
        </div>
    );
}
