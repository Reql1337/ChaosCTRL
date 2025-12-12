import React, { useState, useRef } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Activity, 
  Users, 
  Settings, 
  Moon, 
  Sun, 
  Plus, 
  Search, 
  Bell, 
  LogOut, 
  TrendingUp, 
  TrendingDown, 
  MoreHorizontal,
  Briefcase,
  Layers,
  Map,
  CreditCard,
  Gem,
  ChevronDown,
  Calendar,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Filter,
  Download,
  User,
  X,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Trash2,
  Archive as ArchiveIcon,
  Flag,
  Upload,
  Save,
  Mail,
  MessageSquare,
  Trello,
  FileCode,
  Check,
  Eye,
  EyeOff
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell, 
  Legend,
  AreaChart,
  Area,
  LineChart,
  Line
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import AnalysisModal from '../components/Dashboard/AnalysisModal';
import { ScopeAnalysisResult, ChangeRequest } from '../types';

// --- MOCK DATA ---

const timelineData = [
  { name: '1 Jul', resolved: 28, newRequests: 38 },
  { name: '2 Jul', resolved: 32, newRequests: 46 },
  { name: '3 Jul', resolved: 20, newRequests: 55 },
  { name: '4 Jul', resolved: 34, newRequests: 44 },
  { name: '5 Jul', resolved: 54, newRequests: 42 },
  { name: '6 Jul', resolved: 54, newRequests: 60 },
  { name: '7 Jul', resolved: 15, newRequests: 38 },
  { name: '8 Jul', resolved: 34, newRequests: 43 },
  { name: '9 Jul', resolved: 25, newRequests: 32 },
  { name: '10 Jul', resolved: 44, newRequests: 48 },
  { name: '11 Jul', resolved: 34, newRequests: 46 },
  { name: '12 Jul', resolved: 58, newRequests: 54 },
];

const velocityData = [
  { sprint: 'S1', committed: 40, completed: 35 },
  { sprint: 'S2', committed: 45, completed: 38 },
  { sprint: 'S3', committed: 45, completed: 42 },
  { sprint: 'S4', committed: 50, completed: 30 }, // Dip due to chaos
  { sprint: 'S5', committed: 40, completed: 38 },
  { sprint: 'S6', committed: 55, completed: 50 },
];

const cumulativeFlowData = [
  { name: 'W1', todo: 20, inProgress: 5, done: 0 },
  { name: 'W2', todo: 35, inProgress: 15, done: 5 },
  { name: 'W3', todo: 25, inProgress: 25, done: 15 },
  { name: 'W4', todo: 15, inProgress: 20, done: 35 },
  { name: 'W5', todo: 10, inProgress: 15, done: 55 },
];

