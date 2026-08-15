export const groq = String.raw;

// Programs Query
export const PROGRAMS_QUERY = groq`
  *[_type == "program"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    "category": coalesce(category, tag),
    tag,
    iconName,
    shortDescription,
    fullDescription,
    mainImage,
    location,
    beneficiariesCount,
    keyHighlights,
    featured
  }
`;

// Single Program Query
export const PROGRAM_BY_SLUG_QUERY = groq`
  *[_type == "program" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    "category": coalesce(category, tag),
    tag,
    iconName,
    shortDescription,
    fullDescription,
    mainImage,
    location,
    beneficiariesCount,
    keyHighlights
  }
`;

// News & Articles Query
export const NEWS_QUERY = groq`
  *[_type == "news"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    category,
    excerpt,
    "body": coalesce(content, body, excerpt),
    content,
    mainImage,
    location,
    author
  }
`;

// Single News Query
export const NEWS_BY_SLUG_QUERY = groq`
  *[_type == "news" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    category,
    excerpt,
    "body": coalesce(content, body, excerpt),
    content,
    mainImage,
    location,
    author
  }
`;

// Impact Stories Query
export const IMPACT_STORIES_QUERY = groq`
  *[_type == "impactStory"] | order(_createdAt desc) {
    _id,
    title,
    "name": coalesce(beneficiaryName, name, title),
    beneficiaryName,
    age,
    location,
    "role": coalesce(programCategory, role),
    programCategory,
    quote,
    storySummary,
    "impactOutcome": coalesce(impactOutcome, storySummary),
    outcomes,
    photo,
    featured
  }
`;

// Team Members Query
export const TEAM_MEMBERS_QUERY = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    role,
    category,
    location,
    email,
    bio,
    image
  }
`;

// Reports & Financial Audits Query
export const REPORTS_QUERY = groq`
  *[_type == "report"] | order(year desc) {
    _id,
    title,
    year,
    publishedDate,
    category,
    "fileUrl": pdfFile.asset->url,
    externalUrl,
    summary
  }
`;

// Home Page Settings Query
export const HOME_PAGE_QUERY = groq`
  *[_type == "homePage"][0] {
    _id,
    "heroHeadline": coalesce(heroHeadline, "Empowering Communities, Restoring Hope & Transforming Rural Lives"),
    "heroTagline": coalesce(heroSubheadline, heroTagline),
    "heroBadge": coalesce(locationBadge, heroBadge),
    heroImage,
    impactStat1Number,
    impactStat1Label,
    impactStat2Number,
    impactStat2Label,
    impactStat3Number,
    impactStat3Label,
    "aboutTitle": coalesce(aboutHeading, aboutTitle),
    "aboutDescription": coalesce(aboutParagraph1, aboutDescription)
  }
`;
