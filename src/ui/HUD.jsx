import { useGameStore } from '../store/gameStore'

export const HUD = ({ onOpenGuide }) => {
  const { PI, SI, stage, year, budget } = useGameStore()

  const stageNames = ["Land Prep", "Cropping", "Fertilizer", "Irrigation", "Harvest"]

  return (
    <div className="absolute top-0 left-0 p-6 flex justify-between items-start pointer-events-none z-10 w-fit">
      <div className="bg-black/60 backdrop-blur-md text-white p-5 rounded-xl border border-white/20 shadow-lg pointer-events-auto w-72">
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-xl font-bold">Year {year}</h2>
          <button 
            onClick={onOpenGuide} 
            className="ml-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shadow-md transition-colors"
            title="Guide"
          >
            ?
          </button>
        </div>
        <div className="text-emerald-400 font-bold mb-4 border-b border-gray-600 pb-3">
          Budget: ${budget?.toLocaleString() || 0}
        </div>
        
        {/* Stage Progress Tracker */}
        <div className="mb-6 bg-black/30 p-3 rounded-lg border border-gray-700">
          <div className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">Year {year} Timeline</div>
          <div className="flex flex-col space-y-3 relative pl-2">
            <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-700 -z-10"></div>
            {stageNames.map((name, i) => {
              const isActive = (i + 1) === stage;
              const isPast = (i + 1) < stage;
              return (
                <div key={name} className={"flex items-center text-sm " + (isActive ? "text-white font-bold" : isPast ? "text-gray-400" : "text-gray-600")}>
                  <div className={"w-2.5 h-2.5 rounded-full mr-3 z-10 " + (isActive ? "bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]" : isPast ? "bg-indigo-900" : "bg-gray-800 border border-gray-600")} />
                  {name}
                </div>
              )
            })}
          </div>
        </div>

        <div className="space-y-4">
          
          <div>
            <div className="flex justify-between text-sm mb-1 font-bold text-blue-300 tracking-wide">
              <span>Production</span>
              <span>{PI}</span>
            </div>
            <div className="h-3 w-full bg-gray-800 rounded-full overflow-hidden border border-gray-600">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-700 ease-out" 
                style={{ width: `${PI}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1 font-bold text-green-300 tracking-wide">
              <span>Sustainability</span>
              <span>{SI}</span>
            </div>
            <div className="h-3 w-full bg-gray-800 rounded-full overflow-hidden border border-gray-600">
              <div 
                className="h-full bg-gradient-to-r from-green-600 to-green-400 transition-all duration-700 ease-out" 
                style={{ width: `${SI}%` }}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

