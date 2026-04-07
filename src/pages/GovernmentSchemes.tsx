import { useState, useEffect } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ExternalLink,
  Search,
  Filter,
  Award,
  Zap,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";

interface Scheme {
  _id?: string;
  id: string;
  name: string;
  category: string;
  description: string;
  benefits: string[];
  eligibility: string[];
  ministry: string;
  launchYear: number;
  targetBenefit: string;
  applicationMethod: string;
  officialWebsite: string;
}

export default function GovernmentSchemes() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedScheme, setExpandedScheme] = useState<string | null>(null);

  // Fetch schemes from backend API
  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("http://localhost:5000/api/schemes");
        if (!response.ok) {
          throw new Error("Failed to fetch schemes");
        }
        const data = await response.json();
        setSchemes(data.data || []);
      } catch (err) {
        console.error("Error fetching schemes:", err);
        setError("Unable to load schemes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, []);

  const getSchemeColor = (category: string): string => {
    const colors: { [key: string]: string } = {
      "financial-support": "bg-blue-50 border-blue-200",
      "crop-insurance": "bg-green-50 border-green-200",
      "renewable-energy": "bg-yellow-50 border-yellow-200",
      "technology-adoption": "bg-purple-50 border-purple-200",
      "soil-management": "bg-orange-50 border-orange-200",
      "organic-farming": "bg-emerald-50 border-emerald-200",
      "infrastructure": "bg-indigo-50 border-indigo-200",
      "price-support": "bg-rose-50 border-rose-200",
    };
    return colors[category] || "bg-gray-50 border-gray-200";
  };

  const categories = [
    { value: "all", label: "All Schemes" },
    { value: "financial-support", label: "💰 Financial Support" },
    { value: "crop-insurance", label: "🛡️ Crop Insurance" },
    { value: "renewable-energy", label: "⚡ Renewable Energy" },
    { value: "technology-adoption", label: "🔧 Technology" },
    { value: "soil-management", label: "🌱 Soil Management" },
    { value: "organic-farming", label: "🌿 Organic Farming" },
    { value: "infrastructure", label: "🏗️ Infrastructure" },
    { value: "price-support", label: "📊 Price Support" },
  ];

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch =
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || scheme.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "financial-support":
        return "💰";
      case "crop-insurance":
        return "🛡️";
      case "renewable-energy":
        return "⚡";
      case "technology-adoption":
        return "🔧";
      case "soil-management":
        return "🌱";
      case "organic-farming":
        return "🌿";
      case "infrastructure":
        return "🏗️";
      case "price-support":
        return "📊";
      default:
        return "📋";
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center">
              <Award className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Government Schemes for Farmers</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore real-time government schemes fetched from official websites to support
            farmers with financial assistance, crop insurance, technology adoption, and more.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <Card className="p-12 text-center mb-8">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <p className="text-muted-foreground">Loading government schemes...</p>
            </div>
          </Card>
        )}

        {/* Error State */}
        {error && (
          <Card className="p-6 mb-8 bg-red-50 border-red-200">
            <div className="flex gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-red-900 mb-1">Error Loading Schemes</h3>
                <p className="text-red-800">{error}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Content */}
        {!loading && !error && (
          <>
            {/* Search and Filter */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search schemes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-muted-foreground" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results Info */}
            <div className="mb-6 text-sm text-muted-foreground">
              Showing {filteredSchemes.length} of {schemes.length} schemes
            </div>

            {/* Schemes Grid */}
            <div className="grid gap-6 mb-12">
              {filteredSchemes.length > 0 ? (
                filteredSchemes.map((scheme) => (
                  <Card
                    key={scheme.id}
                    className={`border overflow-hidden hover:shadow-lg transition-all ${getSchemeColor(
                      scheme.category
                    )}`}
                  >
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="text-3xl">
                            {getCategoryIcon(scheme.category)}
                          </div>
                          <div className="flex-1">
                            <h2 className="text-2xl font-bold mb-2">
                              {scheme.name}
                            </h2>
                            <p className="text-muted-foreground mb-3">
                              {scheme.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              <Badge variant="secondary">
                                {scheme.ministry}
                              </Badge>
                              <Badge variant="outline">
                                Launched: {scheme.launchYear}
                              </Badge>
                              <Badge variant="outline">
                                Target: {scheme.targetBenefit}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="lg"
                          onClick={() =>
                            setExpandedScheme(
                              expandedScheme === scheme.id ? null : scheme.id
                            )
                          }
                        >
                          {expandedScheme === scheme.id ? "−" : "+"}
                        </Button>
                      </div>

                      {/* Expanded Content */}
                      {expandedScheme === scheme.id && (
                        <div className="border-t pt-6 space-y-6">
                          {/* Benefits */}
                          <div>
                            <h3 className="font-bold mb-3 flex items-center gap-2">
                              <Zap className="w-5 h-5 text-primary" />
                              Key Benefits
                            </h3>
                            <ul className="space-y-2">
                              {scheme.benefits.map((benefit, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2 text-sm"
                                >
                                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                                  <span>{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Eligibility */}
                          <div>
                            <h3 className="font-bold mb-3 flex items-center gap-2">
                              <Award className="w-5 h-5 text-primary" />
                              Eligibility Criteria
                            </h3>
                            <ul className="space-y-2">
                              {scheme.eligibility.map((elg, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2 text-sm"
                                >
                                  <CheckCircle2 className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                                  <span>{elg}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Application Info */}
                          <div className="bg-muted/50 p-4 rounded-lg">
                            <h3 className="font-bold mb-2">How to Apply</h3>
                            <p className="text-sm text-muted-foreground mb-3">
                              {scheme.applicationMethod}
                            </p>
                            <a
                              href={scheme.officialWebsite}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-primary hover:underline font-semibold"
                            >
                              Visit Official Website
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    No schemes found matching your search criteria
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                </Card>
              )}
            </div>

            {/* Info Banner */}
            <Card className="mb-8 p-8 bg-blue-50 border-blue-200">
              <div className="flex gap-4">
                <div className="text-3xl">ℹ️</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">
                    How to Use This Information
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>
                      • <strong>Click on each scheme</strong> to expand and see
                      full details
                    </li>
                    <li>
                      • <strong>Use the search bar</strong> to find schemes by
                      name or keywords
                    </li>
                    <li>
                      • <strong>Filter by category</strong> to find schemes
                      relevant to your needs
                    </li>
                    <li>
                      • <strong>Visit official websites</strong> for the latest
                      updates and to apply online
                    </li>
                    <li>
                      • <strong>Contact your local Agricultural Office</strong>{" "}
                      for personalized guidance
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Contact Info */}
            <Card className="p-8 bg-gradient-to-r from-green-50 to-green-100 border-green-200">
              <h3 className="font-bold text-lg mb-4">Need Help?</h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div>
                  <p className="font-semibold mb-1">Ministry of Agriculture</p>
                  <p className="text-muted-foreground">agriculture.gov.in</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">
                    State Agricultural Departments
                  </p>
                  <p className="text-muted-foreground">
                    Contact your local agricultural office
                  </p>
                </div>
                <div>
                  <p className="font-semibold mb-1">AgriPortal Support</p>
                  <p className="text-muted-foreground">
                    support@agriportal.com
                  </p>
                </div>
              </div>
            </Card>
          </>
        )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
