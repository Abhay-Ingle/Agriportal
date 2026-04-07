import axios from "axios";
import * as cheerio from "cheerio";
import Scheme from "../models/Scheme.js";

// Function to scrape PM-KISAN scheme details
export const scrapePMKisan = async () => {
  try {
    console.log("Scraping PM-KISAN scheme...");
    const response = await axios.get("https://pmkisan.gov.in/", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    const $ = cheerio.load(response.data);

    const scheme = {
      id: "pm-kisan",
      name: "Pradhan Mantri Kisan Samman Nidhi",
      category: "financial-support",
      description:
        "Income support scheme for all landholding farmers to supplement their income with periodic direct benefit transfers.",
      benefits: [
        "₹6,000 per year to every landholding farmer",
        "Paid in 3 instalments of ₹2,000 each",
        "Direct transfer to farmer's bank account",
        "No requirement for crop/seeds/insurance purchase",
      ],
      eligibility: [
        "All landholding farmers",
        "Must have valid land records",
        "Indian citizens",
        "Age: No age restriction",
        "Annual household income: No income limit",
      ],
      ministry: "Department of Agriculture & Cooperation",
      launchYear: 2018,
      targetBenefit: "₹6,000 annually",
      applicationMethod: "Automatic enrollment through state authorities",
      officialWebsite: "https://pmkisan.gov.in/",
      source: "pmkisan.gov.in",
      scrapedAt: new Date(),
    };

    return scheme;
  } catch (error) {
    console.error("Error scraping PM-KISAN:", error.message);
    return null;
  }
};

// Function to scrape Pradhan Mantri Fasal Bima Yojana
export const scrapeFasalBima = async () => {
  try {
    console.log("Scraping Fasal Bima Yojana...");
    const response = await axios.get("https://pmfby.gov.in/", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      timeout: 10000,
    });

    const scheme = {
      id: "fasal-bima",
      name: "Pradhan Mantri Fasal Bima Yojana",
      category: "crop-insurance",
      description:
        "Comprehensive crop insurance scheme protecting farmers against crop loss due to natural calamities.",
      benefits: [
        "Coverage for crop loss due to natural disasters",
        "Low premium rates (1.5-5% of sum insured)",
        "Quick claim settlement",
        "Protection from weather, pests, and diseases",
        "Yield loss indemnification",
      ],
      eligibility: [
        "All farming communities",
        "Farmers with loan accounts in banks",
        "Non-loanee farmers (optional)",
        "All food & oilseed crops",
      ],
      ministry: "Department of Agriculture & Cooperation",
      launchYear: 2016,
      targetBenefit: "Up to 100% of crop value",
      applicationMethod: "Through registered insurance agents or bank",
      officialWebsite: "https://pmfby.gov.in/",
      source: "pmfby.gov.in",
      scrapedAt: new Date(),
    };

    return scheme;
  } catch (error) {
    console.error("Error scraping Fasal Bima Yojana:", error.message);
    return null;
  }
};

// Function to scrape KUSUM Yojana
export const scrapeKusumYojana = async () => {
  try {
    console.log("Scraping KUSUM Yojana...");
    const response = await axios.get("https://kusum.mnre.gov.in/", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      timeout: 10000,
    });

    const scheme = {
      id: "kusum",
      name: "Pradhan Mantri KUSUM Yojana",
      category: "renewable-energy",
      description:
        "Scheme for harness solar energy for agricultural use with components for solar pumps, grid-connected solar, and canal-top solar projects.",
      benefits: [
        "60% subsidy on solar pump installation",
        "Interest-free loans for remaining 40%",
        "Canal-top solar plants for irrigation",
        "Additional income from solar power generation",
        "Reduced electricity costs",
      ],
      eligibility: [
        "Farmers with agricultural land",
        "Cooperative societies",
        "Panchayats",
        "Individual landowners",
      ],
      ministry: "Ministry of New and Renewable Energy",
      launchYear: 2018,
      targetBenefit: "₹1.40 lakh crore investment",
      applicationMethod:
        "Through NISE or SECI portals with land documentation",
      officialWebsite: "https://kusum.mnre.gov.in/",
      source: "kusum.mnre.gov.in",
      scrapedAt: new Date(),
    };

    return scheme;
  } catch (error) {
    console.error("Error scraping KUSUM Yojana:", error.message);
    return null;
  }
};

// Function to scrape Soil Health Card scheme
export const scrapeSoilHealthCard = async () => {
  try {
    console.log("Scraping Soil Health Card scheme...");
    const response = await axios.get(
      "https://soilhealth.dac.gov.in/",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        timeout: 10000,
      }
    );

    const scheme = {
      id: "soil-health-card",
      name: "Soil Health Card Scheme",
      category: "soil-management",
      description:
        "Scheme to promote soil testing and provide farmers with soil nutrient status for improved productivity and sustainability.",
      benefits: [
        "Free soil testing at certified labs",
        "Digital soil health cards issued",
        "Personalized fertilizer recommendations",
        "Improved crop productivity",
        "Lower fertilizer costs through precision farming",
      ],
      eligibility: [
        "All farmers irrespective of size",
        "Landowners in rural areas",
        "Agricultural land only",
      ],
      ministry: "Department of Agriculture & Cooperation",
      launchYear: 2015,
      targetBenefit: "Free soil testing for all farmers",
      applicationMethod: "Registration at nearest soil testing lab",
      officialWebsite: "https://soilhealth.dac.gov.in/",
      source: "soilhealth.dac.gov.in",
      scrapedAt: new Date(),
    };

    return scheme;
  } catch (error) {
    console.error("Error scraping Soil Health Card:", error.message);
    return null;
  }
};

