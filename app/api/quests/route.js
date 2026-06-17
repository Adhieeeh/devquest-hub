import { NextResponse } from 'next/server';


const initialQuests = [
  { id: 1, title: "🚀 Refactor Portfolio to Next.js", difficulty: "Hard", points: 100, completed: true },
  { id: 2, title: "🔒 Secure DevLink Hub API Routing", difficulty: "Medium", points: 50, completed: false },
  { id: 3, title: "🎧 Debug SoundWave Audio useRef Hook", difficulty: "Hard", points: 120, completed: false },
  { id: 4, title: "📊 Optimize FlexiCart Grand Totals Engine", difficulty: "Easy", points: 30, completed: true }
];

export async function GET() {
  return NextResponse.json({
    system: "DevQuest Core Database API Engine",
    totalQuestsLogged: initialQuests.length,
    data: initialQuests
  });
}