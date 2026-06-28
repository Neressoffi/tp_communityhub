import CategoryForm from '../components/categories/CategoryForm';
import PageHeader from '../components/layout/PageHeader';

export default function AdminCategoriesPage() {
  return (
    <div>
      <PageHeader
        title="Gestion des catégories"
        subtitle="Créez les catégories utilisées pour classer les événements."
      />
      <CategoryForm />
    </div>
  );
}
