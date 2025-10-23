export default function DummyReports() {
  return (
    <div className="space-y-8 ml-1">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground mt-2">
          Generate and view analytics reports
        </p>
      </div>

      {/* Report Types */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="font-semibold">Organizations Report</h3>
              <p className="text-sm text-muted-foreground">
                Overview of all organizations
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold">248</p>
            <p className="text-xs text-muted-foreground mt-1">
              Total organizations tracked
            </p>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="font-semibold">Contacts Report</h3>
              <p className="text-sm text-muted-foreground">
                Detailed contact analytics
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold">1,429</p>
            <p className="text-xs text-muted-foreground mt-1">
              Active contacts in database
            </p>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="font-semibold">Activity Report</h3>
              <p className="text-sm text-muted-foreground">
                Recent activity summary
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold">156</p>
            <p className="text-xs text-muted-foreground mt-1">
              Actions logged this month
            </p>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="rounded-lg border bg-card">
        <div className="p-6">
          <h3 className="text-lg font-semibold">Recent Reports</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Previously generated reports
          </p>
        </div>
        <div className="border-t">
          <div className="p-4 hover:bg-muted/50 transition-colors cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">
                  Monthly Organizations Summary
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Generated on Oct 15, 2025 • 248 entries
                </p>
              </div>
              <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                View
              </div>
            </div>
          </div>

          <div className="p-4 hover:bg-muted/50 transition-colors cursor-pointer border-t">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Contact Growth Analysis</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Generated on Oct 10, 2025 • 1,429 entries
                </p>
              </div>
              <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                View
              </div>
            </div>
          </div>

          <div className="p-4 hover:bg-muted/50 transition-colors cursor-pointer border-t">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">
                  Quarterly Performance Report
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Generated on Oct 1, 2025 • Q3 2025
                </p>
              </div>
              <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                View
              </div>
            </div>
          </div>

          <div className="p-4 hover:bg-muted/50 transition-colors cursor-pointer border-t">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">User Activity Summary</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Generated on Sep 28, 2025 • 12 users
                </p>
              </div>
              <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                View
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Generate New Report */}
      <div className="rounded-lg bg-linear-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 p-6">
        <h3 className="text-lg font-semibold">Generate New Report</h3>
        <p className="text-sm text-muted-foreground mt-2">
          Create custom reports based on your data
        </p>
        <button className="mt-4 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
          Create Report
        </button>
      </div>
    </div>
  );
}
