import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 mb-2 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-bold text-yellow-500 dark:text-yellow-300">
          Bee
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          className="rounded-full px-4 py-2 text-sm transition-colors"
        >
          Connected
        </Button>

        <Avatar>
          <AvatarFallback className="bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
            JD
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}