import { DataAPIClient } from "@datastax/astra-db-ts";
import { v4 as uuidv4 } from 'uuid';

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

// Flag to determine if we're using real Astra DB or default data
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
        return null;
      }
    }
    
    // If no AstraDB, just return the ID (we won't store it, but the UX will work)
    console.log("AstraDB not connected. Using default mode (donation not stored)");
    return donationId;
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
        return false;
      }
    }
    
    // If no AstraDB, just return success (fake it)
    console.log("AstraDB not connected. Using default mode (status update simulated)");
    return true;
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
        return [];
      }
    }
    
    // If no AstraDB, return empty array
    console.log("AstraDB not connected. Using default mode (no donations returned)");
    return [];
  },

  // Get all recent donations
  async getAllDonations(limit: number = 10): Promise<Donation[]> {
    if (isUsingRealDb) {
      try {
        const collection = db.collection("donations");
        // Completely avoid using toArray() which is causing issues
        let results: Donation[] = [];
        
        try {
          // Get donations using direct iteration instead of toArray
          const cursor = await collection.find({});
          if (cursor) {
            let count = 0;
            
            // Manually iterate through cursor and build the array
            for await (const doc of cursor) {
              results.push(doc as unknown as Donation);
              count++;
              
              // Respect the limit parameter
              if (count >= limit) {
                break;
              }
            }
          }
        } catch (cursorError) {
          console.error("Error with cursor operations:", cursorError);
          // Return mock data if cursor iteration fails
          return this.getMockDonations();
        }
        
        return results;
      } catch (error) {
        console.error("Error fetching recent donations from AstraDB:", error);
        return this.getMockDonations();
      }
    }
    
    // If no AstraDB, return mock data for testing
    console.log("AstraDB not connected. Using mock donation data for testing");
    return this.getMockDonations();
  },
  
  // Helper method to get mock donation data
  getMockDonations(): Donation[] {
    return [
      {
        id: "bbb77f4c-a079-48d6-b77f-4ca07918d694",
        donor: {
          firstName: "Matthew",
          lastName: "Lee",
          email: "matthew.lee25@hotmail.com",
          isAnonymous: false
        },
        charity: "global-water-foundation",
        amount: 350,
        currency: "USD",
        timestamp: new Date("2024-12-12T18:50:21.833Z"),
        status: "completed",
        transactionHash: "0x03ff88ce967b4",
        paymentMethod: "paypal",
        createdAt: "2024-12-12T18:50:21.833Z"
      },
      {
        id: "9c8764ef-fc35-45d1-8764-effc3505d17c",
        donor: {
          firstName: "Matthew",
          lastName: "White",
          email: "matthew.white54@gmail.com",
          isAnonymous: false
        },
        charity: "global-water-foundation",
        amount: 396,
        currency: "USD",
        timestamp: new Date("2024-12-22T18:50:20.201Z"),
        status: "completed",
        transactionHash: "crypto",
        paymentMethod: "crypto",
        createdAt: "2024-12-22T18:50:20.201Z"
      },
      {
        id: "b2389c3d-4f81-4264-b89c-3d4f814264ea",
        donor: {
          firstName: "Matthew",
          lastName: "Lopez",
          email: "matthew.lopez45@yahoo.com",
          isAnonymous: false
        },
        charity: "global-water-foundation",
        amount: 265,
        currency: "USD",
        timestamp: new Date("2025-02-25T18:50:19.335Z"),
        status: "completed",
        transactionHash: "0xacba9fc5d0d66",
        paymentMethod: "bank-transfer",
        createdAt: "2025-02-25T18:50:19.335Z"
      },
      {
        id: "7c2cee24-1095-47e6-acee-24109587e60d",
        donor: {
          firstName: "Jane",
          lastName: "Williams",
          email: "jane.williams78@yahoo.com",
          isAnonymous: false
        },
        charity: "childrens-health-fund",
        amount: 323,
        currency: "USD",
        timestamp: new Date("2025-03-31T17:50:21.592Z"),
        status: "completed",
        transactionHash: "0x",
        paymentMethod: "credit-card",
        createdAt: "2025-03-31T17:50:21.592Z"
      }
    ];
  }
};

export default astraService;