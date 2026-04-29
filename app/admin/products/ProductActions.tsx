'use client';

import { useState } from 'react';
import { MoreVertical, Edit, Trash2, Eye, Loader2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import Link from 'next/link';
import { deleteProduct } from './new/actions';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export function ProductActions({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirm('¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.')) {
      return;
    }

    setIsDeleting(true);
    try {
      const result = await deleteProduct(id);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success('Producto eliminado');
        router.refresh();
      }
    } catch (error) {
      toast.error('Error al eliminar el producto');
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <Link href={`/productos/${id}`} target="_blank">
        <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg">
          <Eye className="h-4 w-4" />
        </Button>
      </Link>
      <Link href={`/admin/products/${id}/edit`}>
        <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg">
          <Edit className="h-4 w-4" />
        </Button>
      </Link>
      <Button 
        size="icon" 
        variant="ghost" 
        className="h-8 w-8 rounded-lg text-destructive hover:bg-destructive/10"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
      </Button>
    </div>
  );
}
