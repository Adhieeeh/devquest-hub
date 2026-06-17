'use client';

import React, { useState } from 'react';

export default function DevQuestHub() {
 
  const [quests, setQuests] = useState([
    { id: 1, title: " Refactor Portfolio to Next.js", difficulty: "Hard", points: 100, completed: true },
    { id: 2, title: " Secure DevLink Hub API Routing", difficulty: "Medium", points: 50, completed: false },
    { id: 3, title: " Debug SoundWave Audio useRef Hook", difficulty: "Hard", points: 120, completed: false },
    { id: 4, title: " Optimize FlexiCart Grand Totals Engine", difficulty: "Easy", points: 30, completed: true }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [difficulty, setDifficulty] = useState('Medium');

 
  const toggleQuestCompletion = (id) => {
    setQuests(quests.map(q => q.id === id ? { ...q, completed: !q.completed } : q));
  };

  
  const handleCreateQuest = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const pointsMapping = { "Easy": 30, "Medium": 60, "Hard": 100 };

    const freshQuest = {
      id: Date.now(),
      title: newTitle,
      difficulty: difficulty,
      points: pointsMapping[difficulty],
      completed: false
    };

    setQuests([...quests, freshQuest]);
    setNewTitle('');
  };


  const filteredQuests = quests.filter(q => 
    q.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalXP = quests.reduce((sum, q) => q.completed ? sum + q.points : sum, 0);

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '24px', fontFamily: 'system-ui, sans-serif', color: '#0f172a' }}>
      
      {/*  */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', padding: '25px 30px', borderRadius: '20px', marginBottom: '35px' }}>
        <div>
          <h1 style={{ margin: '0', fontSize: '26px', color: '#065f46', fontWeight: '800' }}> DevQuest Pipeline</h1>
          <p style={{ margin: '4px 0 0 0', color: '#047857', fontSize: '14px' }}>Turn your engineering roadmaps and debugging tickets into an active gaming campaign.</p>
        </div>
        <div style={{ textAlign: 'right', minWidth: '120px' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', color: '#047857', uppercase: 'true', letterSpacing: '0.5px' }}>Total Earned Score</span>
          <h2 style={{ margin: '0', fontSize: '32px', color: '#065f46', fontWeight: '900' }}>{totalXP} <span style={{ fontSize: '16px', fontWeight: '600' }}>XP</span></h2>
        </div>
      </header>

      {/* */}
      <div style={{ marginBottom: '25px', textAlign: 'center' }}>
        <a href="/api/quests" target="_blank" style={{ display: 'inline-block', padding: '8px 16px', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '30px', fontSize: '12px', color: '#475569', textDecoration: 'none', fontWeight: '700' }}>
           Inspect JSON Mock Database Service: <span style={{ color: '#2563eb' }}>/api/quests</span> ↗
        </a>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
        
        {/*  */}
        <div>
          <div style={{ marginBottom: '15px' }}>
            <input 
              type="text" 
              placeholder="🔍 Search quests dynamically..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', boxSizing: 'border-box', fontSize: '14px' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredQuests.length === 0 ? (
              <p style={{ color: '#94a3b8', fontSize: '14px', textAlign: 'center', padding: '30px', border: '2px dashed #e2e8f0', borderRadius: '12px' }}>No active quest vectors found matching your search query.</p>
            ) : (
              filteredQuests.map(quest => (
                <div 
                  key={quest.id} 
                  onClick={() => toggleQuestCompletion(quest.id)}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    padding: '16px 20px', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '12px', 
                    backgroundColor: quest.completed ? '#f8fafc' : '#ffffff', 
                    cursor: 'pointer',
                    opacity: quest.completed ? 0.75 : 1,
                    transition: 'all 0.2s',
                    textDecoration: quest.completed ? 'line-through' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <input type="checkbox" checked={quest.completed} readOnly style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
                    <span style={{ fontSize: '15px', fontWeight: '600', color: quest.completed ? '#64748b' : '#1e293b' }}>{quest.title}</span>
                  </div>
                  <span style={{ 
                    fontSize: '11px', 
                    fontWeight: '700', 
                    backgroundColor: quest.difficulty === 'Hard' ? '#fee2e2' : quest.difficulty === 'Medium' ? '#fef3c7' : '#dcfce7', 
                    color: quest.difficulty === 'Hard' ? '#991b1b' : quest.difficulty === 'Medium' ? '#92400e' : '#166534', 
                    padding: '4px 10px', 
                    borderRadius: '6px' 
                  }}>
                    +{quest.points} XP
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/**/}
        <form onSubmit={handleCreateQuest} style={{ backgroundColor: '#f8fafc', padding: '25px', borderRadius: '16px', border: '1px solid #e2e8f0', height: 'fit-content' }}>
          <h3 style={{ margin: '0 0 18px 0', fontSize: '16px', color: '#1e293b' }}>Forge New Quest Milestone</h3>
          
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748b', marginBottom: '6px' }}>Quest Title / Objective</label>
            <input type="text" placeholder="e.g., Deploy devquest-hub to production" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748b', marginBottom: '6px' }}>Complexity Vector</label>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', cursor: 'pointer', backgroundColor: '#fff' }}>
              <option value="Easy">Easy Level (+30 XP)</option>
              <option value="Medium">Medium Level (+60 XP)</option>
              <option value="Hard">Hard Level (+100 XP)</option>
            </select>
          </div>

          <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#10b981', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
            Register Quest Tracker 
          </button>
        </form>

      </div>
    </div>
  );
}