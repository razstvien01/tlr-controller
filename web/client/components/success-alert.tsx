import { Check } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import React from "react";

interface AlertSuccessProps {
  description: string;
}

const AlertSuccess: React.FC<AlertSuccessProps> = ({ description }) => {
  return (
    <Alert className="text-green-600 border border-green-600">
      <Check className="w-4 h-4 text-green-600" />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default AlertSuccess;
