import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
      description: 'Client name or company',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      description: 'Client industry or sector',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'problem',
      title: 'Problem Statement',
      type: 'text',
      rows: 6,
      description: 'Describe the client problem or challenge',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'systemDesign',
      title: 'System Design Approach',
      type: 'text',
      rows: 6,
      description: 'Describe the system design and approach taken',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'execution',
      title: 'Execution Process',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'executionDetail',
          title: 'Execution Phase',
          fields: [
            {
              name: 'phase',
              title: 'Phase Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'duration',
              title: 'Duration',
              type: 'string',
              description: 'e.g., "2 weeks", "1 month"',
            },
          ],
          preview: {
            select: {
              title: 'phase',
              subtitle: 'duration',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'outcomes',
      title: 'Outcomes',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'outcome',
          title: 'Outcome',
          fields: [
            {
              name: 'metric',
              title: 'Metric',
              type: 'string',
              description: 'e.g., "Revenue Growth", "User Acquisition"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'e.g., "150%", "10,000 users"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            },
          ],
          preview: {
            select: {
              title: 'metric',
              subtitle: 'value',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      description: 'Override default SEO settings for this case study',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      client: 'client',
      media: 'images.0',
      publishedAt: 'publishedAt',
    },
    prepare(selection) {
      const { client, publishedAt } = selection
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString() : 'No date'
      return {
        ...selection,
        subtitle: client ? `${client} • ${date}` : date,
      }
    },
  },
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Published Date, Old',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
  ],
})
