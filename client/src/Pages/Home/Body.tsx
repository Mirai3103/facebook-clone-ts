import React from 'react';
import Story from '../../Components/story';
import ShortCuts from './ShortCuts';
import Contacts from './Contacts';
import Card from '../../Components/NewFeed/Card';
import AddNewPost from '../../Components/NewFeed/AddNewPost';
import Post from '../../Components/Post';
import PostService, { IPost } from '../../Services/PostService';
import useAuth from '../../Hooks/useAuth';

export default function Body() {

    const [posts, setPosts] = React.useState<IPost[]>([]);
    const [change, setChange] = React.useState(false);
    const auth = useAuth();
    React.useEffect(() => {
        const handleHasNewPost = (data: IPost) => {
            setChange(pre => !pre)
        }
        auth.socket?.on('new-post-added', handleHasNewPost);
        return () => {
            auth.socket?.off('new-post-added', handleHasNewPost);
        }
    }, [auth.socket]);

    React.useEffect(() => {
        PostService.getAllPosts().then(res => {
            setPosts(res.data.posts);

        }
        ).catch(err => {
            console.log(err);
        }
        )
            ;
    }, [change]);

    return (
        <div className='flex justify-center relative mt-20 ipad:justify-between mx-2 '>
            <ShortCuts />

            <div className='flex flex-col gap-y-2 items-center'>
                <div className='flex flex-initial  sm:w-[600px] px-2'>
                    <Story />
                </div>
                <div className='shrink-[9999] w-full sm:w-[500px] lg:w-[590px] mt-4' >
                    <Card>
                        <AddNewPost />
                    </Card>
                    {posts.map(post =>
                        <Card key={post._id}>
                            <Post
                                avatarUrl={post.user.userDetail.avatarUrl}
                                createdAt={post.createdAt as Date}
                                fullName={post.user.firstName + " " + post.user.lastName}
                                _id={post._id as string}
                                image={post.imageUrl !== '' ? "https://drive.google.com/uc?export=view&id=" + post.imageUrl : null}
                                text={post.content}

                            />
                        </Card>)}
                    <div className='h-[1000px]'></div>


                </div>
            </div>

            <Contacts />


        </div>
    )
}