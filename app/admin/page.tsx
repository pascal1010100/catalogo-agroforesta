import { Package, TrendingUp, ArrowUpRight, AlertTriangle } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function AdminDashboard() {
  const supabase = await createClient();

  // 1. Fetch Total Products
  const { count: totalProducts } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true });

  // 2. Fetch Total Categories
  const { count: totalCategories } = await supabase
    .from('categories')
    .select('*', { count: 'exact', head: true });

  // 3. Fetch Low Stock Products
  const { data: lowStockProducts } = await supabase
    .from('products')
    .select('name, stock')
    .lt('stock', 10)
    .order('stock', { ascending: true })
    .limit(3);

  // 4. Recent Activity (Latest Products)
  const { data: recentProducts } = await supabase
    .from('products')
    .select('name, created_at, id')
    .order('created_at', { ascending: false })
    .limit(3);

  const stats = [
    { name: 'Total Productos', value: totalProducts?.toString() || '0', icon: Package, change: 'En tiempo real', trend: 'neutral' },
    { name: 'Categorías', value: totalCategories?.toString() || '0', icon: TrendingUp, change: 'En tiempo real', trend: 'neutral' },
    { name: 'Stock Crítico', value: (lowStockProducts?.length || 0).toString(), icon: AlertTriangle, change: 'Revisión necesaria', trend: 'down' },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-heading font-bold tracking-tight">Bienvenido de nuevo</h1>
        <p className="text-muted-foreground mt-1">Aquí tienes un resumen real del estado de tu catálogo.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link 
            key={stat.name} 
            href={stat.name === 'Total Productos' ? '/admin/products' : (stat.name === 'Stock Crítico' ? '/admin/products' : '#')}
            className="bg-card p-6 rounded-2xl border shadow-sm space-y-4 hover:shadow-md hover:border-primary/50 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <stat.icon className="h-5 w-5" />
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
                stat.trend === 'down' ? 'bg-red-100 text-red-700' : 'bg-muted text-muted-foreground'
              }`}>
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
              <h2 className="text-3xl font-bold mt-1 tracking-tight">{stat.value}</h2>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-card rounded-2xl border shadow-sm p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold tracking-tight">Productos Recientes</h3>
            <Link href="/admin/products" className="text-sm font-bold text-primary hover:underline">Ver todo</Link>
          </div>
          
          <div className="space-y-6">
            {recentProducts?.map((p) => (
              <div key={p.id} className="flex items-center justify-between py-4 border-b last:border-0 first:pt-0">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold uppercase">
                    {p.name.substring(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{p.name}</p>
                    <p className="text-xs text-muted-foreground">Agregado el {new Date(p.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <Link href={`/admin/products/${p.id}/edit`}>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-primary p-8 rounded-2xl shadow-xl text-primary-foreground space-y-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-white" />
            <h3 className="text-xl font-bold tracking-tight">Estado del Stock</h3>
          </div>
          <p className="text-primary-foreground/80 text-sm leading-relaxed">
            {lowStockProducts && lowStockProducts.length > 0 
              ? `Atención: Tienes ${lowStockProducts.length} productos con stock bajo.`
              : '¡Buen trabajo! Todo tu inventario tiene stock suficiente.'}
          </p>
          <div className="space-y-4">
            {lowStockProducts?.map((p) => (
              <div key={p.name} className="bg-white/10 p-4 rounded-xl border border-white/10">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                  <span className="truncate max-w-[150px]">{p.name}</span>
                  <span>{p.stock} Unidades</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white" 
                    style={{ width: `${Math.min((p.stock / 10) * 100, 100)}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
          <Link href="/admin/products" className="block w-full">
            <button className="w-full bg-white text-primary font-bold py-3 rounded-xl text-sm hover:bg-white/90 transition-all">
              Revisar Inventario
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
