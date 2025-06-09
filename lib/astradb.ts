import { DataAPIClient } from "@datastax/astra-db-ts";

// Define charity interface
export interface Charity {
  id: string;
  name: string;
  category: string;
  description: string;
  impact: string;
  location: string;
  imageUrl: string;
  slug?: string;
  longDescription?: string;
  goals?: string[];
  wallet?: string;
}

// Define donation interface
export interface Donation {
  id?: string;
  donor: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    isAnonymous: boolean;
  };
  charity: string;
  amount: number;
  currency: string;
  timestamp?: Date;
  status?: string;
  transactionHash?: string;
  message?: string;
  paymentMethod: string;
  createdAt?: string; // Add this for dashboard display
}

// Initialize the client
const token = process.env.ASTRA_DB_TOKEN || "mock-token";
const endpoint = process.env.ASTRA_DB_ENDPOINT || "mock-endpoint";

// Flag to determine if we're using real Astra DB or mock data
const isUsingRealDb = token !== "mock-token" && endpoint !== "mock-endpoint";

// Initialize the client if we have real credentials
let client: any;
let db: any;

if (isUsingRealDb) {
  try {
    client = new DataAPIClient(token);
    db = client.db(endpoint);
    console.log("AstraDB client initialized successfully");
  } catch (error) {
    console.error("Failed to initialize AstraDB client:", error);
  }
}

// Default charity data
const defaultCharities: Charity[] = [
  {
    id: "global-water-foundation",
    name: "Global Water Foundation",
    category: "Environment",
    description: "Providing clean water access to communities in need around the world.",
    impact: "50 wells built serving over 25,000 people",
    location: "East Africa",
    imageUrl: "/images/charities/global-water-foundation.jpg",
    longDescription: "The Global Water Foundation is dedicated to ensuring that every community has access to clean, safe water. We work with local partners to build sustainable water infrastructure, educate communities on water conservation and sanitation practices, and advocate for water as a basic human right. Our projects include well construction, rainwater harvesting systems, and water purification technologies.",
    goals: [
      "Provide clean water to 5 million people by 2030",
      "Implement water sanitation programs in 1000 communities",
      "Create sustainable water management systems in water-stressed regions"
    ],
    wallet: "0xA1B2c3D4e5F6g7H8i9J0k1L2m3N4o5P6q7R8s9"
  },
  {
    id: "education-for-all",
    name: "Education For All",
    category: "Education",
    description: "Supporting schools and educational programs in underserved communities.",
    impact: "15 schools supported, reaching 5,000 students",
    location: "Southeast Asia",
    imageUrl: "/images/charities/education-for-all.jpg",
    longDescription: "Education For All believes that every child deserves access to quality education regardless of their background or circumstances. We partner with local schools and communities to improve educational infrastructure, provide learning materials, train teachers, and offer scholarships to students in need. Our holistic approach addresses the various barriers to education, from physical access to quality of teaching.",
    goals: [
      "Build or renovate 500 schools in underserved areas",
      "Provide educational materials to 1 million students",
      "Train 10,000 teachers in modern teaching methods"
    ],
    wallet: "0xB2C3d4E5f6G7h8I9j0K1l2M3n4O5p6Q7r8S9"
  },
  {
    id: "childrens-health-fund",
    name: "Children's Health Fund",
    category: "Health",
    description: "Provides medical care and health services to children in need.",
    impact: "30,000 children received medical care",
    location: "Global",
    imageUrl: "/images/charities/childrens-health-fund.jpg",
    longDescription: "The Children's Health Fund is committed to ensuring that every child has access to comprehensive healthcare services. We operate mobile medical clinics, support pediatric facilities in underserved areas, provide vaccinations and preventive care, and offer specialized treatments for children with chronic conditions. Our team of dedicated healthcare professionals works tirelessly to improve children's health outcomes worldwide.",
    goals: [
      "Provide healthcare access to 1 million children by 2030",
      "Deploy 50 mobile medical clinics in remote areas",
      "Conduct health screenings and vaccinations for 2 million children"
    ],
    wallet: "0xC3D4e5F6g7H8i9J0k1L2m3N4o5P6q7R8s9T0"
  }
];

// Export the getCharity function to be used directly
export async function getCharity(id: string): Promise<Charity | null> {
  // If using mock data, return the default charity
  if (!isUsingRealDb) {
    const charity = defaultCharities.find(c => c.id === id);
    return charity || null;
  }
  return astraService.getCharityById(id);
}

// Export donation functions
export async function createDonation(donationData: Partial<Donation>): Promise<string | null> {
  // If using mock data, return a mock ID
  if (!isUsingRealDb) {
    console.log("Creating mock donation:", donationData);
    return "mock-donation-id-" + Date.now();
  }
  return astraService.createDonation(donationData);
}

export async function updateDonationStatus(id: string, status: string, transactionHash?: string): Promise<boolean> {
  // If using mock data, just return success
  if (!isUsingRealDb) {
    console.log(`Updating mock donation ${id} status to ${status}`);
    return true;
  }
  return astraService.updateDonationStatus(id, status, transactionHash);
}

