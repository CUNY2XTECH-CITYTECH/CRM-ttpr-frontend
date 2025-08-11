import { useLocation } from "react-router"
import { Button } from "@/components/ui/button"
function InfoPage() {
  const location = useLocation()
  const path = location.pathname
  console.log(path)
  return (
    <div className="h-screen w-full grid justify-center items-center">
      {(path === '/error') ?
        <div>Oops... ${action} failed. ${reason}</div>
        : path === '/account-exists' ?
          <div className="grid gap-2">
            <h4>
            Account already exists with this email.
            </h4>
            <Button className={'mx-auto w-fit'}>
              <a href="/signin">Sign In</a></Button>
          </div>
          : <div></div>
      }
    </div>
  )
}

export default InfoPage 
