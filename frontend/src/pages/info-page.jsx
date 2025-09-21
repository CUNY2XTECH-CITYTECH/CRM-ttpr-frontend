import { Link, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/dataContext";
function InfoPage() {
  const location = useLocation();
  const { currentUser } = useAuth()
  const path = location.pathname;
  return (
    <div className="h-screen w-full grid justify-center items-center">
      {path === "/error" ? (
        <div>Oops... Error occurred.</div>
      ) : path === "/not-authorized" ? (
        <div className="grid gap-2">
            {currentUser?(
              <div>
          <div>You are not authorized.</div>


          <Button>  {currentUser.role == 'student' ? <Link to="/">Back to main</Link> : <Link to="/admin/">Back to dashboard</Link>}</Button>
                
          </div>
          ):(
                <div className="grid gap-2">
            <div>Session Expired. Please login to continue.</div>
                  <Button className="mx-auto"><Link to="/login">Login </Link></Button>
</div>
          )}
        </div>
      ) : path === "/account-exists" ? (
        <div className="grid gap-2">
          <h4>Account already exists with this email.</h4>
          <Button className={"mx-auto w-fit"}>
            <a href="/login">Login</a>
          </Button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default InfoPage;