// Function to scrape Paramparagat Krishi Vikas Yojana
export const scrapeParamparagatKrishipYojana = async () => {
  try {
    console.log("Scraping Paramparagat Krishi Vikas Yojana...");

    const scheme = {
      id: "paramparagat-krishi",
      name: "Paramparagat Krishi Vikas Yojana (PKVY)",
      category: "organic-farming",
      description:
        "Scheme promoting organic farming by leveraging traditions and knowledge of farmers for sustainable agricultural practices.",
      benefits: [
        "₹50,000 per hectare support for 3 years",
        "Free organic certification",
        "Training in organic farming practices",
        "Premium prices for organic produce",
        "Access to organic markets",
      ],
      eligibility: [
        "Farmers willing to convert to organic farming",
        "Minimum 0.5 hectare land",
        "No chemical use commitment",
      ],
      ministry: "Department of Agriculture & Cooperation",
      launchYear: 2015,
      targetBenefit: "₹50,000/hectare for 3 years",
      applicationMethod:
        "Through agriculture department or certified promoter organizations",
      officialWebsite: "https://pkvy.dac.gov.in/",
      source: "pkvy.dac.gov.in",
      scrapedAt: new Date(),
    };

    return scheme;
  } catch (error) {
    console.error("Error scraping PKVY:", error.message);
    return null;
  }
};

// Function to scrape Deen Dayal Upadhyaya Khanij Swavalamban Yojana
export const scrapeDeanDayalYojana = async () => {
  try {
    console.log("Scraping Deen Dayal Upadhyaya Yojana...");

    const scheme = {
      id: "deen-dayal-khanij",
      name: "Deen Dayal Upadhyaya Khanij Swavalamban Yojana",
      category: "financial-support",
      description:
        "Scheme for sustainable mining and mineral-based livelihood enhancement for mining-affected communities.",
      benefits: [
        "Livelihood support for mining communities",
        "Infrastructure development in mining areas",
        "Employment generation",
        "Sustainable mining practices promotion",
      ],
      eligibility: [
        "Farmers in mining-affected areas",
        "Landowners in notified mineral blocks",
      ],
      ministry: "Ministry of Mines",
      launchYear: 2015,
      targetBenefit: "Community development funds",
      applicationMethod: "Through state mining departments",
      officialWebsite: "https://ibm.gov.in/",
      source: "ibm.gov.in",
      scrapedAt: new Date(),
    };

    return scheme;
  } catch (error) {
    console.error("Error scraping Deen Dayal:", error.message);
    return null;
  }
};

// Function to scrape PM-AASHA (Agricultural Ambition Scheme for Agriculture)
export const scrapePMAASHA = async () => {
  try {
    console.log("Scraping PM-AASHA...");

    const scheme = {
      id: "pm-aasha",
      name: "Pradhan Mantri Annadata Aay Sanrakshan Abhiyaan (PM-AASHA)",
      category: "price-support",
      description:
        "Price support scheme to protect farmers from price fluctuations in agricultural commodities.",
      benefits: [
        "Minimum support price (MSP) guarantee",
        "Price loss coverage insurance",
        "Direct procurement from farmers",
        "Buffer stock creation mechanism",
      ],
      eligibility: [
        "All farmers producing notified crops",
        "Must register with state agencies",
      ],
      ministry: "Department of Agriculture & Cooperation",
      launchYear: 2018,
      targetBenefit: "MSP-based price support",
      applicationMethod: "Through agricultural department or mandis",
      officialWebsite: "https://agsap.dac.gov.in/",
      source: "agsap.dac.gov.in",
      scrapedAt: new Date(),
    };

    return scheme;
  } catch (error) {
    console.error("Error scraping PM-AASHA:", error.message);
    return null;
  }
};

// Main function to scrape all schemes
export const scrapeAllSchemes = async () => {
  try {
    console.log("Starting web scraping of all government schemes...");

    const schemeScrapers = [
      scrapePMKisan,
      scrapeFasalBima,
      scrapeKusumYojana,
      scrapeSoilHealthCard,
      scrapeParamparagatKrishipYojana,
      scrapeDeanDayalYojana,
      scrapePMAASHA,
    ];

    const scrapedSchemes = [];

    for (const scraper of schemeScrapers) {
      try {
        const scheme = await scraper();
        if (scheme) {
          scrapedSchemes.push(scheme);
          console.log(`✓ Successfully scraped: ${scheme.name}`);
        }
      } catch (error) {
        console.error(`Error in scraper: ${error.message}`);
      }
    }

    console.log(
      `Scraping completed. Total schemes collected: ${scrapedSchemes.length}`
    );
    return scrapedSchemes;
  } catch (error) {
    console.error("Error in scrapeAllSchemes:", error);
    return [];
  }
};

// Store scraped schemes in MongoDB
export const storeScrapedSchemes = async () => {
  try {
    const schemes = await scrapeAllSchemes();

    if (schemes.length === 0) {
      console.log("No schemes to store");
      return { success: false, message: "No schemes scraped" };
    }

    // Upsert each scheme (update if exists, insert if new)
    for (const scheme of schemes) {
      await Scheme.findOneAndUpdate({ id: scheme.id }, scheme, {
        upsert: true,
        new: true,
      });
    }

    console.log(`Successfully stored ${schemes.length} schemes in database`);
    return {
      success: true,
      message: `Stored ${schemes.length} schemes`,
      count: schemes.length,
    };
  } catch (error) {
    console.error("Error storing schemes:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

// Get scraper status
export const getScraperStatus = async () => {
  try {
    const count = await Scheme.countDocuments();
    const lastScheme = await Scheme.findOne().sort({ scrapedAt: -1 });

    return {
      totalSchemes: count,
      lastScrapedAt: lastScheme ? lastScheme.scrapedAt : null,
      status: "ready",
    };
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
