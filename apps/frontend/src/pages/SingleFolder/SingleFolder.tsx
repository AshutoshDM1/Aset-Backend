import { useQuery } from '@tanstack/react-query';
import { Link, Navigate, useParams } from 'react-router';
import { Button } from '@/components/ui/button';
import { trpc } from '@/utils/trpc';
import { FolderContents } from './components/FolderContents';
import DashboardHeader from '@/shared/Dashboard/DashboardHeader';

export default function SingleFolder() {
  const { folderId } = useParams<{ folderId: string }>();
  const id = Number(folderId);

  const folderQuery = useQuery({
    ...trpc.folder.getById.queryOptions({ id }),
    enabled: Number.isInteger(id) && id > 0,
    retry: false,
  });

  if (!folderId || !Number.isInteger(id) || id < 1 || !folderQuery.data) {
    return <Navigate to="/dashboard" replace />;
  }

  if (folderQuery.isError) {
    return (
      <div className="w-full rounded-lg bg-background p-4 shadow-sm ring-1 ring-border/60">
        <p className="text-sm text-destructive">{folderQuery.error.message}</p>
        <Button variant="outline" size="sm" className="mt-4" asChild>
          <Link to="/dashboard">Back to All files</Link>
        </Button>
      </div>
    );
  }

  const folder = folderQuery.data;

  return (
    <div className="w-full rounded-lg bg-background p-4 shadow-sm ring-1 ring-border/60">
      <DashboardHeader
        folderId={folder.id}
        folderName={folder.name}
        folerDescription={`Folders and files in ${folder.name}`}
        canUpload={true}
        canCreate={true}
      />
      {folder ? (
        <section className="mt-6" aria-label="Folder contents">
          <FolderContents folderId={folder.id} />
        </section>
      ) : null}
    </div>
  );
}
