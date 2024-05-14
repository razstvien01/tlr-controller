import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function LogSheet({ logs }: { logs: string[] | undefined }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="text-lg mr-4" variant="outline">
          Show Logs
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Controller Logs</SheetTitle>
          <SheetDescription>
            Response messages from the Server will show up here.
          </SheetDescription>
        </SheetHeader>
        <div className="h-2/3 overflow-y-scroll">
          <div className="grid gap-4 py-4">
            {logs
              ?.slice()
              .reverse()
              .map((log, index) => (
                <div key={index} className="p-2 border-b border-gray-300">
                  {log}
                </div>
              ))}
          </div>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button className="mt-10" type="button">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
