import React from 'react';
import { LayoutDashboard, Package, PlusCircle, Video } from 'lucide-react';

type Tab = 'overview' | 'my_crafts' | 'add_craft' | 'live';

interface BottomNavProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-[#0F0F12] border-t border-[#D4AF37]/30 flex justify-around items-center p-2 z-20 md:hidden">
      <button
        onClick={() => setActiveTab('overview')}
        className={`flex flex-col items-center text-xs ${activeTab === 'overview' ? 'text-[#D4AF37]' : 'text-earth-cream/70'}`}
      >
        <LayoutDashboard size={20} />
        <span>Overview</span>
      </button>
      <button
        onClick={() => setActiveTab('my_crafts')}
        className={`flex flex-col items-center text-xs ${activeTab === 'my_crafts' ? 'text-[#D4AF37]' : 'text-earth-cream/70'}`}
      >
        <Package size={20} />
        <span>My Crafts</span>
      </button>
      <button
        onClick={() => setActiveTab('add_craft')}
        className={`flex flex-col items-center text-xs ${activeTab === 'add_craft' ? 'text-[#D4AF37]' : 'text-earth-cream/70'}`}
      >
        <PlusCircle size={20} />
        <span>Add Craft</span>
      </button>
      <button
        onClick={() => setActiveTab('live')}
        className={`flex flex-col items-center text-xs ${activeTab === 'live' ? 'text-red-400' : 'text-earth-cream/70'}`}
      >
        <Video size={20} />
        <span>🔴 Live</span>
      </button>
    </nav>
  );
};

export default BottomNav;
