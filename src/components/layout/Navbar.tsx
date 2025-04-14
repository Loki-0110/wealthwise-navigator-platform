
import { Bell, ChevronDown, LogOut, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const isLoggedIn = !!user;

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.email) return "U";
    return user.email.substring(0, 1).toUpperCase();
  };

  // Get user display name
  const getUserDisplayName = () => {
    if (!user) return "";
    if (user.user_metadata?.full_name) return user.user_metadata.full_name;
    return user.email?.split('@')[0] || "User";
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="h-16 border-b bg-white flex items-center px-4 justify-between w-full">
      <div className="flex items-center gap-2">
        <Link to={isLoggedIn ? "/dashboard" : "/"} className="flex items-center">
          <div className="w-10 h-10 rounded-lg bg-finance-blue-dark flex items-center justify-center">
            <div className="text-white font-bold text-xl">W</div>
          </div>
          <span className="ml-2 font-bold text-xl text-finance-blue-dark hidden sm:inline-block">
            WealthWise
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        {isLoggedIn ? (
          <>
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link to="/alerts">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Link>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.user_metadata?.avatar_url || ""} />
                    <AvatarFallback className="bg-finance-blue text-white">{getUserInitials()}</AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline-block">{getUserDisplayName()}</span>
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link to="/onboarding">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Button variant="ghost" asChild>
              <Link to="/login">Log in</Link>
            </Button>
            <Button className="bg-finance-blue-dark hover:bg-finance-blue" asChild>
              <Link to="/signup">Sign up</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};
