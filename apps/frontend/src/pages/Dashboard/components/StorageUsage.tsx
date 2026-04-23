import { Progress } from '@/components/ui/progress';
import { formatBytes, storageMock } from './mockData';

export function StorageUsage() {
  const { totalBytes, usedBytes, slices } = storageMock;
  const usedPct = Math.min(100, (usedBytes / totalBytes) * 100);

  return (
    <div className="rounded-lg bg-background p-5 shadow-sm ring-1 ring-border/60">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold">Storage</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {formatBytes(usedBytes)} of {formatBytes(totalBytes)} used
          </p>
        </div>
        <span className="text-sm font-medium tabular-nums">
          {usedPct.toFixed(0)}%
        </span>
      </div>

      <Progress value={usedPct} className="mt-4" />

      <ul className="mt-5 space-y-3">
        {slices.map((slice) => {
          const pct = (slice.bytes / totalBytes) * 100;
          return (
            <li key={slice.id} className="flex items-center gap-3">
              <span
                aria-hidden
                className="size-2.5 shrink-0 rounded-full"
                style={{ background: slice.color }}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="truncate text-sm">{slice.label}</span>
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {formatBytes(slice.bytes)}
                  </span>
                </div>
                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${pct}%`,
                      background: slice.color,
                    }}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
