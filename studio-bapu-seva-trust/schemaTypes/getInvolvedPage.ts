import { defineField, defineType } from 'sanity'

export const getInvolvedPage = defineType({
  name: 'getInvolvedPage',
  title: 'Get Involved Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      initialValue: 'Partner With Us For Change',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Get Involved',
      type: 'string',
      initialValue: 'Join the Movement for Grassroots Impact',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
      initialValue: 'Whether as an individual volunteer, corporate CSR partner, or institutional supporter, your involvement directly touches thousands of lives.',
    }),
    defineField({
      name: 'volunteerSectionTitle',
      title: 'Volunteer Section Title',
      type: 'string',
      initialValue: 'Volunteer & Teaching Opportunities',
    }),
    defineField({
      name: 'volunteerOpportunities',
      title: 'Volunteer Opportunities List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'role', title: 'Role Name', type: 'string' }),
            defineField({ name: 'location', title: 'Location (e.g. Bihar / Online / Delhi)', type: 'string' }),
            defineField({ name: 'commitment', title: 'Time Commitment', type: 'string' }),
            defineField({ name: 'description', title: 'Role Description', type: 'text', rows: 2 }),
          ],
        },
      ],
    }),
    defineField({
      name: 'csrTitle',
      title: 'CSR & Institutional Partnerships Title',
      type: 'string',
      initialValue: 'Corporate CSR & Institutional Alliances',
    }),
    defineField({
      name: 'csrDescription',
      title: 'CSR Description',
      type: 'text',
      rows: 3,
      initialValue: 'Partner with Bapu Seva Trust under Companies Act Section 135 CSR mandate. We provide 80G tax receipts, auditable project milestones, and impact metrics.',
    }),
  ],
})
