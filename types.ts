
export interface Resource {
  id: string;
  name: string;
  type: 'ngo' | 'government' | 'volunteer';
  description: string;
  verified: boolean;
  contact: string;
  category: string[];
}

export interface TriageAnswers {
  housing: string;
  safety: string;
  documents: string;
  kids: string;
  medical: string;
  food: string;
}

export interface RightsInfo {
  country: string;
  situation: string;
  content: string[];
}
