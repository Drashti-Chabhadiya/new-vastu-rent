import { useState } from 'react'
import * as LucideIcons from 'lucide-react'
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  FolderPlus,
  Folder,
  Layers,
  ArrowRight,
} from 'lucide-react'
import { Input } from '#/components/ui/input'
import { Button } from '#/components/ui/button'
import { 
  useAdminCategories, 
  useCreateCategory, 
  useUpdateCategory, 
  useDeleteCategory 
} from '#/hook'
import { CategoryFormDialog } from './CategoryFormDialog'
import { DeleteConfirmDialog } from './DeleteConfirmDialog'
import { authClient } from '#/lib/auth/auth-client'

interface CategoryManagementProps {
  onManageCategory?: (categoryId: string) => void
}

export const CategoryManagement = ({ onManageCategory }: CategoryManagementProps) => {
  const [search, setSearch] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<any>(null)
  
  // Deletion state
  const [categoryToDelete, setCategoryToDelete] = useState<any>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const { data: categories, isLoading } = useAdminCategories();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const isAdmin = user?.role === 'admin' || user?.role === 'superAdmin';

  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();

  const handleOpenAdd = () => {
    if (!isAdmin) return;
    setEditingCategory(null)
    setIsDialogOpen(true)
  }

  const handleOpenEdit = (category: any) => {
    if (!isAdmin) return;
    setEditingCategory(category)
    setIsDialogOpen(true)
  }

  const handleFormSubmit = (data: any) => {
    if (editingCategory) {
      updateMutation.mutate(
        { id: editingCategory.id, ...data },
        { 
          onSuccess: () => {
            setIsDialogOpen(false)
            setEditingCategory(null)
          }
        }
      )
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          setIsDialogOpen(false)
        }
      })
    }
  }

  const handleDeleteConfirm = () => {
    if (categoryToDelete) {
      deleteMutation.mutate(categoryToDelete.id, {
        onSuccess: () => {
          setIsDeleteDialogOpen(false)
          setCategoryToDelete(null)
        }
      })
    }
  }

  const filteredCategories = categories?.filter((cat: any) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  )

  const renderCategoryIcon = (category: any) => {
    if (category.image) {
      return (
        <div className="w-12 h-12 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
          <img 
            src={category.image} 
            alt={category.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as any).src = 'https://via.placeholder.com/100?text=Category'
            }}
          />
        </div>
      )
    }

    // Try to find the icon component
    const iconName = category.icon || 'Folder'
    const IconComponent = (LucideIcons as any)[iconName]
    const iconColor = category.color || '#166534'
    
    return (
      <div 
        className="w-12 h-12 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 shadow-sm"
        style={{ 
          backgroundColor: `${iconColor}15`,
          color: iconColor 
        }}
        title={iconName}
      >
        {IconComponent ? <IconComponent size={24} /> : <Folder size={24} />}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10"
            size={18}
          />
          <Input
            type="text"
            placeholder="Search categories..."
            className="pl-11 h-12 bg-gray-50/50 border-transparent rounded-xl text-[15px] text-gray-900 placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-dash-brand/30 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {isAdmin && (
          <Button
            onClick={handleOpenAdd}
            className="bg-dash-brand hover:bg-dash-brand/90 text-white rounded-xl h-12 px-8 font-bold shadow-md shadow-dash-brand/10 flex items-center gap-2 transition-all active:scale-[0.98]"
          >
            <Plus size={20} strokeWidth={2.5} />
            Add Category
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-32 bg-white rounded-xl border border-gray-100 animate-pulse"
            />
          ))
        ) : filteredCategories?.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white rounded-xl border border-dashed border-gray-200">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FolderPlus className="text-gray-300" size={32} />
            </div>
            <p className="text-gray-500 font-bold">No categories found.</p>
            <p className="text-sm text-gray-400 mt-1">
              Try adjusting your search or add a new category.
            </p>
          </div>
        ) : (
          filteredCategories?.map((category: any) => (
            <div
              key={category.id}
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-dash-brand/20 transition-all group relative overflow-hidden"
            >
              {/* Background Accent */}
              <div 
                className="absolute top-0 right-0 w-24 h-24 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150 opacity-[0.03]" 
                style={{ backgroundColor: category.color || '#166534' }}
              />

              <div className="flex items-start justify-between relative z-10">
                <div className="space-y-4">
                  {renderCategoryIcon(category)}
                  <div>
                    <h3 className="text-lg font-extrabold text-gray-900 group-hover:text-dash-brand transition-colors">
                      {category.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <div 
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                        style={{ backgroundColor: `${category.color || '#166534'}15` }}
                      >
                        <Layers size={12} style={{ color: category.color || '#166534' }} />
                        <span 
                          className="text-[11px] font-extrabold uppercase tracking-wider"
                          style={{ color: category.color || '#166534' }}
                        >
                          {category._count?.products || 0} Items
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {isAdmin && (
                  <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenEdit(category)}
                      className="h-9 w-9 text-gray-400 hover:text-dash-brand hover:bg-dash-brand/10 rounded-xl"
                    >
                      <Edit2 size={18} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setCategoryToDelete(category)
                        setIsDeleteDialogOpen(true)
                      }}
                      className="h-9 w-9 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                )}
              </div>

              <div 
                onClick={() => onManageCategory?.(category.id)}
                className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between cursor-pointer group/manage"
              >
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover/manage:text-dash-brand transition-colors">
                  Manage Collection
                </span>
                <ArrowRight
                  size={16}
                  className="text-gray-300 group-hover/manage:text-dash-brand group-hover/manage:translate-x-1 transition-all"
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Forms & Dialogs */}
      <CategoryFormDialog 
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        editingCategory={editingCategory}
        onSubmit={handleFormSubmit}
        isPending={createMutation.isPending || updateMutation.isPending}
      />

      <DeleteConfirmDialog 
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        itemName={categoryToDelete?.name}
        isPending={deleteMutation.isPending}
      />
    </div>
  )
}


