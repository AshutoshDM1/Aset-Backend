import { FileIcon } from 'lucide-react';
import FolderComponent, {
  type FolderColor,
} from '@/shared/Dashboard/FolderComponent';
import ImageFilePreview from './ImageFilePreview';

const COLOR_CYCLE: FolderColor[] = ['cyan', 'yellow', 'pink', 'black'];

const IMAGE_NAME = /\.(jpe?g|png|gif|webp|avif|svg|bmp|ico)$/i;

function isImageFileName(name: string) {
  return IMAGE_NAME.test(name);
}

type FolderItem = { id: number; name: string };
type FileItem = { id: number; name: string; url: string };

type FolderContentsProps = {
  folders: FolderItem[];
  files: FileItem[];
  onRefetch?: () => void;
};

export function FolderContents({ folders, files }: FolderContentsProps) {
  const imageFiles = files.filter((f) => isImageFileName(f.name));
  const otherFiles = files.filter((f) => !isImageFileName(f.name));

  if (folders.length === 0 && files.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-border bg-muted/20 px-4 py-10 text-center text-sm text-muted-foreground">
        This folder is empty.
      </p>
    );
  }

  return (
    <>
      {folders.length > 0 || imageFiles.length > 0 ? (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-10">
          {folders.map((item, index) => (
            <li key={`f-${item.id}`}>
              <FolderComponent
                folderId={item.id}
                folderName={item.name}
                color={COLOR_CYCLE[index % COLOR_CYCLE.length]}
              />
            </li>
          ))}
          {imageFiles.map((item) => (
            <li
              key={`file-${item.id}`}
              className="flex items-start justify-center"
            >
              <ImageFilePreview name={item.name} url={item.url} />
            </li>
          ))}
        </ul>
      ) : null}
      {otherFiles.length > 0 ? (
        <ul
          className={`flex flex-col gap-2 ${folders.length > 0 || imageFiles.length > 0 ? 'mt-6' : ''}`}
        >
          {otherFiles.map((item) => (
            <li key={`file-${item.id}`}>
              <div className="flex w-full items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-left">
                <FileIcon
                  className="size-5 shrink-0 text-muted-foreground"
                  aria-hidden
                />
                <span className="min-w-0 truncate font-medium">
                  {item.name}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}
