import { AlertCircle } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import React from "react"

interface AlertDestructiveProps {
  description: string
}

const AlertDestructive: React.FC<AlertDestructiveProps> = ({description}) => {
  return (
    <Alert variant="destructive">
      <AlertCircle className="w-4 h-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {description}
      </AlertDescription>
    </Alert>
  )
}

export default AlertDestructive