const LogoLogin = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
        <div className="relative bg-linear-to-br from-primary to-chart-2 p-4 rounded-2xl shadow-2xl">
          <div className="flex flex-col gap-1">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-primary-foreground rounded-sm animate-pulse"></div>
              <div className="w-2 h-2 bg-primary-foreground/60 rounded-sm animate-pulse delay-75"></div>
              <div className="w-2 h-2 bg-primary-foreground rounded-sm animate-pulse delay-150"></div>
            </div>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-primary-foreground/60 rounded-sm animate-pulse delay-150"></div>
              <div className="w-2 h-2 bg-primary-foreground rounded-sm animate-pulse"></div>
              <div className="w-2 h-2 bg-primary-foreground/60 rounded-sm animate-pulse delay-75"></div>
            </div>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-primary-foreground rounded-sm animate-pulse delay-75"></div>
              <div className="w-2 h-2 bg-primary-foreground/60 rounded-sm animate-pulse delay-150"></div>
              <div className="w-2 h-2 bg-primary-foreground rounded-sm animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold bg-linear-to-r from-primary via-chart-2 to-primary bg-clip-text text-transparent">
          BinarCode
        </h1>
        <span className="text-sm text-muted-foreground tracking-wider uppercase">
          CRM System
        </span>
      </div>
    </div>
  );
};

export default LogoLogin;
