import { createClient } from "@astrajs/collections";

// Types
export interface Donation {
  id: string;
  donor: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    isAnonymous: boolean;
  };
  charity: string;
  amount: number;
  currency: string;
  message?: string;
  paymentMethod: string;
  transactionHash?: string; // For blockchain transactions
  createdAt: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface CharityWithdrawal {
  id: string;
  charityId: string;
  amount: number;
  currency: string;
  transactionHash?: string;
  createdAt: string;
  status: 'pending' | 'completed' | 'failed';
}

// Astra client configuration from environment variables
const ASTRA_DB_ID = process.env.ASTRADB_ID || '';
const ASTRA_DB_REGION = process.env.ASTRADB_REGION || '';
const ASTRA_DB_APPLICATION_TOKEN = process.env.ASTRADB_TOKEN || '';
const ASTRA_DB_NAMESPACE = process.env.ASTRADB_NAMESPACE || 'charity_donations';

// Collection names
const DONATIONS_COLLECTION = 'donations';
const CHARITIES_COLLECTION = 'charities';
const WITHDRAWALS_COLLECTION = 'withdrawals';

// Initialize Astra Client
const initializeAstraClient = async () => {
  try {
    if (!ASTRA_DB_ID || !ASTRA_DB_REGION || !ASTRA_DB_APPLICATION_TOKEN) {
      console.warn('AstraDB credentials missing. Using mock client instead.');
      return createMockClient();
    }
    
    console.log('Connecting to AstraDB...');
    
    const astraClient = await createClient({
      astraDatabaseId: ASTRA_DB_ID,
      astraDatabaseRegion: ASTRA_DB_REGION,
      applicationToken: ASTRA_DB_APPLICATION_TOKEN,
    });
    
    const astraDb = astraClient.namespace(ASTRA_DB_NAMESPACE);
    
    // Ensure collections exist
    try {
      await astraDb.createCollection(DONATIONS_COLLECTION);
      console.log(`Collection ${DONATIONS_COLLECTION} ready`);
    } catch (e) {
      console.log(`Collection ${DONATIONS_COLLECTION} already exists`);
    }
    
    try {
      await astraDb.createCollection(CHARITIES_COLLECTION);
      console.log(`Collection ${CHARITIES_COLLECTION} ready`);
      
      // Seed charities if they don't exist yet
      await seedCharitiesIfNeeded(astraDb);
    } catch (e) {
      console.log(`Collection ${CHARITIES_COLLECTION} already exists`);
    }
    
    try {
      await astraDb.createCollection(WITHDRAWALS_COLLECTION);
      console.log(`Collection ${WITHDRAWALS_COLLECTION} ready`);
    } catch (e) {
      console.log(`Collection ${WITHDRAWALS_COLLECTION} already exists`);
    }
    
    return astraDb;
  } catch (error) {
    console.error('Error initializing AstraDB client:', error);
    console.warn('Falling back to mock client');
    return createMockClient();
  }
};

// Seed charities if they don't exist
const seedCharitiesIfNeeded = async (astraDb: any) => {
  const charitiesCollection = astraDb.collection(CHARITIES_COLLECTION);
  
  // Check if charities already exist
  const existingCharities = await charitiesCollection.find({});
  if (existingCharities.data.length > 0) {
    console.log('Charities already seeded');
    return;
  }
  
  // Seed charity data
  const charitySeedData = [
    {
      id: 'global-water-foundation',
      name: 'Global Water Foundation',
      category: 'Environment',
      description: 'Providing clean water to communities in need around the world.',
      wallet: '0x1234567890123456789012345678901234567890',
      impact: '500,000 people with access to clean water',
      location: 'Global',
      imageUrl: '/placeholder.svg?height=300&width=600',
      longDescription:
        'The Global Water Foundation is committed to ensuring communities worldwide have access to clean, safe water. Through infrastructure projects, education, and local partnerships, we address water scarcity and sanitation challenges to create sustainable solutions.',
      goals: ['Support 25 communities by 2026', 'Build 50 wells', 'Provide water purification systems to 100 villages']
    },
    {
      id: 'childrens-health-fund',
      name: 'Children\'s Health Fund',
      category: 'Health',
      description: 'Providing medical care and health services to children in need.',
      wallet: '0x2345678901234567890123456789012345678901',
      impact: '30,000 children received medical care',
      location: 'Global',
      imageUrl: '/placeholder.svg?height=300&width=600',
      longDescription:
        'The Children\'s Health Fund is dedicated to ensuring that all children have access to quality healthcare, regardless of their economic circumstances. We operate mobile health clinics and partner with local healthcare providers to deliver essential medical services.',
      goals: [
        'Reach 50,000 children with medical care',
        'Establish 10 new mobile clinics',
        'Train 100 local healthcare workers'
      ]
    }
  ];
  
  // Insert each charity
  for (const charity of charitySeedData) {
    await charitiesCollection.create(charity);
  }
  
  console.log('Charities seeded successfully');
};

