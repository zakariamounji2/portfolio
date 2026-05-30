export type SocialLink = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  title: string;
  coreStack: string[];
  descriptionBullets: string[];
  websiteUrl?: string | null;
  repoUrl?: string | null;
};

