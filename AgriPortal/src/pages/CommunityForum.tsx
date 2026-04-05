import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, ThumbsUp, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Post {
  id: number;
  author: string;
  content: string;
  likes: number;
}

export default function CommunityForum() {

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "Farmer Rahul (Pune)",
      content: "Which fertilizer works best for wheat this season?",
      likes: 4,
    },
    {
      id: 2,
      author: "Farmer Meena (Nashik)",
      content: "Heavy heat expected. How are you managing irrigation?",
      likes: 6,
    },
  ]);

  const [newPost, setNewPost] = useState("");

  const addPost = () => {
    if (!newPost.trim()) return;

    const newEntry: Post = {
      id: posts.length + 1,
      author: "You",
      content: newPost,
      likes: 0,
    };

    setPosts([newEntry, ...posts]);
    setNewPost("");
  };

  const likePost = (id: number) => {
    setPosts(posts.map(post =>
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  return (
    <div className="min-h-screen bg-background pt-24 px-4">
      <div className="container mx-auto max-w-4xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 mx-auto rounded-xl gradient-primary flex items-center justify-center mb-6">
            <MessageSquare className="w-8 h-8 text-primary-foreground" />
          </div>

          <h1 className="text-4xl font-bold mb-4">Community Forum</h1>
          <p className="text-muted-foreground">
            Connect with fellow farmers, share knowledge, and grow together.
          </p>
        </motion.div>

        {/* Create Post */}
        <div className="bg-card border rounded-xl p-6 shadow-sm mb-10">
          <h2 className="text-lg font-semibold mb-4">Create a Post</h2>

          <Textarea
            placeholder="Ask a question or share advice..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />

          <Button
            onClick={addPost}
            className="mt-4 gradient-primary border-0 text-primary-foreground flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Post
          </Button>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border rounded-xl p-6 shadow-sm"
            >
              <p className="text-sm text-muted-foreground mb-2">
                {post.author}
              </p>

              <p className="mb-4">{post.content}</p>

              <Button
                variant="outline"
                size="sm"
                onClick={() => likePost(post.id)}
                className="flex items-center gap-2"
              >
                <ThumbsUp className="w-4 h-4" />
                {post.likes} Likes
              </Button>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
