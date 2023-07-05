import React, { useState } from "react";
import Navbar from "../../components/navbar";
import Post from "../../components/post";

const Home = () => {
    const [posts, setPosts] = useState([
        {
            id: 1,
            userId: 1,
            userName: "John",
            userAvatar: "/abcd",
            minutesAgo: "30 min ago",
            caption: "My record work sample. Hope you like",
            imageUrl: "/img",
            isHeart: true,
            isComment: true,
            isShare: true,
            numberHeart: 436,
            numberComment: 195,
        },
        {
            id: 2,
            userId: 2,
            userName: "John",
            userAvatar: "/abcde",
            minutesAgo: "30 min ago",
            caption: "My record work sample. Hope you like",
            imageUrl: "/img",
            isHeart: false,
            isComment: true,
            isShare: true,
            numberHeart: 436,
            numberComment: 195,
        },
        {
            id: 3,
            userId: 3,
            userName: "John",
            userAvatar: "/abcde",
            minutesAgo: "30 min ago",
            caption: "My record work sample. Hope you like",
            imageUrl: "/img",
            isHeart: false,
            isComment: true,
            isShare: true,
            numberHeart: 436,
            numberComment: 195,
        },
    ]);
    return (
        <>
            <Navbar bgColor="main-content-gray">
                <h1>Home page</h1>
                {posts.map((post) => (
                    <Post
                        key={post.id}
                        id={post.id}
                        userId={post.userId}
                        userName={post.userName}
                        userAvatar={post.userAvatar}
                        minutesAgo={post.minutesAgo}
                        caption={post.caption}
                        imageUrl={post.imageUrl}
                        isHeart={post.isHeart}
                        isComment={post.isComment}
                        isShare={post.isShare}
                        numberHeart={post.numberHeart}
                        numberComment={post.numberComment}
                    />
                ))}
            </Navbar>
        </>
    );
};

export default Home;
