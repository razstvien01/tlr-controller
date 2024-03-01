import { useRouter } from "next/navigation"
import { UserAuth } from "../context/auth_context";

export const pushToDashboardIfAuthenticated = () => {
  const router = useRouter()
  const { user } = UserAuth()
  
  if(user){
    router.push("/dashboard")
  }
}

export const redirectBackIfUnAuthenticated = () => {
  const router = useRouter()
  const { user } = UserAuth()
  
  if(user){
    router.push("/")
  }
}
