// 1. Base Type (Common Fields)
export interface BaseEntity {
    id: number;
    created_at: string;
    updated_at: string;
}

// 2. Tech Stack & Categories
export interface Category extends BaseEntity {
    name: string;
    slug: string;
}

export interface TechStack extends BaseEntity {
    name: string;
    slug?: string; 
    icon_url?: string; 
}

export interface Tag extends BaseEntity {
    name: string;
    slug: string;
    color?: string;
    category_id?: number;
    category?: Category; 
}

// 3. Profile (Berdasarkan tabel 'profiles')
export interface SocialLinks {
    github?: string;
    linkedin?: string;
    email?: string;
    instagram?: string;
    
}

export interface Profile extends BaseEntity {
    name: string;
    headline: string;
    bio: string;
    avatar: string;
    cv_files: string; 
    socials: SocialLinks; 
}

// 4. Work Experience 
export interface WorkExperience extends BaseEntity {
    company: string;
    position: string;
    location: string;
    start_date: string;
    end_date?: string | null; 
    is_current: boolean; 
    description: string;

    // Relasi (Pivot Tables)
    tags?: Tag[];
    stacks?: TechStack[];
}

// 5. Project 
export interface Project extends BaseEntity {
    title: string;
    slug: string;
    thumbnail: string;
    content: string; 
    demo_url?: string;
    repo_url?: string;
    is_featured: boolean;
    published_at?: string;

    // Relasi
    tags?: Tag[];
    stacks?: TechStack[];
}

// 6. API Response Helper (Opsional, biar gampang)
export interface ApiResponse<T> {
    data: T;
    message?: string;
    status?: string;
}
