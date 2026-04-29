'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createProduct } from './actions';
import { Button } from '@/app/components/ui/button';
import { 
  ArrowLeft, 
  Save, 
  Upload, 
  X, 
  Loader2,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { createClient } from '@/lib/supabase/client';
import { useEffect } from 'react';

const productSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  brand_id: z.string().min(1, "Selecciona una marca"),
  category_id: z.string().min(1, "Selecciona una categoría"),
  description: z.string().min(10, "La descripción es muy corta"),
  price: z.number().min(0.01, "El precio debe ser mayor a 0"),
  unidad: z.string().min(1, "Especifica la unidad (ej. unidad, galón, litro)"),
  model: z.string().optional(),
  stock: z.number().int().min(0, "El stock no puede ser negativo"),
  featured: z.boolean(),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function NewProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<{id: string, name: string}[]>([]);
  const [brands, setBrands] = useState<{id: string, name: string}[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    async function loadData() {
      const [catsRes, brandsRes] = await Promise.all([
        supabase.from('categories').select('id, name'),
        supabase.from('brands').select('id, name')
      ]);
      if (catsRes.data) setCategories(catsRes.data);
      if (brandsRes.data) setBrands(brandsRes.data);
      setIsLoadingData(false);
    }
    loadData();
  }, [supabase]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      brand_id: '',
      category_id: '',
      unidad: 'unidad',
      stock: 0,
      featured: false,
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(data: ProductFormValues) {
    setIsSubmitting(true);
    try {
      let imageUrl = '';
      
      // If there's a new file, upload it
      if (imageFile) {
        const { uploadProductImage } = await import('@/lib/supabase/storage');
        imageUrl = await uploadProductImage(imageFile);
      }

      const result = await createProduct({ ...data, image: imageUrl });
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Producto creado exitosamente");
        router.push('/admin/products');
        router.refresh();
      }
    } catch (error) {
      toast.error("Error al subir la imagen o crear el producto");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/products">
            <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-heading font-bold tracking-tight">Nuevo Producto</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-card p-8 rounded-2xl border shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Nombre del Producto</label>
              <input
                {...register('name')}
                placeholder="Ej. Fertilizante Triple 15"
                className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
              {errors.name && <p className="text-xs text-destructive font-medium">{errors.name.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Marca</label>
                <select
                  {...register('brand_id')}
                  disabled={isLoadingData}
                  className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50"
                >
                  <option value="">Seleccionar marca</option>
                  {brands.map(brand => (
                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                  ))}
                </select>
                {errors.brand_id && <p className="text-xs text-destructive font-medium">{errors.brand_id.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Categoría</label>
                <select
                  {...register('category_id')}
                  disabled={isLoadingData}
                  className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50"
                >
                  <option value="">Seleccionar categoría</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                {errors.category_id && <p className="text-xs text-destructive font-medium">{errors.category_id.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Descripción</label>
              <textarea
                {...register('description')}
                rows={5}
                placeholder="Describe las características y beneficios del producto..."
                className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
              />
              {errors.description && <p className="text-xs text-destructive font-medium">{errors.description.message}</p>}
            </div>
          </div>

          <div className="bg-card p-8 rounded-2xl border shadow-sm grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Precio (Q)</label>
              <input
                {...register('price', { valueAsNumber: true })}
                type="number"
                step="0.01"
                placeholder="0.00"
                className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
              {errors.price && <p className="text-xs text-destructive font-medium">{errors.price.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Unidad</label>
              <input
                {...register('unidad')}
                placeholder="Ej. unidad, litro, saco"
                className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
              {errors.unidad && <p className="text-xs text-destructive font-medium">{errors.unidad.message}</p>}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-card p-8 rounded-2xl border shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Imagen del Producto</label>
              <div className="relative aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer overflow-hidden group">
                {imagePreview ? (
                  <>
                    <Image src={imagePreview} alt="Preview" fill className="object-contain p-4" />
                    <button 
                      type="button"
                      onClick={() => setImagePreview(null)}
                      className="absolute top-2 right-2 p-1 bg-destructive text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground text-center px-4">
                      Sube una imagen o arrastra aquí
                    </span>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                    />
                  </>
                )}
              </div>
              <p className="text-[10px] text-muted-foreground text-center italic">
                * Sube una imagen clara del producto (JPG, PNG). Se guardará automáticamente en el catálogo.
              </p>
            </div>

            <div className="pt-4 border-t space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium" htmlFor="featured">Destacar producto</label>
                <input
                  id="featured"
                  type="checkbox"
                  {...register('featured')}
                  className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Stock Inicial</label>
                <input
                  type="number"
                  {...register('stock', { valueAsNumber: true })}
                  className="w-full rounded-xl border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  Guardar Producto
                </>
              )}
            </Button>
            <Link href="/admin/products" className="block">
              <Button variant="outline" type="button" className="w-full h-12 rounded-2xl font-bold">
                Cancelar
              </Button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
