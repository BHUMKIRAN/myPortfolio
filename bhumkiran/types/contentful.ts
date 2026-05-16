export interface ButtonData {
  label: string;
  link: string;
  isPrimary: boolean;
}

export interface SocialLinkData {
  platform: string;
  url: string;
  iconType?: string;
}

export interface SkillData {
  name: string;
  iconSlug: string;
}

export interface ProfileImageData {
  url: string;
  altText?: string;
  captionTitle?: string;
  captionSubtitle?: string;
}

export interface HeroSectionData {
  welcomeText: string;
  fullName: string;
  roles: string[];
  description: string;
  buttons?: ButtonData[];
  socialLinks?: SocialLinkData[];
  skills?: SkillData[];
  profileImage?: ProfileImageData;
}

export interface FeatureItemData {
  id?: string | number;
  iconSlug: string;
  title: string;
  description: string;
}

export interface FeaturesSectionData {
  sectionTag?: string;
  mainTitle?: string;
  description?: string;
  services?: FeatureItemData[];
}

export interface PortfolioProjectData {
  id?: string | number;
  image: string;
  title: string;
  category?: string;
  description?: string;
  [key: string]: unknown;
}

export interface PortfolioSectionData {
  title?: string;
  subtitle?: string;
  projects?: PortfolioProjectData[];
}

export interface ResumeTimelineItemData {
  title?: string;
  year?: string;
  rating?: string;
  description?: string;
}

export interface ResumeSkillData {
  name?: string;
  level?: number;
}

export interface ResumeSkillGroupData {
  categoryTitle?: string;
  skillList?: ResumeSkillData[];
}

export interface ResumeSectionData {
  header?: {
    tag?: string;
    title?: string;
  };
  tabs?: string[];
  data?: {
    education?: ResumeTimelineItemData[];
    experience?: ResumeTimelineItemData[];
    skills?: ResumeSkillGroupData[];
  };
}

export interface PortfolioContentfulEntry {
  fields?: {
    hero?: {
      heroSection?: HeroSectionData;
    };
    projects?: {
      portfolioSection?: PortfolioSectionData;
    };
    features?: {
      featuresSection?: FeaturesSectionData;
    };
    resume?: {
      resumeSection?: ResumeSectionData;
    };
  };
}

export interface BlogContentItemData {
  fields?: {
    title?: string;
    chips?: string;
    paragraph?: string;
    time?: string;
    images?: Array<{
      fields?: {
        file?: {
          url?: string;
        };
      };
    }>;
    contents?: BlogContentItemData[];
    others?: {
      example?: string;
      links?: string;
    };
  };
  readTime?: string;
}

export interface BlogContentfulEntry {
  fields?: {
    blogs?: BlogContentItemData[];
  };
}