// Create mock client for testing or when AstraDB is not configured
const createMockClient = () => {
  // Mock data store for simulation
  const mockData: Record<string, Record<string, any>> = {
    [DONATIONS_COLLECTION]: {},
    [CHARITIES_COLLECTION]: {
      'global-water-foundation': {
        id: 'global-water-foundation',
        name: 'Global Water Foundation',
        category: 'Environment',
        description: 'Providing clean water to communities in need around the world.',
        wallet: '0x1234567890123456789012345678901234567890',
        impact: '500,000 people with access to clean water',
        location: 'Global',
        imageUrl: '/placeholder.svg?height=300&width=600',
        longDescription:
          'The Global Water Foundation is committed to ensuring communities worldwide have access to clean, safe water. Through infrastructure projects, education, and local partnerships, we address water scarcity and sanitation challenges to create sustainable solutions.',
        goals: ['Support 25 communities by 2026', 'Build 50 wells', 'Provide water purification systems to 100 villages']
      },
      'childrens-health-fund': {
        id: 'childrens-health-fund',
        name: 'Children\'s Health Fund',
        category: 'Health',
        description: 'Providing medical care and health services to children in need.',
        wallet: '0x2345678901234567890123456789012345678901',
        impact: '30,000 children received medical care',
        location: 'Global',
        imageUrl: '/placeholder.svg?height=300&width=600',
        longDescription:
          'The Children\'s Health Fund is dedicated to ensuring that all children have access to quality healthcare, regardless of their economic circumstances. We operate mobile health clinics and partner with local healthcare providers to deliver essential medical services.',
        goals: [
          'Reach 50,000 children with medical care',
          'Establish 10 new mobile clinics',
          'Train 100 local healthcare workers'
        ]
      }
    },
    [WITHDRAWALS_COLLECTION]: {}
  };

  // Mock client that mimics the AstraDB client interface
  const mockClient = {
    namespace: ASTRA_DB_NAMESPACE,
    collection: (collectionName: string) => ({
      create: async (document: any) => {
        const newId = document.id || `mock-id-${Date.now()}`;
        const newDoc = { ...document, id: newId };
        mockData[collectionName][newId] = newDoc;
        return newDoc;
      },
      update: async (id: string, document: any) => {
        const updatedDoc = { ...document, id };
        mockData[collectionName][id] = updatedDoc;
        return updatedDoc;
      },
      get: async (id: string) => {
        return mockData[collectionName]?.[id] ? { id, ...mockData[collectionName][id] } : null;
      },
      find: async (query: any) => {
        // Very simplistic query handling for the mock
        if (!query || Object.keys(query).length === 0) {
          return { data: Object.values(mockData[collectionName] || {}) };
        }
        
        const queryKey = Object.keys(query)[0];
        const queryValue = query[queryKey];
        
        // Handle nested properties like 'donor.email'
        if (queryKey.includes('.')) {
          const [parent, child] = queryKey.split('.');
          const filtered = Object.values(mockData[collectionName] || {}).filter(
            item => item[parent] && item[parent][child] === queryValue
          );
          return { data: filtered };
        }
        
        // Handle simple properties
        const filtered = Object.values(mockData[collectionName] || {}).filter(
          item => item[queryKey] === queryValue
        );
        return { data: filtered };
      },
      delete: async (id: string) => {
        const deleted = mockData[collectionName][id];
        delete mockData[collectionName][id];
        return deleted ? { id } : null;
      }
    })
  };
  
  return mockClient;
};

