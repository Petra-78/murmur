import { formatDate } from "../../utils/dateFormatter";
import LikeButton from "../buttons/LikeButton";
import CommentButton from "../buttons/CommentButton";
import { Link } from "react-router";
import Loading from "../Loading";

export default function PostCards({ posts, loading }) {
  debugger;
  if (!posts || posts.length === 0)
    return <p className="dark:text-white">No posts yet.</p>;
  if (loading) return <Loading />;
  return (
    <>
      {posts &&
        posts.map((post) => (
          <div
            key={post.id}
            className="relative my-4 flex w-full max-w-2xl cursor-pointer flex-col gap-3 rounded-2xl bg-white/90 p-4 shadow-lg shadow-red-800/20 transition-all duration-300 hover:shadow-2xl dark:bg-[#040303]/90"
          >
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Link
                to={`/users/${post.author.username}`}
                className="flex items-center gap-2"
              >
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={post.author.profileUrl || "/placeholder.jpeg"}
                  alt="profile"
                />
                <p className="font-semibold hover:font-extrabold hover:text-gray-400">
                  {post.author.username}
                </p>
              </Link>

              <span>·</span>

              <span className="text-xs">
                {formatDate(post.createdAt)}
              </span>
            </div>

            <Link
              to={`/posts/${post.id}`}
              className="w-full max-w-2xl"
            >
              <div className="flex flex-col gap-2">
                {post.content && (
                  <p className="px-2 text-left text-lg text-gray-800 dark:text-gray-100">
                    {post.content}
                  </p>
                )}
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt="post"
                    className="block max-h-125 max-w-full rounded-xl object-cover"
                  />
                )}
              </div>
            </Link>

            <div className="mt-2 flex items-center gap-3">
              <LikeButton
                type="post"
                id={post.id}
                likes={post._count.likes}
                isLiked={post.likes.length > 0}
              />
              <CommentButton comments={post._count.comments} />
            </div>
          </div>
        ))}
    </>
  );
}
