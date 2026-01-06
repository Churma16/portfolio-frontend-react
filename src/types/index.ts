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
    role: string;
    bio_short: string;
    bio_long: string;
    location: string;
    is_hireable: boolean;
    avatar: string;
    cv_files: string;
    hero_image_code: string;
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
    tech_stack?: TechStack[];
}

export interface Message extends BaseEntity {
    name: string;
    email: string;
    content: string;
    is_read: boolean;
}

// 6. API Response Helper (Opsional, biar gampang)
export interface ApiResponse<T> {
    data: T;
    message?: string;
    meta?: any;
    status?: string;
}