// Create a new donation record
export const createDonation = async (donation: Omit<Donation, 'id' | 'createdAt' | 'status'>): Promise<Donation> => {
  try {
    const client = await initializeAstraClient();
    const donationsCollection = client.collection(DONATIONS_COLLECTION);
    
    const donationRecord: Donation = {
      ...donation,
      id: `donation-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    
    await donationsCollection.create(donationRecord);
    return donationRecord;
  } catch (error) {
    console.error('Error creating donation:', error);
    throw error;
  }
};

// Update donation status
export const updateDonationStatus = async (
  donationId: string, 
  status: 'pending' | 'completed' | 'failed',
  transactionHash?: string
): Promise<Donation> => {
  try {
    const client = await initializeAstraClient();
    const donationsCollection = client.collection(DONATIONS_COLLECTION);
    
    const donation = await donationsCollection.get(donationId);
    if (!donation) {
      throw new Error(`Donation ${donationId} not found`);
    }
    
    const updatedDonation = {
      ...donation,
      status,
      ...(transactionHash ? { transactionHash } : {})
    };
    
    await donationsCollection.update(donationId, updatedDonation);
    return updatedDonation as Donation;
  } catch (error) {
    console.error('Error updating donation status:', error);
    throw error;
  }
};

// Get all donations for a specific donor email
export const getDonationsByDonorEmail = async (email: string): Promise<Donation[]> => {
  try {
    const client = await initializeAstraClient();
    const donationsCollection = client.collection(DONATIONS_COLLECTION);
    
    const result = await donationsCollection.find({ 'donor.email': email });
    return result.data as Donation[];
  } catch (error) {
    console.error('Error getting donations by donor email:', error);
    throw error;
  }
};

// Get all donations for a specific charity
export const getDonationsByCharity = async (charityId: string): Promise<Donation[]> => {
  try {
    const client = await initializeAstraClient();
    const donationsCollection = client.collection(DONATIONS_COLLECTION);
    
    const result = await donationsCollection.find({ charity: charityId });
    return result.data as Donation[];
  } catch (error) {
    console.error('Error getting donations by charity:', error);
    throw error;
  }
};

// Get charity information
export const getCharity = async (charityId: string) => {
  try {
    const client = await initializeAstraClient();
    const charitiesCollection = client.collection(CHARITIES_COLLECTION);
    
    const charity = await charitiesCollection.get(charityId);
    if (!charity) {
      throw new Error(`Charity ${charityId} not found`);
    }
    
    return charity;
  } catch (error) {
    console.error('Error getting charity:', error);
    throw error;
  }
};

// Get all charities
export const getAllCharities = async () => {
  try {
    const client = await initializeAstraClient();
    const charitiesCollection = client.collection(CHARITIES_COLLECTION);
    
    const result = await charitiesCollection.find({});
    return result.data;
  } catch (error) {
    console.error('Error getting all charities:', error);
    throw error;
  }
};

// Create a new withdrawal record for a charity
export const createWithdrawal = async (
  withdrawal: Omit<CharityWithdrawal, 'id' | 'createdAt' | 'status'>
): Promise<CharityWithdrawal> => {
  try {
    const client = await initializeAstraClient();
    const withdrawalsCollection = client.collection(WITHDRAWALS_COLLECTION);
    
    const withdrawalRecord: CharityWithdrawal = {
      ...withdrawal,
      id: `withdrawal-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    
    await withdrawalsCollection.create(withdrawalRecord);
    return withdrawalRecord;
  } catch (error) {
    console.error('Error creating withdrawal:', error);
    throw error;
  }
};

// Update withdrawal status
export const updateWithdrawalStatus = async (
  withdrawalId: string,
  status: 'pending' | 'completed' | 'failed',
  transactionHash?: string
): Promise<CharityWithdrawal> => {
  try {
    const client = await initializeAstraClient();
    const withdrawalsCollection = client.collection(WITHDRAWALS_COLLECTION);
    
    const withdrawal = await withdrawalsCollection.get(withdrawalId);
    if (!withdrawal) {
      throw new Error(`Withdrawal ${withdrawalId} not found`);
    }
    
    const updatedWithdrawal = {
      ...withdrawal,
      status,
      ...(transactionHash ? { transactionHash } : {})
    };
    
    await withdrawalsCollection.update(withdrawalId, updatedWithdrawal);
    return updatedWithdrawal as CharityWithdrawal;
  } catch (error) {
    console.error('Error updating withdrawal status:', error);
    throw error;
  }
};

// Get all withdrawals for a specific charity
export const getWithdrawalsByCharity = async (charityId: string): Promise<CharityWithdrawal[]> => {
  try {
    const client = await initializeAstraClient();
    const withdrawalsCollection = client.collection(WITHDRAWALS_COLLECTION);
    
    const result = await withdrawalsCollection.find({ charityId });
    return result.data as CharityWithdrawal[];
  } catch (error) {
    console.error('Error getting withdrawals by charity:', error);
    throw error;
  }
}; 