
  export interface Post {
[x: string]: any|string;
    isDescriptionVisible: boolean;
    isFormVisible: boolean; // ADĂUGA
    _id: string;          // ID-ul postării
    name: string;         // Numele postării
    description: string;  // Descrierea postării
    photo: string;        // URL-ul pozei
    video: string;        // URL-ul video-ului
    likes: any[];         // Array cu utilizatori care au dat like
    comments: any[];      // Array cu comentarii
    categoryId: string;   // ID-ul categoriei postării
    category: any;    
    postedBy: any
    
  }