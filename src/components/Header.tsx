import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function Header() {
  // Get logged-in user info from Redux store
  const user = useSelector((state: RootState) => state.user.users[0]);

  return (
    <header className="flex items-center justify-between p-4 mb-5 transition-colors">
      <div className="flex items-center space-x-2 p-2 ml-5">
        <span className="text-2xl font-bold text-yellow-500 dark:text-yellow-300">
          Bee
        </span>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Coming Soon
        </span>
      </div>

      <div className="flex items-center space-x-4 p-2">
        <Button
          variant="outline"
          className="rounded-full px-4 py-2 text-sm transition-colors"
        >
          Connected
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <button>
              <Avatar className="cursor-pointer">
                {user?.photo_url ? (
                  <img src={user.photo_url} alt={user.full_name} />
                ) : (
                  <AvatarFallback className="bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                    {user?.nickname
                      ? user.nickname[0].toUpperCase() + user.nickname[1]
                      : "JD"}
                  </AvatarFallback>
                )}
              </Avatar>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-4">
            {user ? (
              <div className="space-y-2">
                <p className="font-semibold">{user.full_name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user.email}
                </p>
                {/* You can add a logout button here */}
              </div>
            ) : (
              <p>No user info</p>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
