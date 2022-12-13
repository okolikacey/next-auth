import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

function UserProfile() {
  // Redirect away if NOT auth
  // const { data: session, status } = useSession();
  // const router = useRouter();
  // console.log(status);

  // useEffect(() => {
  //   if (status === "unauthenticated") router.replace("/auth");
  // }, [router, status]);

  // if (status === "loading") {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
