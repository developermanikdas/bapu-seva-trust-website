import { client } from "./client";

export const HOME_PAGE_QUERY = `*[_type == "homePage"][0]`;
export const ABOUT_PAGE_QUERY = `*[_type == "aboutPage"][0]`;
export const VISION_MISSION_QUERY = `*[_type == "visionMissionPage"][0]`;
export const PROGRAMS_QUERY = `*[_type == "program"] | order(orderAsc asc)`;
export const IMPACT_STORIES_QUERY = `*[_type == "impactStory"]`;
export const NEWS_QUERY = `*[_type == "news"] | order(publishedAt desc)`;
export const TEAM_MEMBERS_QUERY = `*[_type == "teamMember"] | order(orderAsc asc)`;
export const REPORTS_QUERY = `*[_type == "report"] | order(year desc)`;
export const GET_INVOLVED_QUERY = `*[_type == "getInvolvedPage"][0]`;
export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]`;

export async function fetchHomePageData() {
  try {
    const data = await client.fetch(HOME_PAGE_QUERY);
    return data;
  } catch (e) {
    console.error("Sanity fetch error (homePage):", e);
    return null;
  }
}

export async function fetchAboutPageData() {
  try {
    const data = await client.fetch(ABOUT_PAGE_QUERY);
    return data;
  } catch (e) {
    console.error("Sanity fetch error (aboutPage):", e);
    return null;
  }
}

export async function fetchVisionMissionData() {
  try {
    const data = await client.fetch(VISION_MISSION_QUERY);
    return data;
  } catch (e) {
    console.error("Sanity fetch error (visionMissionPage):", e);
    return null;
  }
}

export async function fetchProgramsData() {
  try {
    const data = await client.fetch(PROGRAMS_QUERY);
    return data && data.length > 0 ? data : null;
  } catch (e) {
    console.error("Sanity fetch error (program):", e);
    return null;
  }
}

export async function fetchImpactStoriesData() {
  try {
    const data = await client.fetch(IMPACT_STORIES_QUERY);
    return data && data.length > 0 ? data : null;
  } catch (e) {
    console.error("Sanity fetch error (impactStory):", e);
    return null;
  }
}

export async function fetchNewsData() {
  try {
    const data = await client.fetch(NEWS_QUERY);
    return data && data.length > 0 ? data : null;
  } catch (e) {
    console.error("Sanity fetch error (news):", e);
    return null;
  }
}

export async function fetchTeamMembersData() {
  try {
    const data = await client.fetch(TEAM_MEMBERS_QUERY);
    return data && data.length > 0 ? data : null;
  } catch (e) {
    console.error("Sanity fetch error (teamMember):", e);
    return null;
  }
}

export async function fetchReportsData() {
  try {
    const data = await client.fetch(REPORTS_QUERY);
    return data && data.length > 0 ? data : null;
  } catch (e) {
    console.error("Sanity fetch error (report):", e);
    return null;
  }
}

export async function fetchGetInvolvedData() {
  try {
    const data = await client.fetch(GET_INVOLVED_QUERY);
    return data;
  } catch (e) {
    console.error("Sanity fetch error (getInvolvedPage):", e);
    return null;
  }
}

export async function fetchSiteSettings() {
  try {
    const data = await client.fetch(SITE_SETTINGS_QUERY);
    return data;
  } catch (e) {
    console.error("Sanity fetch error (siteSettings):", e);
    return null;
  }
}
