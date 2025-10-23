import { AlertCircle } from "lucide-react";

export function ErrorState() {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-4">
      <div className="flex flex-col items-center gap-4 text-center max-w-md">
        <div className="rounded-full bg-destructive/10 p-4">
          <AlertCircle className="h-10 w-10 text-destructive" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold tracking-tight">
            Oops! Something went wrong
          </h3>
          <p className="text-sm text-muted-foreground">
            There was an error loading the data. Please try again later.
          </p>
        </div>
      </div>
    </div>
  );
}
