import { Link } from 'react-router';
import { Folder } from 'lucide-react';
import { cn } from '@/lib/utils';

export type FolderColor = 'cyan' | 'yellow' | 'pink' | 'black';

interface FolderComponentProps {
  folderName: string;
  folderId: string | number;
  color?: FolderColor;
  to?: string;
  className?: string;
}

const colorMap: Record<FolderColor, string> = {
  cyan: 'text-primary',
  yellow: 'text-amber-400',
  pink: 'text-pink-500',
  black: 'text-neutral-800 dark:text-neutral-200',
};

const FolderComponent = ({
  folderName,
  folderId,
  color = 'cyan',
  to,
  className,
}: FolderComponentProps) => {
  const href = to ?? `/dashboard/folder/${folderId}`;

  return (
    <Link
      to={href}
      className="block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div
        className={cn(
          'group flex flex-col items-center rounded-2xl p-2 transition-transform duration-200 hover:-translate-y-1',
          className,
        )}
      >
        <Folder
          className={cn('size-20', colorMap[color])}
          fill="currentColor"
          strokeWidth={1.25}
          aria-hidden
        />
        <p className="w-full truncate -mt-1.5 text-sm font-medium text-foreground text-center">
          {folderName}
        </p>
      </div>
    </Link>
  );
};

export default FolderComponent;