// Export function to get donations by donor email
export async function getDonationsByDonorEmail(email: string): Promise<Donation[]> {
  // If using mock data, return mock donations
  if (!isUsingRealDb) {
    // Generate some sample donations for the demo
    const currentTime = new Date();
    return [
      {
        id: "mock-donation-" + Date.now(),
        donor: {
          firstName: "Anonymous",
          lastName: "Donor",
          email: email,
          phone: "",
          isAnonymous: true
        },
        charity: "global-water-foundation",
        amount: 5,
        currency: "USD",
        timestamp: currentTime,
        status: "completed",
        transactionHash: "0xfdd4df6b64ef7d24619ea0e7bd304938e9bf56f9a31c7e8eee875986e8b7f42b",
        message: "Test 1",
        paymentMethod: "crypto",
        createdAt: currentTime.toISOString()
      },
      {
        id: "mock-donation-1",
        donor: {
          firstName: "John",
          lastName: "Doe",
          email: email,
          phone: "",
          isAnonymous: false
        },
        charity: "global-water-foundation",
        amount: 100,
        currency: "USD",
        timestamp: new Date(currentTime.getTime() - 2 * 24 * 60 * 60 * 1000),
        status: "completed",
        transactionHash: "0xabcd1234567890",
        paymentMethod: "crypto",
        createdAt: new Date(currentTime.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: "mock-donation-2",
        donor: {
          firstName: "John",
          lastName: "Doe",
          email: email,
          phone: "",
          isAnonymous: false
        },
        charity: "education-for-all",
        amount: 50,
        currency: "USD",
        timestamp: new Date(currentTime.getTime() - 5 * 24 * 60 * 60 * 1000),
        status: "completed",
        paymentMethod: "credit-card",
        createdAt: new Date(currentTime.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
  }
  return astraService.getDonationsByDonorEmail(email);
}

// AstraDB service
export const astraService = {
  // Get all charities
  async getAllCharities(): Promise<Charity[]> {
    if (!isUsingRealDb) {
      return defaultCharities;
    }

    try {
      const collection = db.collection("charities");
      const results = await collection.find({}).toArray();
      // Convert the results to the Charity type
      return results.map(charity => ({
        id: charity.id as string,
        name: charity.name as string,
        category: charity.category as string,
        description: charity.description as string,
        impact: charity.impact as string,
        location: charity.location as string,
        imageUrl: charity.imageUrl as string,
        slug: charity.slug as string | undefined,
        longDescription: charity.longDescription as string | undefined,
        goals: charity.goals as string[] | undefined,
        wallet: charity.wallet as string | undefined
      }));
    } catch (error) {
      console.error("Error fetching charities:", error);
      return defaultCharities;
    }
  },

  // Get charity by ID
  async getCharityById(id: string): Promise<Charity | null> {
    if (!isUsingRealDb) {
      const charity = defaultCharities.find(c => c.id === id);
      return charity || null;
    }

    try {
      const collection = db.collection("charities");
      const charity = await collection.findOne({ id });
      
      if (!charity) {
        return null;
      }
      
      // Convert to Charity type
      return {
        id: charity.id as string,
        name: charity.name as string,
        category: charity.category as string,
        description: charity.description as string,
        impact: charity.impact as string,
        location: charity.location as string,
        imageUrl: charity.imageUrl as string,
        slug: charity.slug as string | undefined,
        longDescription: charity.longDescription as string | undefined,
        goals: charity.goals as string[] | undefined,
        wallet: charity.wallet as string | undefined
      };
    } catch (error) {
      console.error(`Error fetching charity with ID ${id}:`, error);
      return null;
    }
  },

  // Create donation
  async createDonation(donationData: Partial<Donation>): Promise<string | null> {
    try {
      const collection = db.collection("donations");
      const donation = {
        ...donationData,
        timestamp: new Date(),
        status: "pending"
      };

      const result = await collection.insertOne(donation);
      return donation.id || null;
    } catch (error) {
      console.error("Error creating donation:", error);
      return null;
    }
  },

  // Update donation status
  async updateDonationStatus(id: string, status: string, transactionHash?: string): Promise<boolean> {
    try {
      const collection = db.collection("donations");
      
      const updateData: Record<string, any> = { status };
      if (transactionHash) {
        updateData.transactionHash = transactionHash;
      }
      
      const result = await collection.updateOne(
        { id },
        { $set: updateData }
      );
      
      return true;
    } catch (error) {
      console.error(`Error updating donation status for ${id}:`, error);
      return false;
    }
  },
  
  // Get donations by donor email
  async getDonationsByDonorEmail(email: string): Promise<Donation[]> {
    try {
      const collection = db.collection("donations");
      const results = await collection.find({ "donor.email": email }).toArray();
      
      return results as unknown as Donation[];
    } catch (error) {
      console.error(`Error fetching donations for email ${email}:`, error);
      return [];
    }
  },

  // Add donation to a charity
  async addDonation(charityId: string, donation: { amount: number; donor: string; date: Date }) {
    try {
      const collection = db.collection("donations");
      await collection.insertOne({
        charityId,
        ...donation,
      });
      return true;
    } catch (error) {
      console.error("Error adding donation:", error);
      return false;
    }
  }
};

export default astraService; 