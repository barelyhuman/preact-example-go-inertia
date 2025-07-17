import { useState } from "preact/hooks";

export default function Home() {
  const [power, setPower] = useState(true);
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 min-w-[340px] max-w-[400px] font-mono flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="font-bold text-lg tracking-tight text-zinc-200">Preact + Go</h2>
            <p className="text-xs tracking-widest text-zinc-500 uppercase">Counter v1.0</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`w-2 h-2 rounded-full transition-colors duration-300 ${power ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-700'}`} />
            <button
              onClick={() => {
                setPower(p => !p);
                if (!power) setCount(0);
              }}
              className={`w-12 h-12 rounded-lg border-2 transition-all duration-200 flex items-center justify-center
                ${power ? 'border-emerald-500/30 bg-emerald-500/10' : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'}`}
            >
              <svg className={`w-5 h-5 transition-colors duration-200 ${power ? 'text-emerald-500' : 'text-zinc-600'}`} xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-power"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 6a7.75 7.75 0 1 0 10 0" /><path d="M12 4l0 8" /></svg>
            </button>
          </div>
        </div>

        {/* Counter Display */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-32 h-32 rounded-lg border-2 border-zinc-800 bg-zinc-900/50 flex items-center justify-center relative overflow-hidden">
            <span className={`text-4xl font-bold transition-all duration-300 ${power ? 'text-emerald-500' : 'text-zinc-700'}`}>
              {String(count).padStart(2, '0')}
            </span>
            {power && (
              <div className="absolute inset-x-0 bottom-0 h-1 bg-emerald-500/20">
                <div
                  className="h-full bg-emerald-500"
                  style={{ width: `${(count % 100)}%`, transition: 'width 200ms' }}
                />
              </div>
            )}
          </div>
          <button
            onClick={() => power && setCount(c => c + 1)}
            disabled={!power}
            className={`px-6 py-3 rounded-lg border-2 font-medium text-sm tracking-wider uppercase transition-all duration-200
              ${power 
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20' 
                : 'border-zinc-800 bg-zinc-900 text-zinc-700 cursor-not-allowed'}`}
          >
            Increment
          </button>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50">
          <div className="text-[10px] tracking-widest text-zinc-600 uppercase">
            Powered by Inertia
          </div>
          <button
            onClick={() => power && setCount(0)}
            disabled={!power}
            className="px-4 py-2 text-xs text-zinc-400 hover:text-zinc-300 transition-colors uppercase tracking-widest disabled:text-zinc-700 disabled:hover:text-zinc-700"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
