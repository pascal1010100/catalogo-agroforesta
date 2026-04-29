import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Package, 
  Settings, 
  LogOut, 
  Leaf,
  ChevronRight,
  Bell,
  Search
} from 'lucide-react';
import { logout } from './login/actions';
import { cn } from '@/lib/utils';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Protect all admin routes except login
  // Note: Middleware already handles this, but double checking here for RSC
  if (!user) {
    // Check if we are on the login page
    // In Next.js App Router, layout.tsx for /admin/login won't be this one if it's nested
    // But since this is app/admin/layout.tsx, it wraps all /admin subroutes
  }

  const sidebarLinks = [
    { name: 'Panel Principal', href: '/admin', icon: LayoutDashboard },
    { name: 'Productos', href: '/admin/products', icon: Package },
    { name: 'Configuración', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card hidden md:flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b">
          <Link href="/" className="flex items-center gap-2 font-heading font-bold text-lg">
            <Leaf className="h-5 w-5 text-primary" />
            <span>Agroforesta</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl hover:bg-primary/10 hover:text-primary transition-all text-muted-foreground"
            >
              <link.icon className="h-5 w-5" />
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t">
          <form action={logout}>
            <button className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl hover:bg-destructive/10 hover:text-destructive transition-all text-muted-foreground">
              <LogOut className="h-5 w-5" />
              Cerrar Sesión
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="h-16 border-b bg-background/95 backdrop-blur px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4 bg-muted/50 px-4 py-2 rounded-xl border w-96">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Buscar en el panel..." 
              className="bg-transparent border-none text-sm outline-none w-full"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
            </button>
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary border border-primary/20">
              AD
            </div>
          </div>
        </header>

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
