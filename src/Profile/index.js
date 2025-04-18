import Profile from "../components/Profile";

function profile() {
  console.log("phoooo", localStorage.getItem("photo"));

  return (
    <div className="p-8 max-w-md mx-auto">
      <Profile
        imageUrl={localStorage.getItem("photo")}
        name={localStorage.getItem("name")}
        email={localStorage.getItem("email")}
        imageSize="16"
      />
    </div>
  );
}
export default profile;
