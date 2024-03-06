import { toast } from "./ui/use-toast";

interface ShowToastProps {
  variant?: "default" | "destructive";
  title?: string;
  description?: string;
}

export const ShowToast = ({ title = '', description = '', variant = 'default' }: ShowToastProps) => {
  const showToast = toast({
    variant: variant,
    title: title,
    description: description,
  });

  setTimeout(() => {
    showToast.dismiss(); //* Close the toast after 3 seconds
  }, 3000);
};
