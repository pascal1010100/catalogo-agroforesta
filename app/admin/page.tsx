import { Package, Users, ShoppingCart, TrendingUp, ArrowUpRight } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { name: 'Total Productos', value: '48', icon: Package, change: '+12%', trend: 'up' },
    { name: 'Categorías', value: '7', icon: TrendingUp, change: '0%', trend: 'neutral' },
    { name: 'Vistas Totales', value: '2.4k', icon: Users, change: '+18%', trend: 'up' },
    { name: 'Órdenes Hoy', value: '14', icon: ShoppingCart, change: '+5%', trend: 'up' },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-heading font-bold tracking-tight">Bienvenido de nuevo</h1>
        <p className="text-muted-foreground mt-1">Aquí tienes un resumen del estado de tu catálogo.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-card p-6 rounded-2xl border shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <stat.icon className="h-5 w-5" />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'
              }`}>
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
              <h2 className="text-3xl font-bold mt-1 tracking-tight">{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-card rounded-2xl border shadow-sm p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold tracking-tight">Actividad Reciente</h3>
            <button className="text-sm font-bold text-primary hover:underline">Ver todo</button>
          </div>
          
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between py-4 border-b last:border-0 first:pt-0">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center text-[10px] font-bold">
                    IMG
                  </div>
                  <div>
                    <p className="text-sm font-bold">Producto #{i} actualizado</p>
                    <p className="text-xs text-muted-foreground">Hace 2 horas por Admin</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-primary p-8 rounded-2xl shadow-xl text-primary-foreground space-y-6">
          <h3 className="text-xl font-bold tracking-tight">Estado del Stock</h3>
          <p className="text-primary-foreground/80 text-sm leading-relaxed">
            Tienes 3 productos con stock bajo. Te recomendamos revisar tu inventario.
          </p>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white/10 p-4 rounded-xl border border-white/10">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                  <span>Motosierra X</span>
                  <span>5 Unidades</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-1/4" />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full bg-white text-primary font-bold py-3 rounded-xl text-sm hover:bg-white/90 transition-all">
            Ver Inventario
          </button>
        </div>
      </div>
    </div>
  );
}
