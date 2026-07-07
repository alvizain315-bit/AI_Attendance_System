import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { ReactNode } from "react";
import { ScanFace, LogOut, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar";
import { toast } from "sonner";

export type NavItem = { title: string; url: string; icon: any };

export function DashboardShell({ role, items, title }: { role: "Admin" | "Teacher"; items: NavItem[]; title: string }) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onLogout = () => {
    toast.success("Signed out");
    navigate({ to: "/" });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar>
          <SidebarHeader className="border-b border-sidebar-border p-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "var(--gradient-accent)" }}>
                <ScanFace className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <div className="font-bold text-sidebar-foreground">AttendAI</div>
                <div className="text-xs text-sidebar-foreground/60">{role} Panel</div>
              </div>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => {
                    const active = pathname === item.url;
                    return (
                      <SidebarMenuItem key={item.url}>
                        <SidebarMenuButton asChild isActive={active}>
                          <Link to={item.url} className="flex items-center gap-3">
                            <item.icon className="w-4 h-4" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t border-sidebar-border p-3">
            <Button onClick={onLogout} variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 border-b border-border bg-card/60 backdrop-blur flex items-center justify-between px-6 sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <h1 className="font-semibold text-lg">{title}</h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-muted/70 relative">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent" />
              </button>
              <div className="w-9 h-9 rounded-full flex items-center justify-center font-semibold text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
                {role[0]}
              </div>
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export function StatCard({ icon: Icon, label, value, trend, gradient }: { icon: any; label: string; value: string | number; trend?: string; gradient: "primary" | "accent" | "success" | "warning" }) {
  const grads: Record<string, string> = {
    primary: "var(--gradient-primary)",
    accent: "var(--gradient-accent)",
    success: "linear-gradient(135deg, oklch(0.62 0.14 155), oklch(0.72 0.14 145))",
    warning: "linear-gradient(135deg, oklch(0.78 0.15 75), oklch(0.82 0.14 65))",
  };
  return (
    <div className="bg-card rounded-2xl p-5 border border-border/60 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-all">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold mt-1.5 tracking-tight">{value}</p>
          {trend && <p className="text-xs text-success mt-1.5 font-medium">{trend}</p>}
        </div>
        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: grads[gradient] }}>
          <Icon className="w-5 h-5 text-primary-foreground" />
        </div>
      </div>
    </div>
  );
}

export function Section({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <div className="bg-card rounded-2xl border border-border/60 shadow-[var(--shadow-card)] overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-border/60">
        <h2 className="font-semibold">{title}</h2>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}