import { useState } from "react";
import { useParams } from "react-router-dom";
import { 
  Plus, 
  Trash2, 
  Award, 
  GripVertical, 
  AlertCircle, 
  Users 
} from "lucide-react";
import PageHeader from "../../components/PageHeader.jsx";
import { useElection } from "../../context/ElectionContext.jsx";

export default function ElectionPosts() {
  const { electionId } = useParams();
  const { posts, setPosts } = useElection();
  const [newPost, setNewPost] = useState("");
  const [error, setError] = useState("");

  function addPost(e) {
    e.preventDefault();
    if (!newPost.trim()) {
        setError("Post name cannot be empty.");
        return;
    }
    // Prevent duplicates
    if (posts.some(p => p.name.toLowerCase() === newPost.trim().toLowerCase())) {
        setError("This post already exists.");
        return;
    }

    setPosts((prev) => [
      ...prev,
      { id: `p-${Date.now()}`, name: newPost.trim(), seats: 1 },
    ]);
    setNewPost("");
    setError("");
  }

  function deletePost(id) {
    if(window.confirm("Are you sure? This will remove the post from the ballot.")) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
    }
  }

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <PageHeader
        title="Election Positions"
        subtitle={`Define the posts available for Election ID: ${electionId}`}
      />

      <div className="mt-6 grid gap-8 md:grid-cols-12">
        
        {/* LEFT COLUMN: Input Form */}
        <div className="md:col-span-5">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 sticky top-6">
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                        <Plus size={20} />
                    </div>
                    <h3 className="font-semibold text-slate-800">Create Position</h3>
                </div>
                
                <form onSubmit={addPost} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Post Title
                        </label>
                        <input
                            placeholder="e.g. General Secretary"
                            value={newPost}
                            onChange={(e) => {
                                setNewPost(e.target.value);
                                setError("");
                            }}
                            className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none transition-all
                                ${error 
                                    ? "border-red-300 focus:ring-2 focus:ring-red-100 bg-red-50" 
                                    : "border-slate-300 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
                                }
                            `}
                        />
                        {error && (
                            <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                                <AlertCircle size={12} /> {error}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
                    >
                        Add Position
                    </button>
                    
                    <p className="text-xs text-slate-500 text-center pt-2 border-t border-slate-100">
                        Posts will appear on the ballot in the order listed.
                    </p>
                </form>
            </div>
        </div>

        {/* RIGHT COLUMN: Managed List */}
        <div className="md:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-2">
                 <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                    Active Posts 
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs">
                        {posts.length}
                    </span>
                 </h3>
            </div>

            {posts.length === 0 ? (
                <EmptyState />
            ) : (
                <div className="space-y-3">
                    {posts.map((post, index) => (
                        <div 
                            key={post.id} 
                            className="group flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-all"
                        >
                            <div className="flex items-center gap-4">
                                {/* Drag Handle (Visual Only) */}
                                <div className="text-slate-300 cursor-grab hover:text-slate-500">
                                    <GripVertical size={18} />
                                </div>
                                
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600">
                                    <Award size={20} />
                                </div>
                                
                                <div>
                                    <h4 className="font-medium text-slate-900">{post.name}</h4>
                                    <p className="text-xs text-slate-500">
                                        Single Seat • Open to all
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => deletePost(post.id)}
                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete Post"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </div>
    </div>
  );
}

// Visual component for when the list is empty
function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-center">
            <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                <Users size={24} className="text-slate-400" />
            </div>
            <h4 className="text-slate-900 font-medium mb-1">No positions defined yet</h4>
            <p className="text-sm text-slate-500 max-w-xs">
                Add positions like "President" or "Secretary" to begin setting up the ballot.
            </p>
        </div>
    );
}