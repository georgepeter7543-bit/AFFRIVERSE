import React from 'react';
import { useRouter } from 'next/navigation';
import { XCircle } from 'lucide-react';

const AccessRestricted: React.FC = () => {
  const router = useRouter();
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-[#0F0F12] text-[#D4AF37] p-8">
      <XCircle size={48} className="mb-4" />
      <h2 className="text-2xl font-bold mb-2">Access Restricted</h2>
      <p className="text-center max-w-lg mb-6">
        This area is reserved exclusively for verified Arusha Artisans. Your current role does not have permission to view this dashboard.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => router.push('/login')}
          className="px-5 py-2 bg-[#D4AF37] text-black rounded-xl font-semibold hover:bg-amber-400 transition"
        >
          Switch Role / Sign In
        </button>
        <button
          onClick={() => router.push('/')}
          className="px-5 py-2 bg-[#0F0F12] border border-[#D4AF37] text-[#D4AF37] rounded-xl font-semibold hover:bg-[#0F0F12]/80 transition"
        >
          Return Home
        </button>
      </div>
    </section>
  );
};

export default AccessRestricted;
