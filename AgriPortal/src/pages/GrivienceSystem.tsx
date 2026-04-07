import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Upload, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export default function GrievanceSystem() {
  const [title, setTitle] = useState("");
  const [mobile, setMobile] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [trackId, setTrackId] = useState("");
  const [trackedGrievance, setTrackedGrievance] = useState<any>(null);

  const navigate = useNavigate();
  const { toast } = useToast();

  const token = localStorage.getItem("token");

  // Handle image selection with compression
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast({
          title: "File Too Large ❌",
          description: "Image size must be less than 5MB",
          variant: "destructive",
        });
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid File Type ❌",
          description: "Please select a valid image file",
          variant: "destructive",
        });
        return;
      }

      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        // Validate that the image data was read correctly
        if (result && result.length > 0) {
          setImagePreview(result);
          console.log("Image loaded successfully, size:", result.length);
        } else {
          toast({
            title: "Error Loading Image ❌",
            description: "Failed to read image file",
            variant: "destructive",
          });
        }
      };
      reader.onerror = () => {
        toast({
          title: "Error Loading Image ❌",
          description: "Failed to read image file",
          variant: "destructive",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // =============================
  // SUBMIT GRIEVANCE
  // =============================
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!token) {
      navigate("/login");
      return;
    }

    // Validation
    if (!mobile || !category || !description) {
      toast({
        title: "Validation Error ❌",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    // Image validation - optional but if selected must load properly
    if (image && !imagePreview) {
      toast({
        title: "Image Error ❌",
        description: "Image failed to load. Please try again.",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("title", category);
    formData.append("description", description);
    formData.append("mobile", mobile);
    if (imagePreview) {
      formData.append("image", imagePreview);
    }

    try {
      const payload = {
        title: category,
        description,
        mobile,
        image: imagePreview || null,
      };

      console.log("Submitting grievance with image size:", imagePreview ? imagePreview.length : "no image");

      const res = await fetch(
        "http://localhost:5000/api/griviences",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (res.ok) {
        const grievanceId = data._id ? data._id.slice(0, 8).toUpperCase() : "GRV";
        
        console.log("Grievance submitted successfully:", grievanceId);
        
        toast({
          title: "Grievance Submitted ✅",
          description: `Your ID: ${grievanceId}. Check your profile for updates.`,
        });

        // Reset form
        setTitle("");
        setMobile("");
        setCategory("");
        setDescription("");
        setImage(null);
        setImagePreview("");
        setTrackId("");
        setTrackedGrievance(null);

        // Wait 1.5 seconds then navigate to profile
        setTimeout(() => {
          navigate("/profile");
        }, 1500);
      } else {
        console.error("Submission error:", data);
        toast({
          title: "Error ❌",
          description: data.message || "Failed to submit grievance",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Network error:", error);
      toast({
        title: "Network Error ❌",
        description: "Failed to submit. Check your connection.",
        variant: "destructive",
      });
    }
  };

  // =============================
  // TRACK GRIEVANCE
  // =============================
  const handleTrack = async () => {
    if (!trackId.trim()) {
      toast({
        title: "Error ❌",
        description: "Please enter a grievance ID",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/griviences/${trackId}`
      );

      const data = await res.json();

      if (res.ok) {
        setTrackedGrievance(data);
        toast({
          title: "Found ✅",
          description: "Grievance details loaded successfully",
        });
      } else {
        toast({
          title: "Not Found ❌",
          description: data.message || "Invalid grievance ID",
          variant: "destructive",
        });
        setTrackedGrievance(null);
      }
    } catch (error) {
      toast({
        title: "Error ❌",
        description: "Failed to fetch grievance details",
        variant: "destructive",
      });
      setTrackedGrievance(null);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 px-4">
      <div className="container mx-auto max-w-6xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="w-16 h-16 mx-auto rounded-xl gradient-primary flex items-center justify-center mb-6">
            <ShieldCheck className="w-8 h-8 text-primary-foreground" />
          </div>

          <h1 className="text-4xl font-bold mb-4">
            Grievance System
          </h1>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            Submit, track, and manage complaints with transparency.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Complaint Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-card border rounded-2xl p-8 shadow-sm"
          >
            <h2 className="text-2xl font-semibold mb-6">
              Submit a Complaint
            </h2>

            <div className="space-y-4">

              <Input
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />

              <Input
                placeholder="Grievance Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />

              <Textarea
                placeholder="Describe your issue..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />

              {/* Image Upload */}
              <div className="border-2 border-dashed border-primary rounded-lg p-4 cursor-pointer hover:bg-primary/5">
                <label className="flex flex-col items-center gap-2 cursor-pointer">
                  <Upload className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    {image ? image.name : "Click to upload image"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="relative w-full h-32 rounded-lg overflow-hidden">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setImagePreview("");
                    }}
                    className="absolute top-1 right-1 bg-destructive text-white px-2 py-1 rounded text-xs"
                  >
                    Remove
                  </button>
                </div>
              )}

              <Button
                type="submit"
                className="w-full gradient-primary border-0 text-primary-foreground"
              >
                Submit Grievance
              </Button>
            </div>
          </form>

          {/* Tracking Section */}
          <div className="space-y-8">

            <div className="bg-card border rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">
                Track Complaint
              </h2>

              <div className="flex gap-3">
                <Input
                  placeholder="Enter Grievance ID (e.g., ABC123D4)"
                  value={trackId}
                  onChange={(e) => setTrackId(e.target.value.toUpperCase())}
                />
                <Button variant="outline" onClick={handleTrack}>
                  Track
                </Button>
              </div>

              {trackedGrievance && (
                <div className="mt-8 p-6 bg-muted rounded-lg border space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">Grievance ID</p>
                      <p className="font-mono font-bold text-lg">{trackedGrievance._id.slice(0, 8).toUpperCase()}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                      trackedGrievance.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                      trackedGrievance.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                      "bg-green-100 text-green-800"
                    }`}>
                      {trackedGrievance.status}
                    </span>
                  </div>

                  <hr />

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Category</p>
                      <p className="font-medium">{trackedGrievance.title}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Description</p>
                      <p className="font-medium text-sm">{trackedGrievance.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Mobile</p>
                        <p className="font-medium">{trackedGrievance.mobile}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Submitted</p>
                        <p className="font-medium text-sm">
                          {new Date(trackedGrievance.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {trackedGrievance.adminNotes && (
                      <div>
                        <p className="text-sm text-muted-foreground">Admin Notes</p>
                        <p className="font-medium text-sm bg-primary/10 p-2 rounded">
                          {trackedGrievance.adminNotes}
                        </p>
                      </div>
                    )}

                    {trackedGrievance.image && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Attached Image</p>
                        <img 
                          src={trackedGrievance.image} 
                          alt="Grievance attachment" 
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setTrackedGrievance(null)}
                    className="w-full mt-4 text-sm text-muted-foreground hover:text-foreground"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}