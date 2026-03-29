import { useGameStore } from '../store/gameStore'
import { calculateFinalScore } from '../engine/scoreEngine'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export const FarmReport = () => {
  const { PI, SI, SH, WT, BD, resetGame, nextYear, history, year, budget } = useGameStore()
  
  const { finalScore, balanceBonus } = calculateFinalScore(PI, SI)

  let badge = "First Season"
  let badgeDesc = "Every farmer starts here. The field report shows where to improve."
  
  if (finalScore > 85) {
    if (Math.abs(PI - SI) < 15) {
      badge = "Precision Farmer"
      badgeDesc = "You found the optimum. Modern sustainable farming looks like this."
    } else if (SI > PI) {
      badge = "Regenerative Farmer"
      badgeDesc = "You maximized sustainability. Long-term soil health rewards this."
    } else {
      badge = "Industrial Farmer"
      badgeDesc = "High yield now, but soil data shows risk."
    }
  } else if (finalScore >= 60) {
    badge = "Learning Farmer"
    badgeDesc = "Good instincts. See which tradeoffs you missed."
  }

  // Generate fake history chart data for demonstration, normally would store per-stage snapshots
  const data = history.map((h, i) => ({
    name: 'Stage ' + (i+1),
    Production: Math.min(100, (i * 10) + PI/5), // placeholder logic for aesthetic graph
    Sustainability: Math.min(100, (i * 10) + SI/5)
  }))

  return (
    <div className="absolute inset-0 z-50 bg-sky-900 overflow-y-auto p-12 text-white flex justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        <div className="flex justify-between items-end mb-8 border-b border-indigo-400 pb-4">
          <div>
            <h1 className="text-5xl font-black text-indigo-300">Year {year} Report</h1>
            <p className="text-xl text-indigo-100 mt-2">Cycle complete. Budget remaining: ${budget?.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold uppercase text-indigo-300">Final Score</div>
            <div className="text-6xl font-black text-white">{finalScore}</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="col-span-1 bg-indigo-900/50 p-6 rounded-2xl border border-indigo-500/30">
            <h2 className="text-2xl font-bold mb-4">Farmer Archetype</h2>
            <div className="flex items-center gap-4 mb-3">
              <div className="h-16 w-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg font-black text-3xl">
                🏆
              </div>
              <h3 className="text-xl font-black text-yellow-400">{badge}</h3>
            </div>
            <p className="text-indigo-200">{badgeDesc}</p>
          </div>

          <div className="col-span-2 bg-indigo-900/50 p-6 rounded-2xl border border-indigo-500/30">
            <h2 className="text-2xl font-bold mb-4">Hidden Stats Revealed</h2>
            <p className="text-sm text-indigo-300 mb-4">You maximized Production ({PI}) and Sustainability ({SI}). But what happened under the surface?</p>
            
            <div className="space-y-4">
              <StatBar label="Soil Health (SH)" value={SH} color="bg-amber-600" desc="Started at 50" />
              <StatBar label="Water Table (WT)" value={WT} color="bg-blue-500" desc="Started at 70" />
              <StatBar label="Biodiversity (BD)" value={BD} color="bg-emerald-500" desc="Started at 60" />
            </div>
          </div>
        </div>

        <div className="bg-indigo-900/50 p-6 rounded-2xl border border-indigo-500/30 mb-8">
          <h2 className="text-2xl font-bold mb-4">Performance Journey</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="name" stroke="#a5b4fc" />
                <YAxis stroke="#a5b4fc" />
                <Tooltip />
                <Line type="monotone" dataKey="Production" stroke="#60a5fa" strokeWidth={3} />
                <Line type="monotone" dataKey="Sustainability" stroke="#34d399" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={resetGame}
            className="w-1/3 py-5 bg-slate-800 hover:bg-slate-700 text-white font-black text-xl rounded-xl transition-all"
          >
            RESET ALL (NEW GAME)
          </button>
          <button
            onClick={nextYear}
            className="w-2/3 py-5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-black text-2xl rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)]"
          >
            START YEAR {year + 1}
          </button>
        </div>
      </motion.div>
    </div>
  )
}

function StatBar({ label, value, color, desc }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="font-bold text-white">{label}</span>
        <span className="text-indigo-300">{desc} | Final: <strong className="text-white">{value}</strong></span>
      </div>
      <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}
