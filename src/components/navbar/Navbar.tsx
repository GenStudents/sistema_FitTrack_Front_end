import {
  Barbell,
  House,
  List,
  Pulse,
  SquaresFour,
  Users,
  X
} from '@phosphor-icons/react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { href: '/home', label: 'Inicio', icon: House },
  { href: 'categorias', label: 'Categorias', icon: SquaresFour },
  { href: '/treinos', label: 'Planos de Treino', icon: Barbell },
  { href: '/usuarios', label: 'Usuarios', icon: Users },
]

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const pathname = location.pathname

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const closeMenu = () => setIsMobileMenuOpen(false)

  return (
    <>
      {/* ========================================== */}
      {/* TOP NAVBAR (Apenas Mobile)                 */}
      {/* ========================================== */}
      {/* Adicionado 'w-full' para garantir largura total */}
      <header className="sticky top-0 z-30 flex w-full items-center justify-between border-b border-border bg-background px-4 py-3 lg:hidden">
        <div className="flex items-center gap-3">
          <Pulse className="size-7 text-primary" weight="bold" />
          <span className="text-xl font-bold text-white tracking-tight">
            FitTrack
          </span>
        </div>
        <button
          onClick={toggleMenu}
          className="rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          aria-label="Abrir menu"
        >
          <List className="size-6" />
        </button>
      </header>

      {/* ========================================== */}
      {/* SIDEBAR NAVBAR (Desktop e Menu Mobile)     */}
      {/* ========================================== */}
      
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={closeMenu}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 flex h-full w-[260px] flex-col border-r border-border bg-sidebar transition-transform duration-300 lg:translate-x-0 ${
      isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      >
        {/* Logo Sidebar */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-border">
          <Link to="/home" className="flex items-center gap-3" onClick={closeMenu}>
            <Pulse className="size-8 text-primary" weight="bold" />
            <span className="text-2xl font-bold text-white tracking-tight">
              FitTrack
            </span>
          </Link>
          <button
            onClick={closeMenu}
            className="rounded-md p-1 text-muted-foreground hover:text-foreground lg:hidden"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Links de Navegação */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/home' && pathname.startsWith(item.href))
              
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    onClick={closeMenu}
                    className={`flex items-center gap-4 rounded-xl px-4 py-3 text-[15px] font-medium transition-colors ${
                      isActive
                        ? 'bg-primary/10 text-primary' 
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    }`}
                  >
                    <item.icon className="size-6" />
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer da Sidebar */}
        <div className="border-t border-border px-6 py-5">
          <p className="text-sm text-muted-foreground">
            FitTrack v1.0
          </p>
        </div>
      </aside>
    </>
  )
}