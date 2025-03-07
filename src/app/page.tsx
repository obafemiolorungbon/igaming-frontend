'use client'

import { useRouter } from 'next/navigation'
import { ROUTES } from '@/config/routes'

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white">
      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
        {/* Animated Background Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/dice-pattern.png')] opacity-5 bg-repeat"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text font-[family-name:var(--font-geist-sans)]">
            iGaming Casino
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 font-[family-name:var(--font-geist-mono)]">
            Test your luck with our number guessing game
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 transition-transform">
              <div className="text-3xl mb-2">🎲</div>
              <h3 className="text-lg font-semibold mb-2">Simple Rules</h3>
              <p className="text-sm text-gray-400">
                Pick a number and test your luck against other players
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 transition-transform">
              <div className="text-3xl mb-2">🏆</div>
              <h3 className="text-lg font-semibold mb-2">Live Leaderboard</h3>
              <p className="text-sm text-gray-400">
                Compete with players worldwide and climb the rankings
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 transition-transform">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="text-lg font-semibold mb-2">Real-time Games</h3>
              <p className="text-sm text-gray-400">Join live games and see results instantly</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => router.push(ROUTES.auth.register)}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-lg font-semibold transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 font-[family-name:var(--font-geist-sans)]"
            >
              Get Started
            </button>
            <button
              onClick={() => router.push(ROUTES.auth.login)}
              className="px-8 py-3 bg-transparent border-2 border-white/20 hover:border-white/40 rounded-full text-lg font-semibold transition-all transform hover:scale-105 font-[family-name:var(--font-geist-sans)]"
            >
              Login
            </button>
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
      </div>
    </div>
  )
}
