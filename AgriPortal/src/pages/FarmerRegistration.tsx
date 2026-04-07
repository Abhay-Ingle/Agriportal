import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Leaf, User, MapPin, Crop, Home, Phone, Mail } from "lucide-react";

export default function FarmerRegistration() {
  const [step, setStep] = useState(1); // 1: Basic, 2: Farm Details, 3: Review
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Basic Information
  const [basicInfo, setBasicInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
  });

  // Address Information
  const [addressInfo, setAddressInfo] = useState({
    address: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
  });

  // Farm Information
  const [farmInfo, setFarmInfo] = useState({
    totalLandArea: "",
    irrigatedArea: "",
    rainFedArea: "",
    soilType: "",
    crops: "",
    farmingMethod: "",
  });

  const handleBasicInfoChange = (field: string, value: string) => {
    setBasicInfo({ ...basicInfo, [field]: value });
  };

  const handleAddressChange = (field: string, value: string) => {
    setAddressInfo({ ...addressInfo, [field]: value });
  };

  const handleFarmChange = (field: string, value: string) => {
    setFarmInfo({ ...farmInfo, [field]: value });
  };

  const validateStep1 = () => {
    if (
      !basicInfo.firstName ||
      !basicInfo.lastName ||
      !basicInfo.email ||
      !basicInfo.phone ||
      !basicInfo.dateOfBirth ||
      !basicInfo.gender
    ) {
      toast({
        title: "Missing Information ❌",
        description: "Please fill all basic details",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (
      !addressInfo.address ||
      !addressInfo.city ||
      !addressInfo.district ||
      !addressInfo.state ||
      !addressInfo.pincode
    ) {
      toast({
        title: "Missing Information ❌",
        description: "Please fill all address details",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const farmerData = {
        basicInfo,
        addressInfo,
        farmInfo,
        registeredAt: new Date().toISOString(),
      };

      // Store in localStorage for demo (in production, send to backend)
      localStorage.setItem("farmerProfile", JSON.stringify(farmerData));

      toast({
        title: "Registration Complete ✅",
        description: "Your farmer profile has been created successfully",
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast({
        title: "Error ❌",
        description: "Failed to complete registration",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-background pt-24 pb-12">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center">
              <Leaf className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2">Farmer Registration</h1>
          <p className="text-muted-foreground">
            Join AgriPortal and access exclusive farming benefits
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= s
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      step > s ? "bg-primary" : "bg-muted"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Basic Info</span>
            <span>Farm Details</span>
            <span>Review</span>
          </div>
        </div>

        <Card className="border shadow-lg p-8">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <User className="w-6 h-6" />
                  Personal Information
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">
                    First Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    placeholder="Enter your first name"
                    value={basicInfo.firstName}
                    onChange={(e) =>
                      handleBasicInfoChange("firstName", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">
                    Last Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    placeholder="Enter your last name"
                    value={basicInfo.lastName}
                    onChange={(e) =>
                      handleBasicInfoChange("lastName", e.target.value)
                    }
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">
                  Email Address <span className="text-destructive">*</span>
                </label>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  value={basicInfo.email}
                  onChange={(e) =>
                    handleBasicInfoChange("email", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">
                  Phone Number <span className="text-destructive">*</span>
                </label>
                <Input
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={basicInfo.phone}
                  onChange={(e) =>
                    handleBasicInfoChange("phone", e.target.value)
                  }
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">
                    Date of Birth <span className="text-destructive">*</span>
                  </label>
                  <Input
                    type="date"
                    value={basicInfo.dateOfBirth}
                    onChange={(e) =>
                      handleBasicInfoChange("dateOfBirth", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">
                    Gender <span className="text-destructive">*</span>
                  </label>
                  <Select
                    value={basicInfo.gender}
                    onValueChange={(value) =>
                      handleBasicInfoChange("gender", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  variant="outline"
                  onClick={() => navigate("/")}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    if (validateStep1()) setStep(2);
                  }}
                  className="flex-1 gradient-primary border-0 text-primary-foreground"
                >
                  Next: Address Details
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Address & Farm Details */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <MapPin className="w-6 h-6" />
                  Address & Farm Information
                </h2>
              </div>

              {/* Address Section */}
              <div className="border-b pb-6">
                <h3 className="font-semibold mb-4">Address Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold mb-2 block">
                      Full Address <span className="text-destructive">*</span>
                    </label>
                    <Textarea
                      placeholder="Enter complete address"
                      value={addressInfo.address}
                      onChange={(e) =>
                        handleAddressChange("address", e.target.value)
                      }
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold mb-2 block">
                        City <span className="text-destructive">*</span>
                      </label>
                      <Input
                        placeholder="City name"
                        value={addressInfo.city}
                        onChange={(e) =>
                          handleAddressChange("city", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-2 block">
                        District <span className="text-destructive">*</span>
                      </label>
                      <Input
                        placeholder="District name"
                        value={addressInfo.district}
                        onChange={(e) =>
                          handleAddressChange("district", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold mb-2 block">
                        State <span className="text-destructive">*</span>
                      </label>
                      <Input
                        placeholder="State name"
                        value={addressInfo.state}
                        onChange={(e) =>
                          handleAddressChange("state", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-2 block">
                        Pincode <span className="text-destructive">*</span>
                      </label>
                      <Input
                        placeholder="6-digit pincode"
                        value={addressInfo.pincode}
                        onChange={(e) =>
                          handleAddressChange("pincode", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Farm Section */}
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Crop className="w-5 h-5" />
                  Farm Information (Optional)
                </h3>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold mb-2 block">
                        Total Land Area (acres)
                      </label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={farmInfo.totalLandArea}
                        onChange={(e) =>
                          handleFarmChange("totalLandArea", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-2 block">
                        Irrigated Area (acres)
                      </label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={farmInfo.irrigatedArea}
                        onChange={(e) =>
                          handleFarmChange("irrigatedArea", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold mb-2 block">
                        Rain-fed Area (acres)
                      </label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={farmInfo.rainFedArea}
                        onChange={(e) =>
                          handleFarmChange("rainFedArea", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-2 block">
                        Soil Type
                      </label>
                      <Select
                        value={farmInfo.soilType}
                        onValueChange={(value) =>
                          handleFarmChange("soilType", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select soil type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="loamy">Loamy</SelectItem>
                          <SelectItem value="sandy">Sandy</SelectItem>
                          <SelectItem value="clay">Clay</SelectItem>
                          <SelectItem value="silt">Silt</SelectItem>
                          <SelectItem value="mixed">Mixed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-2 block">
                      Crops Grown
                    </label>
                    <Input
                      placeholder="e.g., Rice, Wheat, Cotton"
                      value={farmInfo.crops}
                      onChange={(e) =>
                        handleFarmChange("crops", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-2 block">
                      Farming Method
                    </label>
                    <Select
                      value={farmInfo.farmingMethod}
                      onValueChange={(value) =>
                        handleFarmChange("farmingMethod", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select farming method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="traditional">Traditional</SelectItem>
                        <SelectItem value="organic">Organic</SelectItem>
                        <SelectItem value="precision">Precision Farming</SelectItem>
                        <SelectItem value="mixed">Mixed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={() => {
                    if (validateStep2()) setStep(3);
                  }}
                  className="flex-1 gradient-primary border-0 text-primary-foreground"
                >
                  Review & Submit
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Review Your Information</h2>

              {/* Basic Info Review */}
              <div className="bg-muted/30 p-4 rounded-lg border">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Name</p>
                    <p className="font-semibold">
                      {basicInfo.firstName} {basicInfo.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-semibold">{basicInfo.email}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Phone</p>
                    <p className="font-semibold">{basicInfo.phone}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Date of Birth</p>
                    <p className="font-semibold">{basicInfo.dateOfBirth}</p>
                  </div>
                </div>
              </div>

              {/* Address Review */}
              <div className="bg-muted/30 p-4 rounded-lg border">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Address Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="md:col-span-2">
                    <p className="text-muted-foreground">Address</p>
                    <p className="font-semibold">{addressInfo.address}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">City</p>
                    <p className="font-semibold">{addressInfo.city}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">District</p>
                    <p className="font-semibold">{addressInfo.district}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">State</p>
                    <p className="font-semibold">{addressInfo.state}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Pincode</p>
                    <p className="font-semibold">{addressInfo.pincode}</p>
                  </div>
                </div>
              </div>

              {/* Farm Info Review */}
              {farmInfo.totalLandArea && (
                <div className="bg-muted/30 p-4 rounded-lg border">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Crop className="w-5 h-5" />
                    Farm Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    {farmInfo.totalLandArea && (
                      <div>
                        <p className="text-muted-foreground">Total Land Area</p>
                        <p className="font-semibold">{farmInfo.totalLandArea} acres</p>
                      </div>
                    )}
                    {farmInfo.crops && (
                      <div>
                        <p className="text-muted-foreground">Crops</p>
                        <p className="font-semibold">{farmInfo.crops}</p>
                      </div>
                    )}
                    {farmInfo.soilType && (
                      <div>
                        <p className="text-muted-foreground">Soil Type</p>
                        <p className="font-semibold">{farmInfo.soilType}</p>
                      </div>
                    )}
                    {farmInfo.farmingMethod && (
                      <div>
                        <p className="text-muted-foreground">Farming Method</p>
                        <p className="font-semibold">{farmInfo.farmingMethod}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  ℹ️ By clicking Submit, you agree to our Terms of Service and Privacy
                  Policy. Your information will be securely stored.
                </p>
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 gradient-primary border-0 text-primary-foreground"
                >
                  {loading ? "Submitting..." : "✓ Complete Registration"}
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Terms Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            Already registered?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-primary font-semibold hover:underline"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
