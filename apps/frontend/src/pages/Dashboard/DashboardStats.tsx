import { StatsOverview } from './components/StatsOverview';
import { StorageUsage } from './components/StorageUsage';
import { UploadsChart } from './components/UploadsChart';
import { FileTypeBreakdown } from './components/FileTypeBreakdown';
import { RecentActivity } from './components/RecentActivity';

export default function DashboardStats() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          An overview of your files, storage, and recent activity.
        </p>
      </header>

      <StatsOverview />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <UploadsChart />
        </div>
        <StorageUsage />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <FileTypeBreakdown />
        </div>
        <RecentActivity />
      </div>
    </div>
  );
}
