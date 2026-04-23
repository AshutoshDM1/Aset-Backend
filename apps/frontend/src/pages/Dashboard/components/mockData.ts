export type StatTrend = 'up' | 'down' | 'flat';

export type StatItem = {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: StatTrend;
  hint?: string;
};

export const statsMock: StatItem[] = [
  {
    id: 'files',
    label: 'Total Files',
    value: '1,284',
    change: '+12.4%',
    trend: 'up',
    hint: 'vs. last month',
  },
  {
    id: 'folders',
    label: 'Folders',
    value: '96',
    change: '+4.1%',
    trend: 'up',
    hint: 'vs. last month',
  },
  {
    id: 'shared',
    label: 'Shared with me',
    value: '38',
    change: '-2.3%',
    trend: 'down',
    hint: 'vs. last month',
  },
  {
    id: 'starred',
    label: 'Starred',
    value: '47',
    change: '+0.0%',
    trend: 'flat',
    hint: 'vs. last month',
  },
];

export type StorageSlice = {
  id: string;
  label: string;
  bytes: number;
  color: string;
};

const GB = 1024 * 1024 * 1024;

export const storageMock = {
  totalBytes: 50 * GB,
  usedBytes: 32.6 * GB,
  slices: [
    {
      id: 'images',
      label: 'Images',
      bytes: 12.1 * GB,
      color: 'var(--chart-1)',
    },
    { id: 'videos', label: 'Videos', bytes: 9.4 * GB, color: 'var(--chart-2)' },
    {
      id: 'docs',
      label: 'Documents',
      bytes: 6.2 * GB,
      color: 'var(--chart-3)',
    },
    { id: 'audio', label: 'Audio', bytes: 2.7 * GB, color: 'var(--chart-4)' },
    { id: 'other', label: 'Other', bytes: 2.2 * GB, color: 'var(--chart-5)' },
  ] as StorageSlice[],
};

export type UploadsPoint = {
  date: string;
  uploads: number;
  downloads: number;
};

export const uploadsMock: UploadsPoint[] = [
  { date: 'Mon', uploads: 14, downloads: 8 },
  { date: 'Tue', uploads: 22, downloads: 12 },
  { date: 'Wed', uploads: 18, downloads: 15 },
  { date: 'Thu', uploads: 31, downloads: 19 },
  { date: 'Fri', uploads: 27, downloads: 22 },
  { date: 'Sat', uploads: 12, downloads: 7 },
  { date: 'Sun', uploads: 9, downloads: 5 },
];

export type FileTypePoint = {
  type: string;
  count: number;
};

export const fileTypesMock: FileTypePoint[] = [
  { type: 'Images', count: 412 },
  { type: 'Docs', count: 286 },
  { type: 'Videos', count: 134 },
  { type: 'Audio', count: 98 },
  { type: 'PDFs', count: 212 },
  { type: 'Other', count: 142 },
];

export type ActivityItem = {
  id: string;
  actor: string;
  action: string;
  target: string;
  time: string;
};

export const activityMock: ActivityItem[] = [
  {
    id: '1',
    actor: 'You',
    action: 'uploaded',
    target: 'Q2-report.pdf',
    time: '2m ago',
  },
  {
    id: '2',
    actor: 'Alex Johnson',
    action: 'shared',
    target: 'Design Assets',
    time: '18m ago',
  },
  {
    id: '3',
    actor: 'You',
    action: 'starred',
    target: 'Roadmap.md',
    time: '1h ago',
  },
  {
    id: '4',
    actor: 'Priya Nair',
    action: 'commented on',
    target: 'budget-v3.xlsx',
    time: '3h ago',
  },
  {
    id: '5',
    actor: 'You',
    action: 'deleted',
    target: 'old-logo.png',
    time: 'Yesterday',
  },
];

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const units = ['KB', 'MB', 'GB', 'TB'];
  let value = bytes / 1024;
  let i = 0;
  while (value >= 1024 && i < units.length - 1) {
    value /= 1024;
    i++;
  }
  return `${value.toFixed(1)} ${units[i]}`;
}
