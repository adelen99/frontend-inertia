export default function DummyDashboard() {
  return (
    <div className="ml-1 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Overview of your CRM activity
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-6 hover:shadow-md transition-shadow">
          <p className="text-sm font-medium text-muted-foreground">
            Organizations
          </p>
          <p className="text-3xl font-bold mt-3">248</p>
          <p className="text-xs text-muted-foreground mt-2">
            Total active organizations
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6 hover:shadow-md transition-shadow">
          <p className="text-sm font-medium text-muted-foreground">Contacts</p>
          <p className="text-3xl font-bold mt-3">1,429</p>
          <p className="text-xs text-muted-foreground mt-2">
            Total contacts in system
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6 hover:shadow-md transition-shadow">
          <p className="text-sm font-medium text-muted-foreground">Reports</p>
          <p className="text-3xl font-bold mt-3">42</p>
          <p className="text-xs text-muted-foreground mt-2">
            Generated this month
          </p>
        </div>
      </div>

      {/* Welcome Card with Gradient */}
      <div className="rounded-lg bg-linear-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 p-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold">Welcome to your CRM</h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            Manage your organizations, contacts, and generate insightful reports
            all in one centralized platform. Start by exploring your data or
            creating new entries.
          </p>
          <div className="flex gap-3 mt-6">
            <div className="px-4 py-2 rounded-md bg-primary/10 text-primary text-sm font-medium">
              Quick Start Guide
            </div>
            <div className="px-4 py-2 rounded-md bg-muted text-muted-foreground text-sm font-medium">
              View Tutorial
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
