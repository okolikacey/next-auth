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

  async function handleChangePassword(passwordData) {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={handleChangePassword} />
    </section>
  );
}

export default UserProfile;
