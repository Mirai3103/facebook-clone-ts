import React from "react";
import Story from "../../Components/story";
import ShortCuts from "./ShortCuts";
import Contacts from "./Contacts";
import Card from "../../Components/NewFeed/Card";
import AddNewPost from "../../Components/NewFeed/AddNewPost";
import Post from "../../Components/Post";
import PostService, { IPost } from "../../Services/PostService";
import useAuth from "../../Hooks/useAuth";

export default function Body() {
  const [posts, setPosts] = React.useState<IPost[]>([]);
  const [change, setChange] = React.useState(false);
  const auth = useAuth();
  React.useEffect(() => {
    const handleHasNewPost = (data: IPost) => {
      console.log(data);
      setChange((pre) => !pre);
    };
    auth.socket?.on("new-post-added", handleHasNewPost);
    return () => {
      auth.socket?.off("new-post-added", handleHasNewPost);
    };
  }, [auth.socket]);

  React.useEffect(() => {
    PostService.getAllPosts()
      .then((res) => {
        console.log(res.data.posts);
        setPosts(res.data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [change]);

  return (
    <div className="relative flex justify-center mx-2 mt-20 ipad:justify-between ">
      <ShortCuts />

      <div className="flex flex-col items-center gap-y-2">
        <div className="flex flex-initial  sm:w-[600px] px-2">
          <Story />
        </div>
        <div className="shrink-[9999] w-full sm:w-[500px] lg:w-[590px] mt-4">
          <Card>
            <AddNewPost />
          </Card>
          {posts.map((post) => (
            <Card key={post.id}>
              <Post
                avatarURL={post.user.userDetail.avatarUrl}
                createdAt={post.createdAt as Date}
                fullName={post.user.firstName + " " + post.user.lastName}
                id={post.id as number}
                image={post.imageUrl !== "" ? post.imageUrl : null}
                text={post.content}
              />
            </Card>
          ))}
          <div className="h-[1000px]"></div>
        </div>
      </div>

      <Contacts />
    </div>
  );
}
