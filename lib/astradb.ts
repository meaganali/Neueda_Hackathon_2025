import { DataAPIClient } from "@datastax/astra-db-ts";
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

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
  createdAt?: string;
}

// Initialize the client
const token = process.env.ASTRA_DB_TOKEN;
const endpoint = process.env.ASTRA_DB_ENDPOINT;

// Flag to determine if we're using real Astra DB or local data
const isUsingRealDb = !!(token && endpoint);

// Initialize the client
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

// Load local donations if they exist
let localDonations: Donation[] = [];
try {
  const dataPath = path.join(process.cwd(), 'data', 'donations.json');
  if (fs.existsSync(dataPath)) {
    const data = fs.readFileSync(dataPath, 'utf8');
    localDonations = JSON.parse(data);
    console.log(`Loaded ${localDonations.length} donations from local file`);
  } else {
    console.log("No local donations file found");
  }
} catch (error) {
  console.error("Error loading local donations:", error);
}

// Default charity data - used as fallback if database is unavailable
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
  return astraService.getCharityById(id);
}

// Export donation functions
export async function createDonation(donationData: Partial<Donation>): Promise<string | null> {
  return astraService.createDonation(donationData);
}

export async function updateDonationStatus(id: string, status: string, transactionHash?: string): Promise<boolean> {
  return astraService.updateDonationStatus(id, status, transactionHash);
}

// Export function to get donations by donor email
export async function getDonationsByDonorEmail(email: string): Promise<Donation[]> {
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
      return results.map((charity: any) => ({
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
        // Try to find in default charities if not in DB
        const defaultCharity = defaultCharities.find(c => c.id === id);
        return defaultCharity || null;
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
      const defaultCharity = defaultCharities.find(c => c.id === id);
      return defaultCharity || null;
    }
  },

  // Create donation
  async createDonation(donationData: Partial<Donation>): Promise<string | null> {
    const donationId = uuidv4();
    const now = new Date();
    
    const donation = {
      id: donationId,
      ...donationData,
      timestamp: now,
      createdAt: now.toISOString(),
      status: "pending"
    };

    // Simulate payment processing but don't actually charge
    console.log(`Processing donation: ${donation.id} - Amount: ${donation.amount} ${donation.currency}`);
    
    if (isUsingRealDb) {
      try {
        const collection = db.collection("donations");
        await collection.insertOne(donation);
        return donationId;
      } catch (error) {
        console.error("Error creating donation in AstraDB:", error);
        // Fall back to local storage
      }
    }
    
    // If AstraDB is not available or failed, save to local array
    try {
      // Add to local donations
      localDonations.push(donation as Donation);
      
      // Save to file
      const dataDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
      }
      
      const filePath = path.join(dataDir, 'donations.json');
      fs.writeFileSync(filePath, JSON.stringify(localDonations, null, 2));
      
      console.log(`Saved donation to local file. Total donations: ${localDonations.length}`);
      return donationId;
    } catch (error) {
      console.error("Error saving donation locally:", error);
      return null;
    }
  },

  // Update donation status
  async updateDonationStatus(id: string, status: string, transactionHash?: string): Promise<boolean> {
    console.log(`Updating donation ${id} status to ${status}${transactionHash ? ` with transaction hash ${transactionHash}` : ''}`);
    
    if (isUsingRealDb) {
      try {
        const collection = db.collection("donations");
        
        const updateData: Record<string, any> = { status };
        if (transactionHash) {
          updateData.transactionHash = transactionHash;
        }
        
        await collection.updateOne(
          { id },
          { $set: updateData }
        );
        
        return true;
      } catch (error) {
        console.error(`Error updating donation status in AstraDB for ${id}:`, error);
        // Fall back to local storage
      }
    }
    
    // If AstraDB is not available or failed, update in local array
    try {
      const donationIndex = localDonations.findIndex(d => d.id === id);
      if (donationIndex !== -1) {
        localDonations[donationIndex].status = status;
        if (transactionHash) {
          localDonations[donationIndex].transactionHash = transactionHash;
        }
        
        // Save to file
        const filePath = path.join(process.cwd(), 'data', 'donations.json');
        fs.writeFileSync(filePath, JSON.stringify(localDonations, null, 2));
        
        console.log(`Updated donation status in local file`);
        return true;
      } else {
        console.error(`Donation with ID ${id} not found in local data`);
        return false;
      }
    } catch (error) {
      console.error(`Error updating donation status locally for ${id}:`, error);
      return false;
    }
  },
  
  // Get donations by donor email
  async getDonationsByDonorEmail(email: string): Promise<Donation[]> {
    if (isUsingRealDb) {
      try {
        const collection = db.collection("donations");
        const results = await collection.find({ "donor.email": email }).toArray();
        
        return results as unknown as Donation[];
      } catch (error) {
        console.error(`Error fetching donations from AstraDB for email ${email}:`, error);
        // Fall back to local storage
      }
    }
    
    // If AstraDB is not available or failed, get from local array
    try {
      const userDonations = localDonations.filter(d => d.donor.email === email);
      console.log(`Found ${userDonations.length} donations for email ${email} in local data`);
      return userDonations;
    } catch (error) {
      console.error(`Error fetching donations locally for email ${email}:`, error);
      return [];
    }
  },

  // Get all recent donations
  async getAllDonations(limit: number = 10): Promise<Donation[]> {
    if (isUsingRealDb) {
      try {
        const collection = db.collection("donations");
        const results = await collection.find({})
          .sort({ timestamp: -1 })
          .limit(limit)
          .toArray();
        
        return results as unknown as Donation[];
      } catch (error) {
        console.error("Error fetching recent donations from AstraDB:", error);
        // Fall back to local storage
      }
    }
    
    // If AstraDB is not available or failed, get from local array
    try {
      // Sort by timestamp descending
      const sortedDonations = [...localDonations].sort((a, b) => {
        const dateA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
        const dateB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
        return dateB - dateA;
      });
      
      return sortedDonations.slice(0, limit);
    } catch (error) {
      console.error("Error fetching recent donations locally:", error);
      return [];
    }
  }
};

export default astraService; 