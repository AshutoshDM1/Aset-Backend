import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { queryClient, trpc } from '@/utils/trpc';

type UploadFileButtonProps = {
  folderId: number;
  canUpload: boolean;
};

export function UploadFileButton({
  folderId,
  canUpload,
}: UploadFileButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const presign = useMutation(trpc.file.presignUpload.mutationOptions());
  const register = useMutation(trpc.file.create.mutationOptions());

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = e.target.files?.[0];
    if (!picked || !canUpload) return;
    toast.loading('Uploading file...');
    setBusy(true);
    try {
      const sizeMb = picked.size / (1024 * 1024);

      const signed = await presign.mutateAsync({
        folderId,
        fileName: picked.name,
        contentType: picked.type || undefined,
        sizeMb,
      });

      const put = await fetch(signed.uploadUrl, {
        method: 'PUT',
        body: picked,
        headers: {
          'Content-Type': signed.contentType,
        },
      });

      if (!put.ok) {
        throw new Error(`Upload failed (${put.status})`);
      }

      await register.mutateAsync({
        name: picked.name,
        folderId,
        objectKey: signed.objectKey,
        sizeMb,
      });

      toast.success('File uploaded');
      void queryClient.invalidateQueries(
        trpc.file.listByFolder.queryFilter({ folderId }),
      );
      void queryClient.invalidateQueries(trpc.user.me.queryFilter());
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Could not upload file';
      toast.error(message);
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = '';
      toast.dismiss();
    }
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        className="sr-only"
        id={`upload-file-${folderId}`}
        onChange={onPick}
        disabled={!canUpload || busy}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={!canUpload || busy}
        onClick={() => inputRef.current?.click()}
      >
        {busy ? 'Uploading…' : 'Upload file'}
      </Button>
    </>
  );
}
