import React, { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

export function EncryptPage(props) {
  const [inputText, setInputText] = useState('');
  const [shift, setShift] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const navigate = useNavigate();

  const handleEncryptClick = async () => {
    if (!inputText.trim()) {
      alert("Please enter text to encrypt.");
      return;
    }

    try {
      const response = await axios.get("/encrypt", {
        params: {
          text: inputText,
          shift: shift || 3,
        }
      });

      setEncryptedText(response.data);
    } catch (error) {
      console.error("Encryption error:", error);
      alert("Failed to encrypt text.");
    }
  };

  const clear = () => {
    setInputText('');
    setShift('');
    setEncryptedText('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(encryptedText);
    alert("Encrypted text copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex flex-col items-center justify-center px-6 py-10">
      <h2 className="text-4xl font-bold text-green-400 mb-6 tracking-wide">Encrypt Your Message</h2>

      <div className="w-full max-w-xl bg-gray-900 p-6 rounded-lg shadow-lg space-y-6 border border-gray-700">
        <div>
          <label className="block text-lg mb-2">Enter your text:</label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={4}
            placeholder="Type your message here..."
          />
        </div>

        <div>
          <label className="block text-lg mb-2">Shift (optional, default is 3):</label>
          <input
            type="number"
            value={shift}
            onChange={(e) => setShift(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="flex gap-4 justify-between flex-wrap">
          <button
            onClick={handleEncryptClick}
            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg font-semibold transition-all"
          >
            Encrypt
          </button>
          <button
            onClick={clear}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold transition-all"
          >
            Clear
          </button>
        </div>

        {encryptedText && (
          <div className="mt-6">
            <h3 className="text-lg mb-2 text-green-300">Encrypted Message:</h3>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <p className="break-words">{encryptedText}</p>
            </div>
            <button
              onClick={copyToClipboard}
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold transition-all"
            >
              Copy to Clipboard
            </button>
          </div>
        )}
      </div>

      <div className="flex gap-6 mt-10">
        <button
          onClick={() => navigate(-1)}
          className="bg-yellow-600 hover:bg-yellow-700 px-5 py-2 rounded-lg font-semibold transition-all"
        >
          ← Back
        </button>
        <button
          onClick={() => navigate('/')}
          className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-lg font-semibold transition-all"
        >
          ⌂ Home
        </button>
      </div>
    </div>
  );
}
