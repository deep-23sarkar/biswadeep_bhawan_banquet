"use client";

import { useEffect, useMemo, useState } from "react";
import { MessageCircle, Send, UserCircle2 } from "lucide-react";
import { commentServices, fetchAllComments } from "@/services/CommentService";
import toast from "react-hot-toast";

interface Comment {
  id: number;
  name: string;
  text: string;
  createdAt: string;
}

// const starterComments: Comment[] = [
//   {
//     id: 1,
//     name: "Aarav Mehta",
//     avatar: "",
//     text: "The venue looked absolutely beautiful for our engagement. Every detail felt thoughtful.",
//     time: "2 days ago",
//   },
//   {
//     id: 2,
//     name: "Priya Shah",
//     avatar: "",
//     text: "Wonderful hospitality and a stunning setup. Our family is still talking about the evening.",
//     time: "5 days ago",
//   },
//   {
//     id: 3,
//     name: "Rohan Kapoor",
//     avatar: "",
//     text: "The team made planning our birthday celebration effortless. Highly recommended!",
//     time: "1 week ago",
//   },
// ];

function Avatar({ name, src }: { name: string; src: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return src ? (
    <img
      src={src}
      alt={`${name}'s profile`}
      className="h-11 w-11 rounded-full object-cover ring-2 ring-background"
    />
  ) : (
    <div
      aria-label={`${name}'s profile`}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--blush-dark)] text-sm font-semibold text-white ring-2 ring-background"
    >
      {initials || <UserCircle2 className="h-5 w-5" />}
    </div>
  );
}

export function Comments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [commentCount, setCommentCount] = useState(0);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    if (!formdata.get("name") || !formdata.get("text")) {
      setError("Please add your name and a comment.");
      return;
    }
    const name = formdata.get("name");
    const text = formdata.get("text");

    try {
      const uploadComments = await commentServices({
        name: name as string,
        text: text as string,
      });
      console.log("Submitted: ", uploadComments);
      toast.success("Thanks for your valuable comment!");
    } catch (error) {
      console.log("Error: ", error);
    }

    setName("");
    setAvatar("");
    setText("");
    setError("");
  }

  useEffect(() => {
      try {
        const fetchComments = async () => {
          const comments = await fetchAllComments();
          setComments(comments);
          setCommentCount(comments.length());
          console.log(comments)
        };
        fetchComments();
      } catch (error) {
        console.log(error);
      }
    }, []);


  return (
    <section
      id="comments"
      className="relative overflow-hidden bg-cream px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
            Guestbook
          </p>
          <h2 className="font-serif text-4xl text-foreground sm:text-5xl">
            Share your experience
          </h2>
          <p className="mt-4 text-muted-foreground">
            A little love from our celebration community.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-(--gold-light)/40 bg-background/80 p-6 shadow-[0_18px_50px_rgba(143,104,45,0.1)] backdrop-blur sm:p-8"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blush text-gold-dark">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-serif text-2xl">Leave a comment</h3>
                <p className="text-sm text-muted-foreground">
                  Tell future guests what you loved.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium">
                Your name
                <input
                  id="name"
                  name="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="e.g. Ananya Rao"
                  className="mt-2 h-11 w-full rounded-xl border border-border bg-background px-4 outline-none transition focus:border-gold focus:ring-2 focus:ring-(--gold)/20"
                />
              </label>
              <label className="block text-sm font-medium">
                Your comment
                <textarea
                  id="text"
                  name="text"
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  placeholder="Share a note about your celebration..."
                  rows={4}
                  className="mt-2 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-gold focus:ring-2 focus:ring-(--gold)/20"
                />
              </label>
              {error && (
                <p role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-gold-dark px-5 text-sm font-semibold text-white transition hover:bg-gold focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
              >
                <Send className="h-4 w-4" />
                Post comment
              </button>
            </div>
          </form>

          <div aria-live="polite" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl">What guests are saying</h3>
              <span className="rounded-full bg-blush px-3 py-1 text-xs font-semibold text-gold-dark">
                {commentCount} comments
              </span>
            </div>
            {comments.map((comment) => (
              <article
                key={comment.id}
                className="rounded-2xl border border-border/70 bg-background/75 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex gap-3">
                  <Avatar name={comment.name} src={avatar} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="font-semibold">{comment.name}</h4>
                      <time className="text-xs text-muted-foreground">
                        {comment.createdAt}
                      </time>
                    </div>
                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      {comment.text}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Comments;
