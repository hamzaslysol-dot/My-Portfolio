import ProfileImg from "../assets/profile.png";
import Container from "./container";
const Profile = () => {
  return (
    <Container>
      <div className="grid-cols-2 grid gap-10 mt-10 items-center ">
        <div>
          <div className="text-7xl font-semibold">
            <h1>Hello,I'm</h1>
            <h1>Hamza Latif</h1>
          </div>

          <div className=" grid grid-cols-2 gap-10 mt-12">
            <button className="bg-orange-500 border-1 border-black text-white text-2xl font-bold p-2">
              Get a Project?
            </button>
            <button className="bg-black border-1 border-orange-500 text-white text-2xl font-bold">
              My resume
            </button>
          </div>
        </div>
        <img src={ProfileImg} alt="profile" className="ml-auto" />
      </div>
    </Container>
  );
};

export default Profile;
