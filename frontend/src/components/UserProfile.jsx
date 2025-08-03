import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Navbar from "./NavBar";
import postService from "../services/posts";
import { useEffect, useState } from "react";

function UserProfile() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedPostappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      postService.setToken(user.token);
    }
  }, []);
  return (
    <>
      <Navbar />
      <section className="h-full">
        <Card shadow={false} className="border-gray-300 rounded-2xl">
          <CardHeader shadow={false} className="h-60 !rounded-lg ">
            <img
              src="https://shorturl.at/QK9Ia"
              alt="dark"
              height={1024}
              width={1024}
              className="w-full h-full object-center"
            />
          </CardHeader>
          <CardBody>
            <div className="flex flex-col lg:gap-0 gap-6 flex-wrap justify-between ">
              <div className="flex items-start gap-3 h-15 w-15 ">
                <Avatar
                  src="https://shorturl.at/PbnJX"
                  alt="avatar"
                  variant="rounded"
                />
                <div>
                  <Typography color="blue-gray" variant="h6">
                    {user && user.username}
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-gray-600"
                  >
                    {user && user.email}
                  </Typography>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="outlined"
                  className="border-gray-300 flex items-center gap-2 p-2"
                >
                  <i className="fa-brands fa-github text-xl" />
                  Github
                </Button>
                <Button
                  variant="outlined"
                  className="border-gray-300 flex items-center gap-2 p-2"
                >
                  <i className="fa-brands fa-twitter text-xl" />
                  Twitter
                </Button>
                <Button
                  variant="outlined"
                  className="border-gray-300 flex items-center gap-2 p-2"
                >
                  <i className="fa-brands fa-linkedin text-xl" />
                  Linkedin
                </Button>
              </div>
            </div>
            <Typography
              variant="small"
              className="font-normal text-gray-500 mt-6"
            >
              Passionate UI/UX designer focused on creating intuitive and
              engaging digital experiences. <br /> Driven by design thinking,
              creativity, and a love for problem-solving.
            </Typography>
          </CardBody>
        </Card>
      </section>
    </>
  );
}

export default UserProfile;
