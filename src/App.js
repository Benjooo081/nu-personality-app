import React, { useState, useEffect, useRef } from 'react';
import { Brain, ChevronRight, ChevronLeft, Sparkles, Target, Heart, X, Briefcase, User } from 'lucide-react';

// NU Logo Component with Animation
const NULogo = ({ size = 'large', className = '' }) => {
  const sizes = {
    small: 'w-12 h-12',
    medium: 'w-24 h-24',
    large: 'w-48 h-48'
  };

  return (
    <div className={`${sizes[size]} ${className} relative`}>
      <svg viewBox="0 0 200 200" className="w-full h-full animate-float">
        {/* Rainbow Ring */}
        <defs>
          <linearGradient id="rainbowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#FF6B9D', stopOpacity: 1 }} />
            <stop offset="25%" style={{ stopColor: '#C44BFF', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#4B9FFF', stopOpacity: 1 }} />
            <stop offset="75%" style={{ stopColor: '#4BFFEF', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#FFD93D', stopOpacity: 1 }} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Outer Ring */}
        <circle
          cx="100"
          cy="100"
          r="85"
          fill="none"
          stroke="url(#rainbowGradient)"
          strokeWidth="8"
          filter="url(#glow)"
        />
        
        {/* Inner Circle Background */}
        <circle cx="100" cy="100" r="70" fill="rgba(30, 20, 60, 0.8)" />
        
        {/* NU Text */}
        <text
          x="100"
          y="115"
          fontSize="60"
          fontWeight="bold"
          fill="#FF6B9D"
          textAnchor="middle"
          filter="url(#glow)"
          className="font-sans"
        >
          NU
        </text>
      </svg>
      
      {/* Particle effects for large size */}
      {size === 'large' && (
        <>
          <div className="absolute inset-0 animate-ping opacity-20">
            <div className="w-full h-full rounded-full border-4 border-cyan-400"></div>
          </div>
          <div className="absolute -inset-4 animate-pulse opacity-30">
            <div className="w-full h-full rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 blur-xl"></div>
          </div>
        </>
      )}
    </div>
  );
};

// Brain Progress Indicator
const BrainProgress = ({ progress, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#FF6B9D', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#4B9FFF', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#4BFFEF', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        
        {/* Background Circle */}
        <circle
          cx="60"
          cy="60"
          r="50"
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="8"
        />
        
        {/* Progress Circle */}
        <circle
          cx="60"
          cy="60"
          r="50"
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * 50}`}
          strokeDashoffset={`${2 * Math.PI * 50 * (1 - progress / 100)}`}
          transform="rotate(-90 60 60)"
          className="transition-all duration-500"
          filter="url(#glow)"
        />
      </svg>
      
      {/* Brain Icon - Centered */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Brain size={36} className="text-cyan-400" />
      </div>
    </div>
  );
};

// Category Card Component
const CategoryCard = ({ icon: Icon, title, description, progress, onClick, completed }) => {
  return (
    <button
      onClick={onClick}
      className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border-2 border-transparent hover:border-cyan-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50 w-full"
    >
      {/* Completion Badge */}
      {completed && (
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
          <span className="text-white text-xl">✓</span>
        </div>
      )}
      
      {/* Icon */}
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-500/20 to-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
        <Icon size={32} className="text-cyan-400" />
      </div>
      
      {/* Title */}
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      
      {/* Description */}
      <p className="text-slate-400 text-sm mb-4">{description}</p>
      
      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-cyan-400 text-xs mt-2 font-semibold">{Math.round(progress)}% abgeschlossen</p>
      
      {/* Arrow */}
      <ChevronRight className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-600 group-hover:text-cyan-400 transition-colors" />
    </button>
  );
};

// Slider Component
const SliderInput = ({ label, value, onChange, min = 0, max = 10, description = '', isTouched = false }) => {
  const percentage = ((value - min) / (max - min)) * 100;
  const [justTouched, setJustTouched] = useState(false);
  
  const handleChange = (newValue) => {
    if (!isTouched) {
      setJustTouched(true);
      setTimeout(() => setJustTouched(false), 600);
    }
    onChange(newValue);
  };
  
  return (
    <div className={`bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border transition-all ${
      isTouched 
        ? 'border-cyan-500/50 hover:border-cyan-500' 
        : 'border-slate-700/30 opacity-60 hover:border-slate-600'
    } ${justTouched ? 'animate-pulse-once' : ''}`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <label className={`font-semibold text-base block transition-colors ${isTouched ? 'text-white' : 'text-slate-500'}`}>
            {label}
          </label>
          {description && <p className="text-slate-400 text-xs mt-1">{description}</p>}
        </div>
        <span className={`font-bold text-xl ml-4 min-w-[3rem] text-right transition-colors ${
          isTouched ? 'text-cyan-400' : 'text-slate-600'
        }`}>
          {value}
        </span>
      </div>
      
      {/* Custom Slider */}
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => handleChange(parseInt(e.target.value))}
          className="slider-custom w-full h-4 bg-slate-700 rounded-full appearance-none cursor-pointer"
          style={{
            background: isTouched 
              ? `linear-gradient(to right, 
                  #FF6B9D 0%, 
                  #C44BFF ${percentage * 0.25}%, 
                  #4B9FFF ${percentage * 0.5}%, 
                  #4BFFEF ${percentage * 0.75}%, 
                  #FFD93D ${percentage}%, 
                  #334155 ${percentage}%, 
                  #334155 100%)`
              : `linear-gradient(to right, 
                  #475569 0%,
                  #475569 ${percentage}%, 
                  #1e293b ${percentage}%, 
                  #1e293b 100%)`
          }}
        />
      </div>
    </div>
  );
};

// Project Selection Component
const ProjectSelection = ({ options, selectedProjects, onChange }) => {
  const toggleProject = (key) => {
    onChange({
      ...selectedProjects,
      [key]: !selectedProjects[key]
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {options.map((option) => {
        const isSelected = selectedProjects[option.key];
        return (
          <button
            key={option.key}
            onClick={() => toggleProject(option.key)}
            className={`relative p-6 rounded-xl border-2 transition-all duration-300 text-left ${
              isSelected
                ? 'border-cyan-400 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 shadow-lg shadow-cyan-500/30'
                : 'border-slate-700 bg-slate-800/30 hover:border-slate-600'
            }`}
          >
            {/* Checkmark */}
            {isSelected && (
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <span className="text-white text-xl font-bold">✓</span>
              </div>
            )}
            
            {/* Emoji & Label */}
            <div className="flex items-center gap-4">
              <span className="text-5xl">{option.emoji}</span>
              <div className="flex-1">
                <h4 className={`font-semibold text-lg ${isSelected ? 'text-cyan-400' : 'text-white'}`}>
                  {option.label}
                </h4>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

// Main App Component
export default function NUPersonalityApp() {
  const [step, setStep] = useState('intro'); // intro, categories, category-detail, result
  const [currentCategory, setCurrentCategory] = useState(null);
  const [data, setData] = useState({
    demographic: {},
    psychographic: {},
    interests: {},
    nogos: {},
    projects: {}
  });
  const [touched, setTouched] = useState({
    demographic: {},
    psychographic: {},
    interests: {},
    nogos: {},
    projects: {}
  });
  const [lastProgress, setLastProgress] = useState(0);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const vibrationIntervalRef = useRef(null);
  
  const canvasRef = useRef(null);

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  // Haptic Feedback System
  const vibrate = (pattern) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  };

  // Single tap for slider activation (stronger)
  const vibrateSliderTouch = () => {
    vibrate(50); // 50ms medium tap
  };

  // Milestone vibrations (much stronger)
  const vibrateMilestone = () => {
    vibrate([100, 80, 100, 80, 100]); // Five strong pulses
  };

  // Category complete (celebration pattern - very noticeable)
  const vibrateCategoryComplete = () => {
    vibrate([80, 60, 80, 60, 120]); // Rhythmic pattern ending with strong pulse
  };

  // Start progress heartbeat based on progress percentage
  const startProgressHeartbeat = (progress) => {
    // Stop any existing heartbeat
    if (vibrationIntervalRef.current) {
      clearInterval(vibrationIntervalRef.current);
      vibrationIntervalRef.current = null;
    }

    // Calculate BPM based on progress (0 BPM at 0%, 80 BPM at 100%)
    const bpm = Math.round((progress / 100) * 80);
    
    if (bpm === 0) return; // No heartbeat at 0%

    // Convert BPM to milliseconds between beats
    const interval = 60000 / bpm; // milliseconds per beat

    // Start heartbeat interval
    vibrationIntervalRef.current = setInterval(() => {
      // Check if 30 seconds have passed since last activity
      const timeSinceLastActivity = Date.now() - lastActivityTime;
      if (timeSinceLastActivity > 30000) {
        // Stop heartbeat after 30 seconds of inactivity
        if (vibrationIntervalRef.current) {
          clearInterval(vibrationIntervalRef.current);
          vibrationIntervalRef.current = null;
        }
        return;
      }

      // Heartbeat pattern: stronger pulse for better feel
      vibrate(50);
    }, interval);
  };

  // Stop heartbeat
  const stopProgressHeartbeat = () => {
    if (vibrationIntervalRef.current) {
      clearInterval(vibrationIntervalRef.current);
      vibrationIntervalRef.current = null;
    }
  };

  // Categories Definition
  const categories = {
    demographic: {
      id: 'demographic',
      icon: User,
      title: 'Demographische Attribute',
      description: 'Grundlegende persönliche Merkmale',
      fields: [
        { key: 'age', label: 'Alter', min: 18, max: 80, description: 'Dein aktuelles Alter' },
        { key: 'education', label: 'Bildungsgrad', min: 0, max: 10, description: 'Schule (0) bis PhD (10)' },
        { key: 'experience', label: 'Berufserfahrung', min: 0, max: 40, description: 'Jahre im Berufsleben' },
        { key: 'location', label: 'Wohnort-Typ', min: 0, max: 10, description: 'Ländlich (0) bis Urban (10)' },
        { key: 'family', label: 'Familienstatus', min: 0, max: 10, description: 'Single (0) bis Großfamilie (10)' },
        { key: 'income', label: 'Einkommens-Level', min: 0, max: 10, description: 'Relativ zu deinem Umfeld' },
        { key: 'tech', label: 'Technik-Affinität', min: 0, max: 10, description: 'Analog (0) bis Digital Native (10)' },
        { key: 'mobility', label: 'Mobilität', min: 0, max: 10, description: 'Sesshaft (0) bis Nomade (10)' },
        { key: 'network', label: 'Netzwerk-Größe', min: 0, max: 10, description: 'Klein (0) bis Sehr groß (10)' },
        { key: 'health', label: 'Gesundheits-Bewusstsein', min: 0, max: 10, description: 'Niedrig (0) bis Sehr hoch (10)' }
      ]
    },
    psychographic: {
      id: 'psychographic',
      icon: Brain,
      title: 'Psychographische Attribute',
      description: 'Deine Persönlichkeit & Denkweise',
      fields: [
        { key: 'introvert', label: 'Introvertiert ↔ Extrovertiert', min: 0, max: 10 },
        { key: 'creative', label: 'Kreativ ↔ Analytisch', min: 0, max: 10 },
        { key: 'risk', label: 'Risikobereit ↔ Sicherheitsorientiert', min: 0, max: 10 },
        { key: 'spontaneous', label: 'Spontan ↔ Geplant', min: 0, max: 10 },
        { key: 'optimistic', label: 'Optimistisch ↔ Realistisch', min: 0, max: 10 },
        { key: 'team', label: 'Individualist ↔ Teamplayer', min: 0, max: 10 },
        { key: 'innovative', label: 'Innovativ ↔ Traditionell', min: 0, max: 10 },
        { key: 'emotional', label: 'Emotional ↔ Rational', min: 0, max: 10 },
        { key: 'adventure', label: 'Abenteuerlustig ↔ Gemütlich', min: 0, max: 10 },
        { key: 'competitive', label: 'Wettbewerbsorientiert ↔ Kooperativ', min: 0, max: 10 },
        { key: 'perfectionist', label: 'Perfektionistisch ↔ Pragmatisch', min: 0, max: 10 },
        { key: 'status', label: 'Status-bewusst ↔ Bescheiden', min: 0, max: 10 }
      ]
    },
    interests: {
      id: 'interests',
      icon: Sparkles,
      title: 'Interessen',
      description: 'Was dich begeistert & motiviert',
      fields: [
        { key: 'tech', label: 'Technologie & Innovation', min: 0, max: 10 },
        { key: 'sports', label: 'Sport & Fitness', min: 0, max: 10 },
        { key: 'art', label: 'Kunst & Kultur', min: 0, max: 10 },
        { key: 'travel', label: 'Reisen & Abenteuer', min: 0, max: 10 },
        { key: 'gaming', label: 'Gaming & E-Sports', min: 0, max: 10 },
        { key: 'music', label: 'Musik & Festivals', min: 0, max: 10 },
        { key: 'cooking', label: 'Kochen & Kulinarik', min: 0, max: 10 },
        { key: 'fashion', label: 'Mode & Design', min: 0, max: 10 },
        { key: 'science', label: 'Wissenschaft & Forschung', min: 0, max: 10 },
        { key: 'business', label: 'Unternehmertum & Business', min: 0, max: 10 },
        { key: 'sustainability', label: 'Nachhaltigkeit & Umwelt', min: 0, max: 10 },
        { key: 'social', label: 'Social Media & Content', min: 0, max: 10 },
        { key: 'reading', label: 'Lesen & Bildung', min: 0, max: 10 },
        { key: 'spirituality', label: 'Spiritualität & Meditation', min: 0, max: 10 },
        { key: 'outdoor', label: 'Outdoor & Natur', min: 0, max: 10 }
      ]
    },
    nogos: {
      id: 'nogos',
      icon: X,
      title: 'No-Gos',
      description: 'Was du absolut nicht tolerierst',
      fields: [
        { key: 'dishonesty', label: 'Unehrlichkeit', min: 0, max: 10 },
        { key: 'unpunctual', label: 'Unpünktlichkeit', min: 0, max: 10 },
        { key: 'arrogance', label: 'Arroganz', min: 0, max: 10 },
        { key: 'drama', label: 'Drama & Konflikte', min: 0, max: 10 },
        { key: 'superficial', label: 'Oberflächlichkeit', min: 0, max: 10 },
        { key: 'unreliable', label: 'Unzuverlässigkeit', min: 0, max: 10 },
        { key: 'narrowminded', label: 'Engstirnigkeit', min: 0, max: 10 },
        { key: 'negativity', label: 'Negativität', min: 0, max: 10 },
        { key: 'disrespect', label: 'Respektlosigkeit', min: 0, max: 10 },
        { key: 'egoism', label: 'Egoismus', min: 0, max: 10 }
      ]
    },
    projects: {
      id: 'projects',
      icon: Briefcase,
      title: 'Projekte',
      description: 'Deine aktuellen Ziele & Vorhaben',
      type: 'selection', // Different type for selection
      options: [
        { key: 'umzug', label: 'Umzug', emoji: '📦' },
        { key: 'urlaub', label: 'Urlaub', emoji: '✈️' },
        { key: 'hochzeit', label: 'Hochzeit', emoji: '💍' },
        { key: 'career', label: 'Karriere-Wechsel', emoji: '💼' },
        { key: 'fitness', label: 'Fitness-Transformation', emoji: '💪' },
        { key: 'startup', label: 'Startup gründen', emoji: '🚀' },
        { key: 'education', label: 'Weiterbildung/Studium', emoji: '🎓' },
        { key: 'house', label: 'Haus/Wohnung kaufen', emoji: '🏠' },
        { key: 'baby', label: 'Familiengründung', emoji: '👶' },
        { key: 'creative', label: 'Kreatives Projekt', emoji: '🎨' },
        { key: 'investment', label: 'Investment/Vermögensaufbau', emoji: '💰' },
        { key: 'social', label: 'Social Impact Projekt', emoji: '🌍' },
        { key: 'health', label: 'Gesundheits-Challenge', emoji: '🧘' }
      ]
    }
  };

  // Calculate progress for each category (only touched fields)
  const getCategoryProgress = (categoryId) => {
    const category = categories[categoryId];
    
    // For selection type (projects), count selected items
    if (category.type === 'selection') {
      const selectedCount = Object.values(data[categoryId]).filter(Boolean).length;
      return selectedCount > 0 ? 100 : 0;
    }
    
    // For slider type, count only touched fields
    const touchedFields = Object.keys(touched[categoryId]).filter(key => touched[categoryId][key]);
    const totalFields = category.fields.length;
    return touchedFields.length > 0 ? (touchedFields.length / totalFields) * 100 : 0;
  };

  // Calculate overall progress (only touched fields)
  const getOverallProgress = () => {
    let totalFields = 0;
    let touchedFields = 0;
    
    Object.entries(categories).forEach(([id, category]) => {
      if (category.type === 'selection') {
        totalFields += 1;
        const hasSelection = Object.values(data[id]).some(Boolean);
        if (hasSelection) touchedFields += 1;
      } else {
        totalFields += category.fields.length;
        const categoryTouched = Object.keys(touched[id]).filter(key => touched[id][key]);
        touchedFields += categoryTouched.length;
      }
    });
    
    return totalFields > 0 ? (touchedFields / totalFields) * 100 : 0;
  };

  // Load data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('nu-personality-data');
    const savedTouched = localStorage.getItem('nu-personality-touched');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
    if (savedTouched) {
      setTouched(JSON.parse(savedTouched));
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('nu-personality-data', JSON.stringify(data));
    localStorage.setItem('nu-personality-touched', JSON.stringify(touched));
  }, [data, touched]);

  // Monitor progress for haptic feedback and heartbeat
  useEffect(() => {
    const currentProgress = getOverallProgress();
    
    // Milestone triggers
    if (lastProgress < 25 && currentProgress >= 25) {
      vibrateMilestone();
    }
    if (lastProgress < 50 && currentProgress >= 50) {
      vibrateMilestone();
    }
    if (lastProgress < 75 && currentProgress >= 75) {
      vibrateMilestone();
    }
    
    // Update heartbeat based on progress
    if (currentProgress > 0) {
      startProgressHeartbeat(currentProgress);
    }
    
    setLastProgress(currentProgress);
  }, [data, touched]);

  // Update activity time on any data change
  useEffect(() => {
    setLastActivityTime(Date.now());
  }, [data, touched]);

  // Cleanup heartbeat on unmount
  useEffect(() => {
    return () => {
      stopProgressHeartbeat();
    };
  }, []);

  // Update slider value and mark as touched
  const updateValue = (categoryId, key, value) => {
    const wasAlreadyTouched = touched[categoryId][key];
    
    setData(prev => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        [key]: value
      }
    }));
    
    // Mark as touched
    setTouched(prev => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        [key]: true
      }
    }));
    
    // Haptic feedback only on first touch
    if (!wasAlreadyTouched) {
      vibrateSliderTouch();
    }
  };

  // Initialize category data with default values
  const initializeCategoryData = (categoryId) => {
    const category = categories[categoryId];
    
    // For selection type, initialize empty object
    if (category.type === 'selection') {
      if (!data[categoryId] || Object.keys(data[categoryId]).length === 0) {
        setData(prev => ({
          ...prev,
          [categoryId]: {}
        }));
      }
      return;
    }
    
    // For slider type, initialize with middle values
    const initialData = {};
    category.fields.forEach(field => {
      if (!data[categoryId][field.key]) {
        initialData[field.key] = Math.round((field.min + field.max) / 2);
      }
    });
    if (Object.keys(initialData).length > 0) {
      setData(prev => ({
        ...prev,
        [categoryId]: {
          ...prev[categoryId],
          ...initialData
        }
      }));
    }
  };

  // Open category detail
  const openCategory = (categoryId) => {
    setCurrentCategory(categoryId);
    initializeCategoryData(categoryId);
    setStep('category-detail');
    // Scroll to top when entering category
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  // Check if category just got completed
  const checkCategoryCompletion = (categoryId) => {
    const progress = getCategoryProgress(categoryId);
    if (progress === 100) {
      setTimeout(() => {
        vibrateCategoryComplete();
      }, 300);
    }
  };

  // Generate final visualization
  const generateVisualization = () => {
    vibrateCategoryComplete(); // Celebration vibration
    stopProgressHeartbeat(); // Stop heartbeat when viewing results
    setStep('result');
    setTimeout(() => drawVisualization(), 100);
  };

  // Draw visualization on canvas
  const drawVisualization = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 800;
    
    // Background
    const gradient = ctx.createRadialGradient(400, 400, 0, 400, 400, 400);
    gradient.addColorStop(0, '#1e1b4b');
    gradient.addColorStop(1, '#0f172a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 800);
    
    // Collect only touched/active data points
    const allData = [];
    Object.entries(data).forEach(([category, values]) => {
      if (categories[category].type === 'selection') {
        // For projects, add selected ones
        Object.entries(values).forEach(([key, selected]) => {
          if (selected) {
            allData.push({ category, key, value: 10 }); // Max value for selected projects
          }
        });
      } else {
        // For sliders, only add touched ones
        Object.entries(values).forEach(([key, value]) => {
          if (touched[category] && touched[category][key]) {
            allData.push({ category, key, value });
          }
        });
      }
    });
    
    // If no data, show message
    if (allData.length === 0) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = '24px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Keine Daten zum Visualisieren', 400, 400);
      return;
    }
    
    // Create nodes in a circular pattern
    const centerX = 400;
    const centerY = 400;
    const nodes = [];
    
    allData.forEach((point, index) => {
      const angle = (index / allData.length) * Math.PI * 2;
      const radius = 150 + (point.value * 15);
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      nodes.push({ x, y, value: point.value, category: point.category });
    });
    
    // Draw connections
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.15)';
    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.random() > 0.7) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }
    
    // Draw nodes with category colors
    const categoryColors = {
      demographic: '#FF6B9D',
      psychographic: '#C44BFF',
      interests: '#4B9FFF',
      nogos: '#FF4B4B',
      projects: '#FFD93D'
    };
    
    nodes.forEach(node => {
      // Glow
      const glowGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 20);
      glowGradient.addColorStop(0, `${categoryColors[node.category]}88`);
      glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
      ctx.fill();
      
      // Node
      ctx.fillStyle = categoryColors[node.category];
      ctx.beginPath();
      ctx.arc(node.x, node.y, 4 + node.value * 0.5, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Draw central brain shape
    ctx.strokeStyle = 'rgba(75, 159, 255, 0.5)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 100, 0, Math.PI * 2);
    ctx.stroke();
    
    // Add geometric particles
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * 800;
      const y = Math.random() * 800;
      const size = Math.random() * 2;
      ctx.fillStyle = `rgba(75, 159, 255, ${Math.random() * 0.3})`;
      ctx.fillRect(x, y, size, size);
    }
  };

  // Generate personality analysis (only from touched data)
  const generateAnalysis = () => {
    const analysis = {
      dominant_traits: [],
      unique_pattern: '',
      recommendations: []
    };
    
    // Analyze psychographic data (only touched)
    if (data.psychographic && touched.psychographic) {
      const traits = Object.entries(data.psychographic).filter(
        ([key, _]) => touched.psychographic[key]
      );
      const highTraits = traits.filter(([_, v]) => v >= 7);
      analysis.dominant_traits = highTraits.map(([k, _]) => 
        categories.psychographic.fields.find(f => f.key === k)?.label || k
      ).slice(0, 3);
    }
    
    // Analyze interests (only touched)
    if (data.interests && touched.interests) {
      const interests = Object.entries(data.interests).filter(
        ([key, _]) => touched.interests[key]
      );
      const topInterests = interests.sort((a, b) => b[1] - a[1]).slice(0, 3);
      const interestNames = topInterests.map(([k, _]) => 
        categories.interests.fields.find(f => f.key === k)?.label || k
      );
      if (interestNames.length > 0) {
        analysis.unique_pattern = `Deine Leidenschaft für ${interestNames.join(', ')} macht dich einzigartig.`;
      }
    }
    
    // Analyze projects
    if (data.projects) {
      const selectedProjects = Object.entries(data.projects).filter(([_, v]) => v);
      if (selectedProjects.length > 3) {
        analysis.recommendations.push('Du hast viele aktive Projekte - fokussiere dich auf die wichtigsten 3.');
      } else if (selectedProjects.length === 0) {
        analysis.recommendations.push('Überlege dir konkrete Projekte, um deine Ziele zu erreichen.');
      }
    }
    
    return analysis;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 text-white overflow-x-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-once {
          0% { 
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(6, 182, 212, 0.7);
          }
          50% {
            transform: scale(1.02);
            box-shadow: 0 0 0 10px rgba(6, 182, 212, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(6, 182, 212, 0);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-pulse-once {
          animation: pulse-once 0.6s ease-out;
        }
        .slider-custom::-webkit-slider-thumb {
          appearance: none;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FF6B9D, #4B9FFF);
          cursor: pointer;
          box-shadow: 0 0 20px rgba(75, 159, 255, 0.8);
          transition: all 0.3s;
        }
        .slider-custom::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 30px rgba(75, 159, 255, 1);
        }
        .slider-custom::-moz-range-thumb {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FF6B9D, #4B9FFF);
          cursor: pointer;
          box-shadow: 0 0 20px rgba(75, 159, 255, 0.8);
          border: none;
        }
      `}</style>

      {/* Header with Small Logo */}
      {step !== 'intro' && (
        <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-cyan-500/20">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <button onClick={() => setStep('intro')} className="hover:scale-110 transition-transform">
              <NULogo size="small" />
            </button>
            <BrainProgress progress={getOverallProgress()} className="w-16 h-16" />
          </div>
        </header>
      )}

      <div className="container mx-auto px-4 py-8" style={{ paddingTop: step !== 'intro' ? '100px' : '20px' }}>
        
        {/* INTRO SCREEN */}
        {step === 'intro' && (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center max-w-2xl">
              <NULogo size="large" className="mx-auto mb-8" />
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                NU Personality
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-300 mb-4">
                Entdecke deine digitale Persönlichkeits-DNA
              </p>
              
              <p className="text-slate-400 mb-12 max-w-lg mx-auto">
                Beantworte Fragen in 5 Kategorien und erhalte eine einzigartige Visualisierung 
                deiner Persönlichkeit mit detaillierter Analyse.
              </p>
              
              <button
                onClick={() => setStep('categories')}
                className="group relative px-12 py-5 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full font-bold text-xl hover:scale-105 transition-all shadow-2xl hover:shadow-cyan-500/50"
              >
                <span className="relative z-10">Jetzt starten</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
              </button>
              
              {getOverallProgress() > 0 && (
                <p className="mt-6 text-cyan-400 text-sm">
                  Du hast bereits {Math.round(getOverallProgress())}% ausgefüllt
                </p>
              )}
            </div>
          </div>
        )}

        {/* CATEGORIES OVERVIEW */}
        {step === 'categories' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent">
                Wähle eine Kategorie
              </h2>
              <p className="text-slate-400 text-lg">
                Fülle alle 5 Kategorien aus, um deine komplette Persönlichkeits-DNA zu erstellen
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {Object.values(categories).map((category) => (
                <CategoryCard
                  key={category.id}
                  icon={category.icon}
                  title={category.title}
                  description={category.description}
                  progress={getCategoryProgress(category.id)}
                  completed={getCategoryProgress(category.id) === 100}
                  onClick={() => openCategory(category.id)}
                />
              ))}
            </div>
            
            {getOverallProgress() > 0 && (
              <div className="text-center">
                <button
                  onClick={generateVisualization}
                  className="group relative px-12 py-5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full font-bold text-xl hover:scale-105 transition-all shadow-2xl hover:shadow-green-500/50"
                >
                  <span className="relative z-10">✨ Persönlichkeit visualisieren</span>
                </button>
                <p className="text-slate-400 text-sm mt-4">
                  {Math.round(getOverallProgress())}% der Attribute ausgefüllt
                </p>
              </div>
            )}
          </div>
        )}

        {/* CATEGORY DETAIL */}
        {step === 'category-detail' && currentCategory && (
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <button
                onClick={() => setStep('categories')}
                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-4"
              >
                <ChevronLeft size={20} />
                Zurück zu den Kategorien
              </button>
              
              <div className="flex items-center gap-4 mb-6">
                {React.createElement(categories[currentCategory].icon, { 
                  size: 48, 
                  className: "text-cyan-400" 
                })}
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold">
                    {categories[currentCategory].title}
                  </h2>
                  <p className="text-slate-400">{categories[currentCategory].description}</p>
                </div>
              </div>
              
              {/* Progress for this category */}
              <div className="bg-slate-800/50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-400">Fortschritt</span>
                  <span className="text-sm font-semibold text-cyan-400">
                    {Math.round(getCategoryProgress(currentCategory))}%
                  </span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 transition-all duration-500"
                    style={{ width: `${getCategoryProgress(currentCategory)}%` }}
                  />
                </div>
              </div>
            </div>
            
            {/* Sliders or Project Selection */}
            {categories[currentCategory].type === 'selection' ? (
              <ProjectSelection
                options={categories[currentCategory].options}
                selectedProjects={data[currentCategory]}
                onChange={(newSelection) => {
                  const prevCount = Object.values(data[currentCategory]).filter(Boolean).length;
                  const newCount = Object.values(newSelection).filter(Boolean).length;
                  
                  setData(prev => ({
                    ...prev,
                    [currentCategory]: newSelection
                  }));
                  
                  // Haptic feedback when project is selected (not deselected)
                  if (newCount > prevCount) {
                    vibrateSliderTouch();
                  }
                  
                  // Check if category is now complete
                  if (newCount > 0) {
                    setTimeout(() => checkCategoryCompletion(currentCategory), 500);
                  }
                }}
              />
            ) : (
              <div className="space-y-4">
                {categories[currentCategory].fields.map((field) => (
                  <SliderInput
                    key={field.key}
                    label={field.label}
                    description={field.description}
                    value={data[currentCategory][field.key] || Math.round((field.min + field.max) / 2)}
                    onChange={(value) => updateValue(currentCategory, field.key, value)}
                    min={field.min}
                    max={field.max}
                    isTouched={touched[currentCategory][field.key] || false}
                  />
                ))}
              </div>
            )}
            
            {/* Navigation */}
            <div className="mt-8 flex gap-4">
              <button
                onClick={() => setStep('categories')}
                className="flex-1 px-6 py-4 bg-slate-800 hover:bg-slate-700 rounded-xl font-semibold transition-all"
              >
                Speichern & Zurück
              </button>
              
              {getCategoryProgress(currentCategory) === 100 && (
                <button
                  onClick={() => {
                    // Find next incomplete category or go back to overview
                    const categoryIds = Object.keys(categories);
                    const currentIndex = categoryIds.indexOf(currentCategory);
                    const nextIncomplete = categoryIds.find((id, idx) => 
                      idx > currentIndex && getCategoryProgress(id) < 100
                    );
                    
                    if (nextIncomplete) {
                      openCategory(nextIncomplete);
                    } else {
                      setStep('categories');
                    }
                  }}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                >
                  Weiter
                  <ChevronRight size={20} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* RESULT SCREEN */}
        {step === 'result' && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                Deine Persönlichkeits-DNA
              </h2>
              <p className="text-slate-400 text-lg">
                Eine einzigartige Visualisierung deiner Persönlichkeit
              </p>
            </div>
            
            {/* Visualization */}
            <div className="bg-slate-900/50 rounded-2xl p-8 mb-8 border border-cyan-500/30">
              <canvas
                ref={canvasRef}
                className="w-full rounded-xl"
                style={{ maxWidth: '800px', margin: '0 auto', display: 'block' }}
              />
            </div>
            
            {/* Analysis */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Dominant Traits */}
              <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-lg rounded-2xl p-6 border border-pink-500/30">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Brain className="text-pink-400" />
                  Dominante Eigenschaften
                </h3>
                <ul className="space-y-2">
                  {generateAnalysis().dominant_traits.map((trait, idx) => (
                    <li key={idx} className="text-slate-300 flex items-center gap-2">
                      <span className="text-pink-400">▸</span> {trait}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Unique Pattern */}
              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-lg rounded-2xl p-6 border border-cyan-500/30">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="text-cyan-400" />
                  Dein Muster
                </h3>
                <p className="text-slate-300">
                  {generateAnalysis().unique_pattern || 'Deine Kombination aus verschiedenen Interessen und Eigenschaften macht dich einzigartig.'}
                </p>
              </div>
            </div>
            
            {/* Category Breakdown */}
            <div className="bg-slate-900/50 rounded-2xl p-8 mb-8 border border-slate-700/50">
              <h3 className="text-2xl font-bold mb-6">Deine Kategorien im Detail</h3>
              <div className="grid md:grid-cols-5 gap-4">
                {Object.entries(categories).map(([id, category]) => (
                  <div key={id} className="text-center">
                    {React.createElement(category.icon, { 
                      size: 32, 
                      className: "text-cyan-400 mx-auto mb-2" 
                    })}
                    <p className="text-sm text-slate-400 mb-2">{category.title}</p>
                    <p className="text-2xl font-bold text-cyan-400">
                      {Math.round(getCategoryProgress(id))}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setStep('categories')}
                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 rounded-xl font-semibold transition-all"
              >
                Antworten bearbeiten
              </button>
              
              <button
                onClick={() => {
                  localStorage.removeItem('nu-personality-data');
                  localStorage.removeItem('nu-personality-touched');
                  setData({
                    demographic: {},
                    psychographic: {},
                    interests: {},
                    nogos: {},
                    projects: {}
                  });
                  setTouched({
                    demographic: {},
                    psychographic: {},
                    interests: {},
                    nogos: {},
                    projects: {}
                  });
                  setStep('intro');
                }}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 rounded-xl font-semibold transition-all"
              >
                Neu starten
              </button>
              
              <button
                onClick={() => {
                  const canvas = canvasRef.current;
                  const link = document.createElement('a');
                  link.download = 'nu-personality-dna.png';
                  link.href = canvas.toDataURL();
                  link.click();
                }}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 rounded-xl font-semibold transition-all"
              >
                Bild herunterladen
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
