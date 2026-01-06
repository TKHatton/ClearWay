
import { Resource } from '../types';

export const organizations: Resource[] = [
  {
    id: "1",
    name: "Refugee Action Network",
    type: "ngo",
    description: "Providing immediate legal aid and document recovery for displaced families.",
    verified: true,
    contact: "+1 800 555 0123",
    category: ["Legal", "Documents"]
  },
  {
    id: "2",
    name: "Global Shield Housing",
    type: "ngo",
    description: "Emergency temporary shelter and long-term housing placement services.",
    verified: true,
    contact: "shelter@globalshield.org",
    category: ["Housing", "Safety"]
  },
  {
    id: "3",
    name: "MedRight Volunteers",
    type: "volunteer",
    description: "Free basic health checkups and prescription assistance for migrants.",
    verified: true,
    contact: "WhatsApp: +44 7700 900001",
    category: ["Medical", "Health"]
  },
  {
    id: "4",
    name: "KiddieSafe Foundation",
    type: "ngo",
    description: "Safe spaces for children, schooling support, and psychological first aid.",
    verified: true,
    contact: "contact@kiddiesafe.intl",
    category: ["Kids", "Education"]
  },
  {
    id: "5",
    name: "United Food Relief",
    type: "government",
    description: "Verified municipal food banks and daily meal distribution centers.",
    verified: true,
    contact: "www.foodrelief-portal.gov",
    category: ["Food", "Essential"]
  }
];
