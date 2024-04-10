import { login, logout } from "./actions";

export default function LoginPage() {
  return (
    <>
      <form>
        <button formAction={login}>Log in</button>
      </form>
      <form>
        <button formAction={logout}>Log out</button>
      </form>
    </>
  );
}
