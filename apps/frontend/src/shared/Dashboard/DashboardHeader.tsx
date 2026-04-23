import { CreateFolderDialog } from '@/shared/Dashboard/CreateFolderDialog';
import { trpc } from '@/utils/trpc';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/react';
import { UploadFileButton } from './UploadFileButton';

interface DashboardHeaderProps {
  folderId: number;
  folderName: string;
  folerDescription: string;
  canUpload: boolean;
  canCreate: boolean;
}

const DashboardHeader = ({
  folderId,
  folderName = 'My Files',
  folerDescription = 'Folders in your personal drive.',
  canUpload = false,
  canCreate = false,
}: DashboardHeaderProps) => {
  const { isSignedIn } = useAuth();
  const meQuery = useQuery({
    ...trpc.user.me.queryOptions(),
    enabled: Boolean(isSignedIn),
  });

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{folderName}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{folerDescription}</p>
      </div>
      <div className="flex gap-2">
        {canCreate && <CreateFolderDialog canCreate={Boolean(meQuery.data)} />}
        {canUpload && (
          <UploadFileButton folderId={folderId} canUpload={canUpload} />
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
