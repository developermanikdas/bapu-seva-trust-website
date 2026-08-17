import { defineField, defineType } from 'sanity'

export const visionMissionPage = defineType({
  name: 'visionMissionPage',
  title: 'Vision & Mission Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      initialValue: 'Guiding Principles & Strategic Roadmap',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Vision & Mission',
      type: 'string',
      initialValue: 'Our Vision & Strategic Mission',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
      initialValue: 'Pioneering community-led transformation through quality education, healthcare access, women skill empowerment, and urban environmental green drives.',
    }),
    defineField({
      name: 'visionTitle',
      title: 'Vision Statement Title',
      type: 'string',
      initialValue: 'Our Core Vision',
    }),
    defineField({
      name: 'visionDescription',
      title: 'Vision Statement Paragraph',
      type: 'text',
      rows: 4,
      initialValue: 'To build a progressive, equitable, and self-reliant society where every individual, regardless of socio-economic background, lives with dignity, health, and equal opportunity.',
    }),
    defineField({
      name: 'missionPillars',
      title: 'Mission Pillars',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Pillar Title', type: 'string' }),
            defineField({ name: 'description', title: 'Pillar Description', type: 'text', rows: 3 }),
            defineField({ name: 'tag', title: 'Region / Focus Tag', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'strategicGoalsTitle',
      title: 'Strategic Goals Title',
      type: 'string',
      initialValue: 'Strategic 2030 Goals',
    }),
    defineField({
      name: 'strategicGoals',
      title: 'Strategic Goals List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'metric', title: 'Goal Target Metric', type: 'string' }),
            defineField({ name: 'label', title: 'Goal Title', type: 'string' }),
            defineField({ name: 'details', title: 'Goal Details', type: 'text', rows: 2 }),
          ],
        },
      ],
    }),
  ],
})
