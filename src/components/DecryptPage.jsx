import React, { useState } from 'react';
import axios from '../axios'; // Adjust the path if needed
import { useNavigate } from 'react-router-dom';

export function DecryptPage(props) {
  const [encryptedText, setEncryptedText] = useState('');
  const [shift, setShift] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const navigate = useNavigate();

  const handleDecryptClick = async () => {
    if (!encryptedText.trim()) {
      alert("Please enter the encrypted text.");
      return;
    }

    try {
      const response = await axios.get("/decrypt", {
        params: {
          text: encryptedText,
          shift: shift || 3,
        }
      });

      setDecryptedText(response.data);
    } catch (error) {
      console.error("Decryption error:", error);
      alert("Failed to decrypt text.");
    }
  };

  const clear = () => {
    setEncryptedText('');
    setShift('');
    setDecryptedText('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(decryptedText);
    alert("Decrypted text copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex flex-col items-center justify-center px-6 py-10">
      <h2 className="text-4xl font-bold text-blue-400 mb-6 tracking-wide">Decrypt Your Message</h2>

      <div className="w-full max-w-xl bg-gray-900 p-6 rounded-lg shadow-lg space-y-6 border border-gray-700">
        <div>
          <label className="block text-lg mb-2">Enter encrypted text:</label>
          <textarea
            value={encryptedText}
            onChange={(e) => setEncryptedText(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Paste encrypted message here..."
          />
        </div>

        <div>
          <label className="block text-lg mb-2">Shift (optional, default is 3):</label>
          <input
            type="number"
            value={shift}
            onChange={(e) => setShift(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-4 justify-between flex-wrap">
          <button
            onClick={handleDecryptClick}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold transition-all"
          >
            Decrypt
          </button>
          <button
            onClick={clear}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold transition-all"
          >
            Clear
          </button>
        </div>

        {decryptedText && (
          <div className="mt-6">
            <h3 className="text-lg mb-2 text-blue-300">Decrypted Message:</h3>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <p className="break-words">{decryptedText}</p>
            </div>
            <button
              onClick={copyToClipboard}
              className="mt-4 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold transition-all"
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
          className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg font-semibold transition-all"
        >
          ⌂ Home
        </button>
      </div>
    </div>
  );
}
