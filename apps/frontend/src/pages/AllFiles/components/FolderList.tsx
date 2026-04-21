import { useQuery } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc';
import FolderComponent, {
  type FolderColor,
} from '@/shared/FolderComponent/FolderComponent';

type FolderListProps = {
  /** Omit for drive root. Set to list children of a folder. */
  parentFolderId?: number;
};

const COLOR_CYCLE: FolderColor[] = ['cyan', 'yellow', 'pink', 'black'];

export function FolderList({ parentFolderId }: FolderListProps) {
  const listQuery =
    parentFolderId === undefined
      ? trpc.folder.list.queryOptions()
      : trpc.folder.list.queryOptions({ parentId: parentFolderId });

  const {
    data: folders,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(listQuery);

  if (isLoading) {
    return (
      <ul
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        aria-busy="true"
      >
        {[1, 2, 3, 4].map((i) => (
          <li key={i} className="h-40 animate-pulse rounded-2xl bg-muted/60" />
        ))}
      </ul>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-border bg-card p-4 text-sm text-destructive">
        {error.message}
        <button
          type="button"
          className="mt-2 text-primary underline underline-offset-2"
          onClick={() => void refetch()}
        >
          Try again
        </button>
      </div>
    );
  }

  if (!folders?.length) {
    return (
      <p className="rounded-2xl border border-dashed border-border bg-muted/20 px-4 py-8 text-center text-sm text-muted-foreground">
        No folders yet. Create one to get started.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9">
      {folders.map((folder, index) => (
        <li key={folder.id}>
          <FolderComponent
            folderId={folder.id}
            folderName={folder.name}
            color={COLOR_CYCLE[index % COLOR_CYCLE.length]}
          />
        </li>
      ))}
    </ul>
  );
}
