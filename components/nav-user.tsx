import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { BadgeCheck, ChevronsUpDown, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import { Skeleton } from "./ui/skeleton";
import { removeToken } from "@/utils/session";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function NavUser() {
  const { user, loading } = useAuth();
  const { isMobile } = useSidebar();
  const router = useRouter();

  const handleLogout = async () => {
    await removeToken();
    toast.success("تم تسجيل الخروج بنجاح");
    router.replace("/");
  };

  if (loading) {
    return <NavUserSkeleton />;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src="" alt={user?.name} />
                <AvatarFallback className="rounded-lg">
                  {user?.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-right text-sm leading-tight">
                <span className="truncate font-medium">{user?.name}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="mr-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-right text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src="" alt={user?.name} />
                  <AvatarFallback className="rounded-lg">
                    {user?.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-right text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem disabled>
                <BadgeCheck />
                الحساب
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              تسجيل الخروج
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function NavUserSkeleton() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="pointer-events-none">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <div className="grid flex-1 gap-1 text-right">
            <Skeleton className="h-4 w-24 ml-auto" />
            <Skeleton className="h-3 w-32 ml-auto" />
          </div>
          <Skeleton className="h-4 w-4 mr-auto" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