const stakeholdersData = [
  { 
    name: 'Sarah Miller', 
    role: 'Head of Product', 
    chaosScore: 12, 
    requests: 5, 
    approvalRate: 92,
    avatar: 'SM',
    history: [
        { id: 'REQ-204', title: 'Q3 Roadmap Adjustment', date: '2 days ago', status: 'Approved', score: 15 },
        { id: 'REQ-198', title: 'Analytics Dashboard Spec', date: '1 week ago', status: 'Approved', score: 10 },
        { id: 'REQ-182', title: 'User Profile Update', date: '2 weeks ago', status: 'Approved', score: 8 }
    ]
  },
  { 
    name: 'Mike Ross', 
    role: 'VP Sales', 
    chaosScore: 88, 
    requests: 14, 
    approvalRate: 45,
    avatar: 'MR',
    history: [
        { id: 'REQ-209', title: 'Urgent: Custom Report for Client X', date: '4 hours ago', status: 'Pending', score: 92 },
        { id: 'REQ-205', title: 'Change Pricing Tier Logic', date: '3 days ago', status: 'Rejected', score: 85 },
        { id: 'REQ-199', title: 'Add "Demo" Button to Header', date: '1 week ago', status: 'Approved', score: 45 },
        { id: 'REQ-180', title: 'Salesforce Integration V2', date: '3 weeks ago', status: 'Rejected', score: 88 }
    ]
  },
  { 
    name: 'Jessica Pearson', 
    role: 'CEO', 
    chaosScore: 45, 
    requests: 3, 
    approvalRate: 100,
    avatar: 'JP',
    history: [
        { id: 'REQ-210', title: 'Q4 Strategic Pivot', date: '1 day ago', status: 'Approved', score: 65 },
        { id: 'REQ-150', title: 'Rebrand Announcement Banner', date: '1 month ago', status: 'Approved', score: 25 }
    ]
  },
  { 
    name: 'Louis Litt', 
    role: 'Legal Counsel', 
    chaosScore: 25, 
    requests: 8, 
    approvalRate: 80,
    avatar: 'LL',
    history: [
        { id: 'REQ-201', title: 'GDPR Compliance Modal', date: '5 days ago', status: 'Approved', score: 30 },
        { id: 'REQ-195', title: 'Terms of Service Update', date: '2 weeks ago', status: 'Approved', score: 20 }
    ]
  },
  { 
    name: 'Harvey Specter', 
    role: 'Strategic Partner', 
    chaosScore: 65, 
    requests: 7, 
    approvalRate: 60,
    avatar: 'HS',
    history: [
        { id: 'REQ-208', title: 'Mobile App Refactor', date: '2 days ago', status: 'Rejected', score: 75 },
        { id: 'REQ-200', title: 'VIP Client Portal', date: '1 week ago', status: 'Pending', score: 60 }
    ]
  },
];

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedStakeholder, setSelectedStakeholder] = useState<any>(null);
  
  // Profile State - Displayed (Applied) State
  const [userProfile, setUserProfile] = useState({
      name: 'Harper Nelson',
      email: 'harper@chaosctrl.com',
      role: 'Admin Manager',
      avatar: null as string | null
  });

  // Profile State - Form (Editing) State
  const [editProfile, setEditProfile] = useState({ ...userProfile });

  const [isSaved, setIsSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // API Config State
  const [apiConfigs, setApiConfigs] = useState({
      core: 'chaos_live_sk_8923498234...',
      email: '',
      slack: '',
      jira: '',
      trello: ''
  });
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});

  // Time Period State
  const [timePeriod, setTimePeriod] = useState('Last 30 Days');
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const timeOptions = ['Last 30 Days', 'This Month', 'Quarterly (Year)', 'Yearly'];

  // Risk Items Dropdown State
  const [isRiskMenuOpen, setIsRiskMenuOpen] = useState(false);
  const [riskSortDirection, setRiskSortDirection] = useState<'asc' | 'desc'>('desc');

  // Scope Items Filter/Sort State
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ key: 'score', direction: 'desc' });

  // Roadmap Data & Modal State
  const [isRoadmapModalOpen, setIsRoadmapModalOpen] = useState(false);
  const [newRoadmapTitle, setNewRoadmapTitle] = useState('');
  const [newRoadmapOwner, setNewRoadmapOwner] = useState('Product');

  const [roadmapItems, setRoadmapItems] = useState([
    { id: 1, feature: 'Auth System Rewrite', start: 0, duration: 3, status: 'On Track', owner: 'Backend', year: 2024 },
    { id: 2, feature: 'Dashboard V2', start: 2, duration: 4, status: 'At Risk', owner: 'Frontend', year: 2024 },
    { id: 3, feature: 'API Gateway', start: 5, duration: 3, status: 'Done', owner: 'DevOps', year: 2024 },
    { id: 4, feature: 'Mobile App Beta', start: 1, duration: 5, status: 'Delayed', owner: 'Mobile', year: 2025 },
    { id: 5, feature: 'Stripe Integration', start: 6, duration: 4, status: 'On Track', owner: 'Backend', year: 2025 },
  ]);

  const [changeRequests, setChangeRequests] = useState<ChangeRequest[]>([
    { id: '1', description: 'Payment Gateway Refactor', score: 89, impactDays: 5, source: 'Jira', timestamp: '2h ago', status: 'pending', archived: false },
    { id: '2', description: 'User Dashboard V2', score: 65, impactDays: 4, source: 'Slack', timestamp: '4h ago', status: 'pending', archived: false },
    { id: '3', description: 'Analytics Integration', score: 25, impactDays: 2, source: 'Email', timestamp: '1d ago', status: 'approved', archived: false },
    { id: '4', description: 'Mobile Responsiveness', score: 45, impactDays: 3, source: 'Jira', timestamp: '2d ago', status: 'pending', archived: false },
    { id: '5', description: 'Email Notification System', score: 72, impactDays: 3, source: 'Slack', timestamp: '3d ago', status: 'pending', archived: false },
  ]);

  const [stats, setStats] = useState({
    totalTickets: 567899,
    risksResolved: 1789
  });

  // --- DERIVED STATE (Moved here so all tabs can access live metrics) ---
  const activeRisks = changeRequests.filter(req => !req.archived && req.status !== 'rejected');
  const currentChaosScore = activeRisks.length > 0 
      ? Math.round(activeRisks.reduce((acc, curr) => acc + curr.score, 0) / activeRisks.length) 
      : 0;
  const predictedDelay = activeRisks.reduce((acc, curr) => acc + curr.impactDays, 0);

  // Profile Handlers
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              setEditProfile(prev => ({ ...prev, avatar: reader.result as string }));
          };
          reader.readAsDataURL(file);
      }
  };

  const handleRemoveAvatar = () => {
      setEditProfile(prev => ({ ...prev, avatar: null }));
  };

  const handleSaveProfile = () => {
      setUserProfile(editProfile);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
  };

  const toggleKeyVisibility = (key: string) => {
    setVisibleKeys(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAddChange = (result: ScopeAnalysisResult) => {
    // Add new request to state - calculation of chaos score will happen automatically in render
    const newReq: ChangeRequest = {
        id: Date.now().toString(),
        description: 'Simulated Scope Change', 
        score: result.score,
        impactDays: result.impactDays,
        source: 'Simulator',
        timestamp: 'Just now',
        status: 'pending',
        reasoning: result.reasoning,
        archived: false
    };
    setChangeRequests([newReq, ...changeRequests]);
  };

  const handleCreateRoadmapItem = () => {
    if (!newRoadmapTitle.trim()) return;

    const years = Array.from(new Set(roadmapItems.map(i => i.year))).sort();
    const latestYear = years[years.length - 1] || 2024;
    
    const newItem = {
        id: Date.now(),
        feature: newRoadmapTitle,
        start: Math.floor(Math.random() * 8), // Randomize start for demo
        duration: Math.floor(Math.random() * 4) + 2, // Randomize duration for demo
        status: 'On Track',
        owner: newRoadmapOwner,
        year: latestYear
    };
    setRoadmapItems([...roadmapItems, newItem]);
    setIsRoadmapModalOpen(false);
    setNewRoadmapTitle('');
    setNewRoadmapOwner('Product');
  };

  const handleStatusUpdate = (id: string, newStatus: 'pending' | 'approved' | 'rejected') => {
      setChangeRequests(prev => prev.map(req => 
          req.id === id ? { ...req, status: newStatus } : req
      ));
  };

  const handleArchive = (id: string) => {
      setChangeRequests(prev => prev.map(req => 
          req.id === id ? { ...req, archived: true } : req
      ));
  };

  const handleRestore = (id: string) => {
      setChangeRequests(prev => prev.map(req => 
          req.id === id ? { ...req, archived: false } : req
      ));
  };

  const handleDelete = (id: string) => {
      setChangeRequests(prev => prev.filter(req => req.id !== id));
  };

  const sortRisks = (direction: 'asc' | 'desc') => {
    setRiskSortDirection(direction);
    setIsRiskMenuOpen(false);
  };

  const toggleSortDirection = () => {
      setSortConfig(prev => ({ ...prev, direction: prev.direction === 'asc' ? 'desc' : 'asc' }));
  };

  const handleSortSelection = (key: string) => {
      setSortConfig(prev => ({
          key,
          direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
      }));
      setIsFilterMenuOpen(false);
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const getGemColor = (score: number) => {
    if (score >= 80) return '#ef4444'; // Red (Critical)
    if (score >= 60) return '#f97316'; // Orange (High)
    if (score >= 40) return '#eab308'; // Yellow (Medium)
    return '#10b981'; // Emerald (Low)
  };

  const getRiskLabel = (score: number) => {
    if (score >= 80) return 'Critical Risk';
    if (score >= 60) return 'High Risk';
    if (score >= 40) return 'Moderate Risk';
    return 'Low Risk';
  };

  const getRiskDisplay = (score: number) => {
      if (score >= 80) return { label: 'Critical', color: 'bg-red-500' };
      if (score >= 60) return { label: 'High', color: 'bg-orange-500' };
      if (score >= 40) return { label: 'Moderate', color: 'bg-blue-500' };
      return { label: 'Safe', color: 'bg-emerald-500' };
  };

  // Dynamic Styles based on Theme
  const theme = {
    bg: isDarkMode ? 'bg-navy-900' : 'bg-gray-50',
    sidebarBg: isDarkMode ? 'bg-navy-900' : 'bg-white',
    cardBg: isDarkMode ? 'bg-navy-800' : 'bg-white',
    text: isDarkMode ? 'text-white' : 'text-slate-900',
    textMuted: isDarkMode ? 'text-gray-400' : 'text-slate-500',
    border: isDarkMode ? 'border-white/5' : 'border-slate-200',
    hover: isDarkMode ? 'hover:bg-white/5' : 'hover:bg-slate-50',
    iconPrimary: isDarkMode ? 'text-emerald-500' : 'text-emerald-600',
    divider: isDarkMode ? 'border-white/5' : 'border-slate-100',
    shadow: isDarkMode ? '' : 'shadow-sm',
    navActive: isDarkMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600',
    navInactive: isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-slate-900',
  };

  const MetricCard = ({ title, value, change, isPositive, icon }: any) => (
    <div className={`${theme.cardBg} ${theme.border} border rounded-2xl p-6 flex flex-col justify-between ${theme.shadow} transition-colors duration-300`}>
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-slate-100'} ${theme.text}`}>
                {icon}
            </div>
            {change && (
                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${isPositive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                    {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {change}
                </div>
            )}
        </div>
        <div>
            <p className={`${theme.textMuted} text-sm font-medium mb-1`}>{title}</p>
            <h3 className={`${theme.text} text-2xl font-bold font-display`}>{value}</h3>
        </div>
    </div>
  );

  const renderStakeholderModal = () => {
    if (!selectedStakeholder) return null;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-navy-900/90 backdrop-blur-sm" onClick={() => setSelectedStakeholder(null)}></div>
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           exit={{ opacity: 0, scale: 0.95 }}
           className={`relative ${theme.cardBg} ${theme.border} border rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]`}
        >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex justify-between items-start bg-navy-900/50">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border-2 border-white/10 flex items-center justify-center text-xl font-bold text-white shadow-lg">
                        {selectedStakeholder.avatar}
                    </div>
                    <div>
                        <h3 className={`text-xl font-bold ${theme.text}`}>{selectedStakeholder.name}</h3>
                        <p className={`text-sm ${theme.textMuted}`}>{selectedStakeholder.role}</p>
                    </div>
                </div>
                <button onClick={() => setSelectedStakeholder(null)} className={`${theme.textMuted} hover:text-white transition-colors`}>
                    <X size={24} />
                </button>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 divide-x divide-white/5 border-b border-white/5 bg-navy-900/30">
                <div className="p-4 text-center">
                    <p className={`text-xs uppercase font-bold ${theme.textMuted}`}>Chaos Score</p>
                    <p className={`text-xl font-bold ${selectedStakeholder.chaosScore > 50 ? 'text-red-500' : 'text-emerald-500'}`}>{selectedStakeholder.chaosScore}</p>
                </div>
                <div className="p-4 text-center">
                    <p className={`text-xs uppercase font-bold ${theme.textMuted}`}>Total Requests</p>
                    <p className={`text-xl font-bold ${theme.text}`}>{selectedStakeholder.requests}</p>
                </div>
                <div className="p-4 text-center">
                    <p className={`text-xs uppercase font-bold ${theme.textMuted}`}>Approval Rate</p>
                    <p className={`text-xl font-bold ${theme.text}`}>
                        {selectedStakeholder.approvalRate}%
                    </p>
                </div>
            </div>

            {/* Request List */}
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                <h4 className={`text-sm font-bold ${theme.textMuted} uppercase mb-4`}>Recent Activity</h4>
                <div className="space-y-3">
                    {selectedStakeholder.history && selectedStakeholder.history.length > 0 ? (
                        selectedStakeholder.history.map((req: any, i: number) => (
                            <div key={i} className={`p-4 rounded-xl border ${theme.border} ${theme.hover} transition-colors group`}>
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`font-mono text-xs ${theme.textMuted}`}>{req.id}</span>
                                    <span className="text-xs text-gray-500">{req.date}</span>
                                </div>
                                <p className={`font-medium ${theme.text} mb-3`}>{req.title}</p>
                                <div className="flex items-center gap-3">
                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                                        req.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-500' :
                                        req.status === 'Rejected' ? 'bg-red-500/10 text-red-500' :
                                        'bg-blue-500/10 text-blue-500'
                                    }`}>
                                        {req.status}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <span className="text-xs text-gray-500">Impact:</span>
                                        <span className={`text-xs font-bold ${req.score > 50 ? 'text-red-500' : 'text-emerald-500'}`}>{req.score} / 100</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className={`text-sm ${theme.textMuted} italic`}>No recent requests found.</p>
                    )}
                </div>
            </div>
        </motion.div>
      </div>
    );
  };

  const renderAddRoadmapModal = () => {
    if (!isRoadmapModalOpen) return null;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-navy-900/90 backdrop-blur-sm" onClick={() => setIsRoadmapModalOpen(false)}></div>
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           exit={{ opacity: 0, scale: 0.95 }}
           className={`relative ${theme.cardBg} border border-emerald-500/20 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden p-6`}
        >
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-500">
                        <Flag size={20} />
                    </div>
                    <h3 className={`text-xl font-bold ${theme.text}`}>New Strategic Initiative</h3>
                </div>
                <button onClick={() => setIsRoadmapModalOpen(false)} className={`${theme.textMuted} hover:text-white`}>
                    <X size={20} />
                </button>
            </div>

            <div className="space-y-4 mb-6">
                <div>
                    <label className={`block text-sm font-bold ${theme.textMuted} mb-2`}>Initiative Name</label>
                    <input 
                        type="text" 
                        value={newRoadmapTitle}
                        onChange={(e) => setNewRoadmapTitle(e.target.value)}
                        placeholder="e.g. Q4 Global Expansion" 
                        className={`w-full ${theme.bg} border ${theme.border} rounded-lg p-3 ${theme.text} outline-none focus:border-emerald-500 transition-colors`} 
                        autoFocus
                    />
                </div>
                <div>
                    <label className={`block text-sm font-bold ${theme.textMuted} mb-2`}>Owner / Department</label>
                    <input 
                        type="text" 
                        value={newRoadmapOwner}
                        onChange={(e) => setNewRoadmapOwner(e.target.value)}
                        placeholder="e.g. Product, Engineering, Marketing" 
                        className={`w-full ${theme.bg} border ${theme.border} rounded-lg p-3 ${theme.text} outline-none focus:border-emerald-500 transition-colors`} 
                    />
                </div>
            </div>

            <div className="flex gap-3">
                <button 
                    onClick={() => setIsRoadmapModalOpen(false)}
                    className={`flex-1 py-3 rounded-lg font-bold text-sm ${theme.text} hover:bg-white/5 border ${theme.border}`}
                >
                    Cancel
                </button>
                <button 
                    onClick={handleCreateRoadmapItem}
                    disabled={!newRoadmapTitle.trim()}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-navy-900 py-3 rounded-lg font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Create Initiative
                </button>
            </div>
        </motion.div>
      </div>
    );
  };

  // --- SUB-LAYOUT RENDERS ---

  const renderDashboard = () => {
    // Derived state for High Risk Items based on changeRequests
    // Filters for active (non-archived and non-rejected) requests, sorts by score descending, takes top 5
    const highRiskItems = [...changeRequests]
        .filter(req => !req.archived && req.status !== 'rejected') 
        .sort((a, b) => riskSortDirection === 'desc' ? b.score - a.score : a.score - b.score) 
        .slice(0, 5) 
        .map(req => {
            const { label, color } = getRiskDisplay(req.score);
            return {
                name: req.description,
                score: req.score,
                display: label,
                color: color
            };
        });

    return (
    <div className="animate-in fade-in duration-500">
         {/* Metrics Row */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
             <MetricCard title="Total Tickets" value={stats.totalTickets.toLocaleString()} change="2.5%" isPositive={true} icon={<Briefcase size={20} />} />
             <MetricCard title="Chaos Score" value={`${currentChaosScore}/100`} change="0.5%" isPositive={currentChaosScore < 50} icon={<Activity size={20} />} />
             <MetricCard title="Predicted Delay" value={`+${predictedDelay} Days`} change="0.2%" isPositive={false} icon={<CreditCard size={20} />} />
             <button onClick={() => setIsModalOpen(true)} className={`border-2 border-dashed ${theme.border} rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:border-emerald-500 hover:bg-emerald-500/5 transition-all group h-full`}>
                 <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform"><Plus size={24} /></div>
                 <span className={`font-bold ${theme.text} text-sm`}>Simulate Change</span>
             </button>
         </div>

         {/* Main Chart Section */}
         <div className={`${theme.cardBg} ${theme.border} border rounded-2xl p-8 mb-8 ${theme.shadow}`}>
             <div className="flex justify-between items-start mb-8">
                 <div><h3 className={`text-xl font-bold ${theme.text}`}>Scope Velocity</h3><p className={`${theme.textMuted} text-sm mt-1`}>New Requests vs Resolved Items</p></div>
                 <div className="flex items-center gap-6">
                     <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span><span className={`${theme.textMuted} text-sm`}>New Scope</span></div>
                     <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-orange-400"></span><span className={`${theme.textMuted} text-sm`}>Resolved</span></div>
                 </div>
             </div>
             <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={timelineData} barGap={8}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#9CA3AF' : '#64748B', fontSize: 12 }} dy={10}/>
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#9CA3AF' : '#64748B', fontSize: 12 }} />
                        <RechartsTooltip cursor={{ fill: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }} contentStyle={{ backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF', borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#E2E8F0', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)'}} itemStyle={{ color: isDarkMode ? '#fff' : '#0F172A' }}/>
                        <Bar dataKey="newRequests" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={12} />
                        <Bar dataKey="resolved" fill="#FB923C" radius={[4, 4, 0, 0]} barSize={12} />
                    </BarChart>
                </ResponsiveContainer>
             </div>
         </div>

         {/* Bottom Row */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Risk Widget - 3D Spinning Gem */}
             <div className={`${theme.cardBg} ${theme.border} border rounded-2xl p-8 ${theme.shadow} flex flex-col items-center justify-center text-center overflow-hidden relative`}>
                 <h3 className={`text-lg font-bold ${theme.text} mb-2 w-full text-left`}>Current Chaos Level</h3>
                 <p className={`${theme.textMuted} text-sm mb-6 w-full text-left`}>Aggregated Chaos Score</p>
                 <div className="relative w-40 h-40 flex items-center justify-center perspective-1000 mb-6">
                    <motion.div className="w-full h-full relative" style={{ transformStyle: 'preserve-3d' }} animate={{ rotateY: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }}>
                       {[0, 60, 120].map((deg) => (
                          <div key={deg} className="absolute inset-0 flex items-center justify-center" style={{ transform: `rotateY(${deg}deg)` }}>
                             <Gem size={100} color={getGemColor(currentChaosScore)} fill={getGemColor(currentChaosScore)} fillOpacity={0.2} strokeWidth={1}/>
                          </div>
                       ))}
                       <div className="absolute inset-0 flex items-center justify-center"><div className="w-16 h-16 rounded-full blur-xl opacity-50" style={{ backgroundColor: getGemColor(currentChaosScore) }}></div></div>
                    </motion.div>
                 </div>
                 <div className="z-10">
                     <h2 className={`text-5xl font-display font-bold mb-1`} style={{ color: getGemColor(currentChaosScore) }}>{currentChaosScore}</h2>
                     <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'bg-white/10' : 'bg-slate-100'}`} style={{ color: getGemColor(currentChaosScore) }}>{getRiskLabel(currentChaosScore)}</span>
                 </div>
             </div>
             {/* List Widget */}
             <div className={`lg:col-span-2 ${theme.cardBg} ${theme.border} border rounded-2xl p-8 ${theme.shadow}`}>
                 <div className="flex justify-between items-center mb-6">
                     <h3 className={`text-lg font-bold ${theme.text}`}>High Risk Items</h3>
                     <div className="relative">
                        <button 
                            onClick={() => setIsRiskMenuOpen(!isRiskMenuOpen)}
                            className={`${theme.textMuted} hover:${theme.text} transition-colors p-1 rounded-lg hover:bg-white/5`}
                        >
                            <MoreHorizontal size={20} />
                        </button>
                        <AnimatePresence>
                            {isRiskMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: 5 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 5 }}
                                    className={`absolute right-0 top-full mt-2 w-56 ${theme.cardBg} ${theme.border} border rounded-xl shadow-xl z-20 overflow-hidden backdrop-blur-xl`}
                                >
                                    <div className="p-1">
                                        <button
                                            onClick={() => sortRisks('desc')}
                                            className={`w-full text-left px-3 py-2 text-sm font-medium ${theme.text} hover:${theme.hover} rounded-lg transition-colors flex items-center gap-2`}
                                        >
                                           <TrendingDown size={14} className="text-red-500" /> Highest Risk First
                                        </button>
                                        <button
                                            onClick={() => sortRisks('asc')}
                                            className={`w-full text-left px-3 py-2 text-sm font-medium ${theme.text} hover:${theme.hover} rounded-lg transition-colors flex items-center gap-2`}
                                        >
                                           <TrendingUp size={14} className="text-emerald-500" /> Lowest Risk First
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                     </div>
                 </div>
                 <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                     {highRiskItems.map((item, i) => (
                         <div key={i} className="flex items-center gap-4">
                             <div className="w-48"><p className={`text-sm font-medium ${theme.text} truncate`}>{item.name}</p></div>
                             <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden"><div className={`h-full ${item.color}`} style={{ width: `${item.score}%` }}></div></div>
                             <div className="w-24 text-right"><span className={`text-xs font-bold ${theme.textMuted}`}>{item.display} ({item.score}%)</span></div>
                         </div>
                     ))}
                     {highRiskItems.length === 0 && (
                         <p className={`text-center py-8 ${theme.textMuted} text-sm`}>No high risk items detected.</p>
                     )}
                 </div>
             </div>
         </div>
    </div>
    );
  };

  const renderStakeholders = () => (
    <div className="animate-in fade-in duration-500">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stakeholdersData.map((person, idx) => (
                <div key={idx} onClick={() => setSelectedStakeholder(person)} className={`${theme.cardBg} ${theme.border} border rounded-2xl p-6 ${theme.shadow} flex flex-col items-center text-center hover:border-emerald-500/50 transition-colors cursor-pointer group`}>
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border-2 border-white/10 flex items-center justify-center text-2xl font-bold text-white mb-4 shadow-lg group-hover:scale-105 transition-transform">
                        {person.avatar}
                    </div>
                    <h3 className={`text-lg font-bold ${theme.text}`}>{person.name}</h3>
                    <p className={`text-sm ${theme.textMuted} mb-6`}>{person.role}</p>
                    
                    <div className="w-full bg-navy-900/50 rounded-xl p-4 border border-white/5">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-gray-400 font-bold uppercase">Chaos Contribution</span>
                            <span className={`text-xs font-bold ${person.chaosScore > 50 ? 'text-red-500' : 'text-emerald-500'}`}>
                                {person.chaosScore > 50 ? 'High' : 'Low'}
                            </span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-2">
                            <div className={`h-full ${person.chaosScore > 60 ? 'bg-red-500' : person.chaosScore > 30 ? 'bg-orange-500' : 'bg-emerald-500'}`} style={{ width: `${person.chaosScore}%` }}></div>
                        </div>
                        <p className="text-xs text-gray-500 text-left">{person.requests} Major Change Requests</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );

  const renderSettings = () => (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto space-y-8">
        <div className={`${theme.cardBg} ${theme.border} border rounded-2xl overflow-hidden`}>
            {/* Profile Section */}
            <div className="p-8 border-b border-white/5">
                <div className="flex justify-between items-center mb-6">
                   <h3 className={`text-xl font-bold ${theme.text}`}>Profile Settings</h3>
                   {isSaved && (
                       <span className="text-emerald-500 flex items-center gap-2 text-sm font-bold animate-in fade-in">
                           <CheckCircle size={16} /> Saved Successfully
                       </span>
                   )}
                </div>
                
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="relative group">
                        <div className={`w-28 h-28 rounded-full ${editProfile.avatar ? '' : 'bg-emerald-500/20'} flex items-center justify-center overflow-hidden border-2 ${theme.border}`}>
                            {editProfile.avatar ? (
                                <img src={editProfile.avatar} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-emerald-500 font-bold text-3xl">
                                    {editProfile.name.split(' ').map(n => n[0]).join('')}
                                </span>
                            )}
                        </div>
                        <div className="absolute -bottom-2 -right-2 flex gap-2">
                            <button 
                                onClick={() => fileInputRef.current?.click()}
                                className="bg-emerald-500 text-navy-900 p-2 rounded-full hover:bg-emerald-400 shadow-lg transition-transform hover:scale-105"
                                title="Change Avatar"
                            >
                                <Upload size={14} />
                            </button>
                            {editProfile.avatar && (
                                <button 
                                    onClick={handleRemoveAvatar}
                                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-400 shadow-lg transition-transform hover:scale-105"
                                    title="Remove Avatar"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            className="hidden" 
                            accept="image/png, image/jpeg, image/gif, image/webp"
                            onChange={handleAvatarChange}
                        />
                    </div>

                    <div className="flex-1 w-full grid md:grid-cols-2 gap-6">
                        <div>
                            <label className={`block text-sm font-bold ${theme.textMuted} mb-2`}>Full Name</label>
                            <input 
                                type="text" 
                                value={editProfile.name}
                                onChange={(e) => setEditProfile({...editProfile, name: e.target.value})}
                                className={`w-full ${theme.bg} border ${theme.border} rounded-lg p-3 ${theme.text} outline-none focus:border-emerald-500 transition-colors`} 
                            />
                        </div>
                        <div>
                            <label className={`block text-sm font-bold ${theme.textMuted} mb-2`}>Email</label>
                            <input 
                                type="email" 
                                value={editProfile.email}
                                onChange={(e) => setEditProfile({...editProfile, email: e.target.value})}
                                className={`w-full ${theme.bg} border ${theme.border} rounded-lg p-3 ${theme.text} outline-none focus:border-emerald-500 transition-colors`} 
                            />
                        </div>
                        <div className="md:col-span-2 flex justify-end">
                            <button 
                                onClick={handleSaveProfile}
                                className="bg-emerald-500 text-navy-900 px-6 py-2 rounded-lg font-bold text-sm hover:bg-emerald-400 flex items-center gap-2 transition-colors"
                            >
                                <Save size={16} /> Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* API Keys */}
            <div className="p-8">
                 <h3 className={`text-xl font-bold ${theme.text} mb-6`}>Integrations & API Configuration</h3>
                 
                 <div className="space-y-6">
                     {/* Core API */}
                     <div>
                        <div className="flex justify-between mb-2">
                            <label className={`block text-sm font-bold ${theme.textMuted}`}>Core API Key (ChaosCTRL)</label>
                            <span className="text-emerald-500 text-xs font-bold cursor-pointer hover:underline">Regenerate</span>
                        </div>
                        <div className="flex gap-2 relative">
                             <input 
                                type={visibleKeys['core'] ? "text" : "password"} 
                                value={apiConfigs.core} 
                                readOnly 
                                className={`flex-1 ${theme.bg} border ${theme.border} rounded-lg p-3 pr-10 ${theme.textMuted} font-mono`} 
                             />
                             <button 
                                onClick={() => toggleKeyVisibility('core')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                             >
                                 {visibleKeys['core'] ? <EyeOff size={16} /> : <Eye size={16} />}
                             </button>
                        </div>
                     </div>

                     <div className="grid md:grid-cols-2 gap-6">
                         {/* Email */}
                         <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Mail size={16} className="text-gray-400" />
                                <label className={`block text-sm font-bold ${theme.textMuted}`}>Email Service (SMTP/API)</label>
                            </div>
                            <div className="relative">
                                <input 
                                    type={visibleKeys['email'] ? "text" : "password"}
                                    placeholder="Enter API Key or SMTP credentials..."
                                    value={apiConfigs.email}
                                    onChange={(e) => setApiConfigs({...apiConfigs, email: e.target.value})}
                                    className={`w-full ${theme.bg} border ${theme.border} rounded-lg p-3 pr-10 ${theme.text} outline-none focus:border-emerald-500 font-mono`} 
                                />
                                <button 
                                    onClick={() => toggleKeyVisibility('email')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                                >
                                    {visibleKeys['email'] ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                         </div>

                         {/* Slack */}
                         <div>
                            <div className="flex items-center gap-2 mb-2">
                                <MessageSquare size={16} className="text-gray-400" />
                                <label className={`block text-sm font-bold ${theme.textMuted}`}>Slack Webhook URL</label>
                            </div>
                            <div className="relative">
                                <input 
                                    type={visibleKeys['slack'] ? "text" : "password"}
                                    placeholder="https://hooks.slack.com/services/..."
                                    value={apiConfigs.slack}
                                    onChange={(e) => setApiConfigs({...apiConfigs, slack: e.target.value})}
                                    className={`w-full ${theme.bg} border ${theme.border} rounded-lg p-3 pr-10 ${theme.text} outline-none focus:border-emerald-500 font-mono`} 
                                />
                                <button 
                                    onClick={() => toggleKeyVisibility('slack')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                                >
                                    {visibleKeys['slack'] ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                         </div>

                         {/* Jira */}
                         <div>
                            <div className="flex items-center gap-2 mb-2">
                                <FileCode size={16} className="text-gray-400" />
                                <label className={`block text-sm font-bold ${theme.textMuted}`}>Jira API Token</label>
                            </div>
                            <div className="relative">
                                <input 
                                    type={visibleKeys['jira'] ? "text" : "password"}
                                    placeholder="Enter Jira Personal Access Token..."
                                    value={apiConfigs.jira}
                                    onChange={(e) => setApiConfigs({...apiConfigs, jira: e.target.value})}
                                    className={`w-full ${theme.bg} border ${theme.border} rounded-lg p-3 pr-10 ${theme.text} outline-none focus:border-emerald-500 font-mono`} 
                                />
                                <button 
                                    onClick={() => toggleKeyVisibility('jira')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                                >
                                    {visibleKeys['jira'] ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                         </div>

                         {/* Trello */}
                         <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Trello size={16} className="text-gray-400" />
                                <label className={`block text-sm font-bold ${theme.textMuted}`}>Trello API Key</label>
                            </div>
                            <div className="relative">
                                <input 
                                    type={visibleKeys['trello'] ? "text" : "password"}
                                    placeholder="Enter Trello Power-Up Key..."
                                    value={apiConfigs.trello}
                                    onChange={(e) => setApiConfigs({...apiConfigs, trello: e.target.value})}
                                    className={`w-full ${theme.bg} border ${theme.border} rounded-lg p-3 pr-10 ${theme.text} outline-none focus:border-emerald-500 font-mono`} 
                                />
                                <button 
                                    onClick={() => toggleKeyVisibility('trello')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                                >
                                    {visibleKeys['trello'] ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                         </div>
                     </div>
                     
                     <div className="flex justify-end pt-4">
                         <button 
                             onClick={handleSaveProfile}
                             className={`bg-white/5 text-${isDarkMode ? 'white' : 'slate-900'} hover:bg-white/10 px-6 py-2 rounded-lg font-bold text-sm border ${theme.border} transition-colors`}
                         >
                             Update Configurations
                         </button>
                     </div>
                 </div>
            </div>
        </div>
    </div>
  );

  const renderRoadmap = () => {
    // Group items by year
    const itemsByYear: Record<number, typeof roadmapItems> = {};
    roadmapItems.forEach(item => {
        if (!itemsByYear[item.year]) itemsByYear[item.year] = [];
        itemsByYear[item.year].push(item);
    });
    
    const years = Object.keys(itemsByYear).map(Number).sort((a,b) => a - b);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return (
      <div className="animate-in fade-in duration-500">
          <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                  <Map className="text-emerald-500" size={24} />
                  <h3 className={`text-xl font-bold ${theme.text}`}>Strategic Initiatives</h3>
              </div>
              <button 
                  onClick={() => setIsRoadmapModalOpen(true)}
                  className="bg-emerald-500 text-navy-900 px-4 py-2 rounded-lg font-bold text-sm hover:bg-emerald-400 transition-colors flex items-center gap-2"
              >
                  <Plus size={16} /> Add Initiative
              </button>
          </div>

          <div className="space-y-8">
              {years.map(year => (
                  <div key={year} className={`${theme.cardBg} ${theme.border} border rounded-2xl p-6 ${theme.shadow}`}>
                      <h4 className={`text-lg font-bold ${theme.text} mb-6 border-b ${theme.border} pb-2`}>{year} Roadmap</h4>
                      
                      <div className="relative">
                          {/* Grid Lines */}
                          <div className="grid grid-cols-12 gap-0 absolute inset-0 h-full pointer-events-none">
                              {months.map((m, i) => (
                                  <div key={i} className={`border-r ${theme.border} ${i === 0 ? 'border-l' : ''} h-full opacity-30`}></div>
                              ))}
                          </div>
                          
                          {/* Header */}
                          <div className="grid grid-cols-12 gap-0 mb-4 relative z-10">
                              {months.map((m, i) => (
                                  <div key={i} className={`text-xs font-bold ${theme.textMuted} text-center uppercase`}>{m}</div>
                              ))}
                          </div>

                          {/* Bars */}
                          <div className="space-y-3 relative z-10">
                              {itemsByYear[year].map((item) => (
                                  <div key={item.id} className="grid grid-cols-12 gap-0 h-10 items-center hover:bg-white/5 rounded-lg transition-colors group">
                                      <div 
                                          className="col-span-12 relative h-full flex items-center" 
                                          style={{ 
                                              gridColumnStart: item.start + 1, 
                                              gridColumnEnd: item.start + 1 + item.duration 
                                          }}
                                      >
                                          <motion.div 
                                              initial={{ width: 0 }}
                                              animate={{ width: '100%' }}
                                              className={`h-8 rounded-md flex items-center px-3 justify-between w-full shadow-lg border border-white/5 cursor-pointer hover:brightness-110 transition-all ${
                                                  item.status === 'Done' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 
                                                  item.status === 'At Risk' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 
                                                  item.status === 'Delayed' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' : 
                                                  'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                              }`}
                                          >
                                              <span className="font-bold text-xs truncate mr-2">{item.feature}</span>
                                              <span className="text-[10px] uppercase font-bold opacity-75">{item.owner}</span>
                                          </motion.div>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </div>
    );
  };

  const renderScopeItems = () => {
    const activeRequests = changeRequests.filter(req => !req.archived);

    return (
      <div className="animate-in fade-in duration-500">
          <div className={`${theme.cardBg} ${theme.border} border rounded-2xl overflow-hidden ${theme.shadow}`}>
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                      <h3 className={`text-xl font-bold ${theme.text}`}>Active Change Requests</h3>
                      {/* Live Chaos Score Indicator in Scope View */}
                      <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border ${theme.border} bg-navy-900/50`}>
                        <Activity size={14} className={currentChaosScore > 50 ? "text-red-500" : "text-emerald-500"} />
                        <span className={`${theme.textMuted} text-[10px] font-bold uppercase`}>Current Chaos Level:</span>
                        <span className={`font-bold text-sm ${theme.text}`}>{currentChaosScore}</span>
                      </div>
                  </div>
                  <div className="flex gap-2">
                      <button className={`p-2 rounded-lg ${theme.hover} ${theme.textMuted}`}><Filter size={20} /></button>
                      <button className={`p-2 rounded-lg ${theme.hover} ${theme.textMuted}`}><Download size={20} /></button>
                  </div>
              </div>
              
              <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                      <thead>
                          <tr className={`border-b ${theme.border} text-xs uppercase ${theme.textMuted}`}>
                              <th className="p-4 font-bold">Request ID</th>
                              <th className="p-4 font-bold">Description</th>
                              <th className="p-4 font-bold">Chaos Score</th>
                              <th className="p-4 font-bold">Impact</th>
                              <th className="p-4 font-bold">Source</th>
                              <th className="p-4 font-bold">Status</th>
                              <th className="p-4 font-bold text-right">Actions</th>
                          </tr>
                      </thead>
                      <tbody>
                          {activeRequests.length > 0 ? (
                              activeRequests.map((req) => (
                                  <tr key={req.id} className={`border-b ${theme.border} last:border-0 hover:bg-white/5 transition-colors group`}>
                                      <td className={`p-4 font-mono text-sm ${theme.textMuted}`}>#{req.id.substring(0, 8)}</td>
                                      <td className="p-4">
                                          <p className={`font-medium ${theme.text}`}>{req.description}</p>
                                          {req.reasoning && <p className="text-xs text-gray-500 mt-1 max-w-md truncate">{req.reasoning}</p>}
                                      </td>
                                      <td className="p-4">
                                          <div className="flex items-center gap-2">
                                              <span className={`font-bold ${req.score > 70 ? 'text-red-500' : req.score > 40 ? 'text-orange-500' : 'text-emerald-500'}`}>{req.score}</span>
                                              <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                                  <div className={`h-full ${req.score > 70 ? 'bg-red-500' : req.score > 40 ? 'bg-orange-500' : 'bg-emerald-500'}`} style={{ width: `${req.score}%` }}></div>
                                              </div>
                                          </div>
                                      </td>
                                      <td className={`p-4 font-bold ${theme.text}`}>+{req.impactDays} days</td>
                                      <td className="p-4">
                                          <span className={`text-xs px-2 py-1 rounded bg-white/10 ${theme.text}`}>{req.source}</span>
                                      </td>
                                      <td className="p-4">
                                          <span className={`text-xs px-2 py-1 rounded font-bold uppercase ${
                                              req.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500' :
                                              req.status === 'rejected' ? 'bg-red-500/10 text-red-500' :
                                              'bg-blue-500/10 text-blue-500'
                                          }`}>
                                              {req.status}
                                          </span>
                                      </td>
                                      <td className="p-4 text-right">
                                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                              {req.status === 'pending' && (
                                                  <>
                                                      <button onClick={() => handleStatusUpdate(req.id, 'approved')} className="p-1.5 rounded bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-navy-900 transition-colors" title="Approve">
                                                          <Check size={16} />
                                                      </button>
                                                      <button onClick={() => handleStatusUpdate(req.id, 'rejected')} className="p-1.5 rounded bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors" title="Reject">
                                                          <X size={16} />
                                                      </button>
                                                  </>
                                              )}
                                              <button onClick={() => handleArchive(req.id)} className={`p-1.5 rounded ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'} hover:bg-gray-600 hover:text-white transition-colors`} title="Archive">
                                                  <ArchiveIcon size={16} />
                                              </button>
                                          </div>
                                      </td>
                                  </tr>
                              ))
                          ) : (
                              <tr>
                                  <td colSpan={7} className="p-8 text-center text-gray-500">No active scope changes found.</td>
                              </tr>
                          )}
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
    );
  };

  const renderVelocity = () => (
    <div className="animate-in fade-in duration-500 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Velocity Chart */}
            <div className={`${theme.cardBg} ${theme.border} border rounded-2xl p-6 ${theme.shadow}`}>
                <h3 className={`text-lg font-bold ${theme.text} mb-6`}>Sprint Velocity</h3>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={velocityData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} />
                            <XAxis dataKey="sprint" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#9CA3AF' : '#64748B' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#9CA3AF' : '#64748B' }} />
                            <RechartsTooltip 
                                cursor={{ fill: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }} 
                                contentStyle={{ backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF', borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#E2E8F0', color: isDarkMode ? '#fff' : '#000' }}
                            />
                            <Legend />
                            <Bar dataKey="committed" fill="#3B82F6" name="Committed Points" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="completed" fill="#10B981" name="Completed Points" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Cumulative Flow */}
            <div className={`${theme.cardBg} ${theme.border} border rounded-2xl p-6 ${theme.shadow}`}>
                <h3 className={`text-lg font-bold ${theme.text} mb-6`}>Cumulative Flow</h3>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={cumulativeFlowData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#9CA3AF' : '#64748B' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#9CA3AF' : '#64748B' }} />
                            <RechartsTooltip 
                                contentStyle={{ backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF', borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#E2E8F0', color: isDarkMode ? '#fff' : '#000' }}
                            />
                            <Legend />
                            <Area type="monotone" dataKey="done" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} name="Done" />
                            <Area type="monotone" dataKey="inProgress" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} name="In Progress" />
                            <Area type="monotone" dataKey="todo" stackId="1" stroke="#6B7280" fill="#6B7280" fillOpacity={0.6} name="To Do" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>

        {/* Insight Card */}
        <div className={`bg-gradient-to-r from-navy-800 to-navy-900 border ${theme.border} rounded-2xl p-8 relative overflow-hidden`}>
            <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10 flex items-start gap-4">
                <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
                    <Activity size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white mb-2">Velocity Insight</h3>
                    <p className="text-gray-400 max-w-2xl">
                        Your team's velocity dipped by <strong>20% in Sprint 4</strong> directly correlating with the "High Chaos" spike in scope changes. 
                        Rejecting the 2 flagged high-risk requests in the current sprint is projected to restore velocity to <strong>50 points</strong>.
                    </p>
                </div>
            </div>
        </div>
    </div>
  );

  const renderArchive = () => {
    const archivedRequests = changeRequests.filter(req => req.archived);

    return (
      <div className="animate-in fade-in duration-500">
          <div className={`${theme.cardBg} ${theme.border} border rounded-2xl overflow-hidden ${theme.shadow}`}>
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                      <ArchiveIcon className="text-gray-400" size={24} />
                      <h3 className={`text-xl font-bold ${theme.text}`}>Archived Requests</h3>
                  </div>
                  <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded text-gray-400">{archivedRequests.length} items</span>
              </div>
              
              <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                      <thead>
                          <tr className={`border-b ${theme.border} text-xs uppercase ${theme.textMuted}`}>
                              <th className="p-4 font-bold">Request ID</th>
                              <th className="p-4 font-bold">Description</th>
                              <th className="p-4 font-bold">Original Score</th>
                              <th className="p-4 font-bold">Source</th>
                              <th className="p-4 font-bold">Timestamp</th>
                              <th className="p-4 font-bold text-right">Actions</th>
                          </tr>
                      </thead>
                      <tbody>
                          {archivedRequests.length > 0 ? (
                              archivedRequests.map((req) => (
                                  <tr key={req.id} className={`border-b ${theme.border} last:border-0 hover:bg-white/5 transition-colors group opacity-75 hover:opacity-100`}>
                                      <td className={`p-4 font-mono text-sm ${theme.textMuted}`}>#{req.id.substring(0, 8)}</td>
                                      <td className="p-4">
                                          <p className={`font-medium ${theme.text} line-through text-gray-500`}>{req.description}</p>
                                      </td>
                                      <td className="p-4">
                                          <span className="text-gray-500 font-bold">{req.score}</span>
                                      </td>
                                      <td className="p-4">
                                          <span className={`text-xs px-2 py-1 rounded bg-white/5 ${theme.textMuted}`}>{req.source}</span>
                                      </td>
                                      <td className={`p-4 text-sm ${theme.textMuted}`}>{req.timestamp}</td>
                                      <td className="p-4 text-right">
                                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                              <button onClick={() => handleRestore(req.id)} className="p-1.5 rounded bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-navy-900 transition-colors" title="Restore">
                                                  <RotateCcw size={16} />
                                              </button>
                                              <button onClick={() => handleDelete(req.id)} className="p-1.5 rounded bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors" title="Permanently Delete">
                                                  <Trash2 size={16} />
                                              </button>
                                          </div>
                                      </td>
                                  </tr>
                              ))
                          ) : (
                              <tr>
                                  <td colSpan={6} className="p-8 text-center text-gray-500">No archived items.</td>
                              </tr>
                          )}
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
    );
  };

  const renderContent = () => {
      switch(activeTab) {
          case 'marketplace': return renderRoadmap();
          case 'orders': return renderScopeItems();
          case 'tracking': return renderVelocity();
          case 'customers': return renderStakeholders();
          case 'settings': return renderSettings();
          case 'archive': return renderArchive();
          default: return renderDashboard();
      }
  };

  const getPageTitle = () => {
      switch(activeTab) {
          case 'marketplace': return 'Roadmap';
          case 'orders': return 'Scope Items';
          case 'tracking': return 'Velocity';
          case 'customers': return 'Stakeholders';
          case 'settings': return 'Settings';
          case 'archive': return 'Archive';
          default: return 'Dashboard';
      }
  };

  return (
    <div className={`min-h-screen ${theme.bg} flex font-sans transition-colors duration-300`}>
      <AnalysisModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAccept={handleAddChange}
      />

      {renderStakeholderModal()}
      {renderAddRoadmapModal()}

      {/* Sidebar */}
      <aside className={`w-72 ${theme.sidebarBg} border-r ${theme.border} fixed h-full z-40 flex flex-col transition-colors duration-300`}>
         <div className="p-8 flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center bg-emerald-500 rounded-lg text-white shadow-lg shadow-emerald-500/30">
                <Gem size={18} />
            </div>
            <span className={`font-display font-bold text-xl ${theme.text}`}>Chaos<span className="text-emerald-500">CTRL</span></span>
         </div>

         <div className="flex-1 px-4 space-y-8 overflow-y-auto">
             <div>
                 <h4 className={`px-4 text-xs font-bold ${theme.textMuted} uppercase tracking-wider mb-4`}>Analytics</h4>
                 <div className="space-y-1">
                     <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'dashboard' ? theme.navActive : theme.navInactive}`}>
                         <LayoutDashboard size={20} /> Dashboard
                     </button>
                     <button onClick={() => setActiveTab('marketplace')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'marketplace' ? theme.navActive : theme.navInactive}`}>
                         <Map size={20} /> Roadmap
                     </button>
                     <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'orders' ? theme.navActive : theme.navInactive}`}>
                         <Layers size={20} /> Scope Items
                     </button>
                     <button onClick={() => setActiveTab('tracking')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'tracking' ? theme.navActive : theme.navInactive}`}>
                         <Activity size={20} /> Velocity
                     </button>
                     <button onClick={() => setActiveTab('customers')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'customers' ? theme.navActive : theme.navInactive}`}>
                         <Users size={20} /> Stakeholders
                     </button>
                     <button onClick={() => setActiveTab('archive')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'archive' ? theme.navActive : theme.navInactive}`}>
                         <ArchiveIcon size={20} /> Archive
                     </button>
                 </div>
             </div>

             <div>
                 <h4 className={`px-4 text-xs font-bold ${theme.textMuted} uppercase tracking-wider mb-4`}>System</h4>
                 <div className="space-y-1">
                     <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'settings' ? theme.navActive : theme.navInactive}`}>
                         <Settings size={20} /> Settings
                     </button>
                 </div>
             </div>
         </div>

         <div className={`p-4 border-t ${theme.border}`}>
             <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                     <div className={`w-10 h-10 rounded-full ${userProfile.avatar ? '' : 'bg-emerald-500/20'} flex items-center justify-center font-bold text-emerald-500 overflow-hidden`}>
                         {userProfile.avatar ? (
                             <img src={userProfile.avatar} alt="Profile" className="w-full h-full object-cover" />
                         ) : (
                             userProfile.name.split(' ').map(n => n[0]).join('')
                         )}
                     </div>
                     <div className="flex-1">
                         <p className={`text-sm font-bold ${theme.text}`}>{userProfile.name}</p>
                         <p className={`text-xs ${theme.textMuted}`}>{userProfile.role}</p>
                     </div>
                 </div>
                 <div className="flex items-center gap-1">
                    <button 
                        onClick={toggleTheme} 
                        className={`p-2 rounded-lg hover:bg-white/10 transition-colors ${theme.textMuted}`}
                        title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                        {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
                    </button>
                    <button 
                        onClick={onLogout} 
                        className={`p-2 rounded-lg hover:bg-red-500/10 hover:text-red-500 transition-colors ${theme.textMuted}`}
                        title="Log Out"
                    >
                        <LogOut size={18} />
                    </button>
                 </div>
             </div>
         </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 p-8 overflow-y-auto">
         {/* Top Header */}
         <div className="flex justify-between items-center mb-10">
            <div>
               <h1 className={`text-3xl font-display font-bold ${theme.text} mb-1`}>{getPageTitle()}</h1>
               <p className={`${theme.textMuted} text-sm`}>
                   {activeTab === 'dashboard' ? "Overview of your project's entropy" : 
                    activeTab === 'marketplace' ? "Strategic deliverable timeline" :
                    activeTab === 'orders' ? "Manage and audit scope change requests" :
                    activeTab === 'tracking' ? "Team velocity and burn-down analytics" :
                    activeTab === 'customers' ? "Key stakeholders and their chaos impact" :
                    activeTab === 'archive' ? "View and restore archived change requests" : "System preferences"}
               </p>
            </div>
            
            {/* Conditional Header Elements - Hidden on Settings Page */}
            {activeTab !== 'settings' && (
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <button 
                            onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                            className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full border ${theme.border} ${theme.cardBg} hover:border-emerald-500 transition-colors`}
                        >
                            <span className={`${theme.textMuted} text-sm`}>Time period:</span>
                            <span className={`text-sm font-bold ${theme.text}`}>{timePeriod}</span>
                            <ChevronDown size={14} className={theme.textMuted} />
                        </button>
                        
                        <AnimatePresence>
                            {isTimeDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className={`absolute right-0 top-full mt-2 w-48 ${theme.cardBg} ${theme.border} border rounded-xl shadow-xl z-50 overflow-hidden`}
                                >
                                    {timeOptions.map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => {
                                                setTimePeriod(opt);
                                                setIsTimeDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2 text-sm font-medium ${theme.text} hover:${theme.hover} transition-colors ${timePeriod === opt ? 'text-emerald-500 bg-emerald-500/10' : ''}`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <button className={`p-3 rounded-full border ${theme.border} ${theme.cardBg} ${theme.text} hover:border-emerald-500 transition-colors`}>
                        <Bell size={20} />
                    </button>
                </div>
            )}
         </div>

         {renderContent()}

      </main>
    </div>
  );
};

export default Dashboard;