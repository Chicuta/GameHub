import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { UserGamesProvider, useUserGames } from './contexts/UserGamesContext'
import { GameDetailProvider } from './contexts/GameDetailContext'
import { supabase } from './lib/supabase'
import GameDetailModal from './components/GameDetailModal'

import Header from './components/Header'
import StatsGrid from './components/StatsGrid'
import XpBar from './components/XpBar'
import PlayingNow from './components/PlayingNow'
import ActivityHeatmap from './components/ActivityHeatmap'
import AnnualEvolution from './components/AnnualEvolution'
import Retrospective from './components/Retrospective'
import HallOfFame from './components/HallOfFame'
import GlobalAnalysis from './components/GlobalAnalysis'
import BacklogByPlatform from './components/BacklogByPlatform'
import Cemetery from './components/Cemetery'
import GameSearch from './components/GameSearch'
import LandingHero from './components/LandingHero'
import PausedGames from './components/PausedGames'
import BacklogBrowser from './components/BacklogBrowser'
import SagasTracker from './components/SagasTracker'
import GenreDistribution from './components/GenreDistribution'
import BacklogHealth from './components/BacklogHealth'
import AuthPage from './pages/AuthPage'
import CatalogPage from './pages/CatalogPage'
import { Gamepad2, User, BookOpen } from 'lucide-react'

/* ── Navbar ─────────────────────────────────────── */
function Navbar() {
  const { user, profile, signOut } = useAuth()
  return (
    <nav className="max-w-5xl mx-auto flex items-center justify-between py-3 px-1 mb-2">
      <div className="flex items-center gap-4">
        <Link to="/" className="font-heading font-black text-accent-cyan tracking-wider text-lg flex items-center gap-1.5">
          <Gamepad2 size={20} strokeWidth={2.5} /> CENTRAL GAMER
        </Link>
        <Link
          to="/catalogo"
          className="flex items-center gap-1 text-sm text-dash-muted hover:text-accent-cyan transition-colors font-bold uppercase tracking-wider"
        >
          <BookOpen size={16} strokeWidth={2.5} /> Catálogo
        </Link>
      </div>
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <Link
              to="/perfil"
              className="flex items-center gap-1.5 text-sm text-dash-muted hover:text-accent-cyan transition-colors"
            >
              <User size={16} strokeWidth={2.5} />
              <span className="font-bold">{profile?.username || user.email}</span>
            </Link>
            <button
              onClick={signOut}
              className="text-xs border border-white/10 rounded-lg px-3 py-1.5 text-dash-muted hover:text-white hover:border-white/20 transition-colors cursor-pointer"
            >
              Sair
            </button>
          </>
        ) : (
          <Link
            to="/auth"
            className="text-sm border border-accent-cyan/30 text-accent-cyan rounded-lg px-4 py-1.5 hover:bg-accent-cyan/10 transition-colors"
          >
            Entrar
          </Link>
        )}
      </div>
    </nav>
  )
}

/* ── Perfil (Dashboard do usuário) ──────────────── */
function Perfil() {
  const { user } = useAuth()
  const { games: userGames, loading, reload, updateGame, removeGame } = useUserGames()

  if (!supabase || !user) return <Navigate to="/auth" replace />

  const { jogando, zerados, abandonados, backlog, pausados } = userGames

  return (
    <div className="max-w-5xl mx-auto bg-dash-bg/80 backdrop-blur-xl rounded-2xl border border-dash-border p-5 relative">
      <Header />

      <GameSearch onGameAdded={reload} />

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-8 h-8 border-2 border-accent-cyan/30 border-t-accent-cyan rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <StatsGrid zerados={zerados} jogando={jogando} abandonados={abandonados} backlog={backlog} pausados={pausados} />
          <XpBar zerados={zerados} />
          <PlayingNow jogando={jogando} />
          <PausedGames pausados={pausados} />
          <ActivityHeatmap zerados={zerados} />
          <AnnualEvolution zerados={zerados} />
          <Retrospective zerados={zerados} />
          <HallOfFame zerados={zerados} />
          <GlobalAnalysis zerados={zerados} jogando={jogando} abandonados={abandonados} backlog={backlog} pausados={pausados} updateGame={updateGame} removeGame={removeGame} reload={reload} />
          <BacklogBrowser backlog={backlog} />
          <SagasTracker />
          <GenreDistribution zerados={zerados} jogando={jogando} abandonados={abandonados} backlog={backlog} pausados={pausados} />
          <BacklogHealth zerados={zerados} jogando={jogando} backlog={backlog} pausados={pausados} abandonados={abandonados} />
          <BacklogByPlatform backlog={backlog} />
          <Cemetery abandonados={abandonados} />
        </>
      )}
    </div>
  )
}

/* ── App Root ───────────────────────────────────── */
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserGamesProvider>
          <GameDetailProvider>
            <div className="min-h-screen bg-dash-bg p-4 md:p-6">
              <Navbar />
              <Routes>
                <Route path="/" element={<LandingHero />} />
                <Route path="/catalogo" element={<CatalogPage />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/auth" element={<AuthRoute />} />
              </Routes>
            </div>
            <GameDetailModal />
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: { background: '#1a1a2e', color: '#e0e0e0', border: '1px solid rgba(255,255,255,0.08)' },
              }}
            />
          </GameDetailProvider>
        </UserGamesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

function AuthRoute() {
  const { user, loading } = useAuth()
  if (loading) return null
  if (user) return <Navigate to="/perfil" replace />
  return <AuthPage />
}
