export interface Script {
  _id: string;
  id: string;
  title: string;
  script: string;
  views?: number;
  image?: string;
  game?: {
    _id: string;
    name: string;
    imageUrl?: string;
  };
  slug?: string;
  verified?: boolean;
  key?: boolean;
  scriptType?: string;
  isUniversal?: boolean;
  isPatched?: boolean;
  createdAt?: string;
  updatedAt?: string;
  matched?: string[];
}

export interface ScriptResponse {
  result?: {
    totalPages: number;
    scripts: Script[];
  };
}

export interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
}

export interface FilterOptions {
  mode?: 'free' | 'paid';
  patched?: boolean;
  key?: boolean;
  universal?: boolean;
  verified?: boolean;
  sortBy?: 'views' | 'likeCount' | 'createdAt' | 'updatedAt' | 'dislikeCount' | 'accuracy';
  order?: 'asc' | 'desc';
  strict?: boolean;
}