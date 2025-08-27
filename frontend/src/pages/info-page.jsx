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
          <div>You are not authorized.</div>
          <Button>          {currentUser && (currentUser.role == 'student' ? <Link to="/">Back to main</Link> : <Link to="/admin/">Back to main</Link>)}</Button>
        </div>
      ) : path === "/account-exists" ? (
        <div className="grid gap-2">
          <h4>Account already exists with this email.</h4>
          <Button className={"mx-auto w-fit"}>
            <a href="/signin">Sign In</a>
          </Button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default InfoPage;
