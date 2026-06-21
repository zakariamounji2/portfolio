'use client'; // 1. Tells Next.js this page handles interactive clicks and memory

import { useState } from 'react';

export default function ConnectPage() {
  // 2. Create memory spaces (State) to hold the typing data
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // 3. The function that runs when the "Connect" button is clicked
  const handleConnectSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevents the browser from reloading the page

    // This is the JSON payload you will send
    const loginData = { username, password };
    
    console.log("Sending this data to the database/backend:", loginData);

    try {
      // 4. Send the data to your backend API (e.g., Spring Boot)
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        alert("Connected successfully!");
      } else {
        alert("Connection failed!");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-cyan-400 text-center mb-6">System Login</h1>

        {/* 5. Link the form submission to our function */}
        <form onSubmit={handleConnectSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-white/70 mb-1">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Update memory on type
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-white/70 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update memory on type
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-white"
              required
            />
          </div>

          {/* This button triggers the onSubmit function inside the <form> tag above */}
          <button 
            type="submit" 
            className="w-full mt-2 rounded-xl bg-cyan-500 py-2.5 text-sm font-semibold text-black hover:bg-cyan-400"
          >
            Connect
          </button>
        </form>
      </div>
    </main>
  );
}
