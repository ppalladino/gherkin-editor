// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { StepTemplate, StepTokenOptions, Organization } from '@/_types'
import { getStepTemplate } from './_index'

// Define a service using a base URL and expected endpoints
export const gherkinEditorApi = createApi({
  reducerPath: 'gherkinEditorApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
  endpoints: (builder) => ({

        // ORGANIZATIONS

        getOrganizations: builder.query<Organization[], undefined>({
            query: () => `organizations`,
        }),
        getOrganization: builder.query<Organization, string>({
            query: (id) => `organizations/${id}`,
        }),
        postOrganization: builder.mutation<Organization, Organization>({
            query: (organization) => ({
              url: '/organizations',
              method: 'POST',
              body: organization,
              headers: {
                'Content-Type': 'application/json',
              },
            }),
        }),
        putOrganization: builder.mutation<Organization, Organization>({
            query: (organization) => ({
                url: `organizations/${organization.id}`,
                method: 'PUT',
                body: organization,
            }),
        }),
        deleteOrganization: builder.mutation<{ success: boolean }, string>({
            query: (id) => ({
              url: `organizations/${id}`,
              method: 'DELETE',
            })
        }),

        // STEP TEMPLATES

        getAllStepTemplates: builder.query<StepTemplate[], undefined>({
            query: () => `step-templates/all`,
        }),
        getStepTemplate: builder.query<StepTemplate, string>({
            query: (id) => `step-templates/${id}`,
        }),
        patchStepTemplate: builder.mutation<StepTemplate, Partial<StepTemplate> & Pick<StepTemplate, 'id'>>({
            query: ({ ...stepTemplate }) => ({
                url: `step-templates`,
                method: 'PATCH',
                body: stepTemplate,
            }),
        }),

        // STEP TOKEN OPTIONS

        getAllStepTokenOptions: builder.query<StepTokenOptions[], undefined>({
            query: () => `step-token-options/all`,
        }),
        getStepTokenOptions: builder.query<StepTokenOptions, string>({
            query: (id) => `step-token-options/${id}`,
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
    // ORGANIZATIONS
    useGetOrganizationsQuery,
    useGetOrganizationQuery,
    usePutOrganizationMutation,
    usePostOrganizationMutation,
    useDeleteOrganizationMutation,
    // STEP TEMPLATES
    useGetAllStepTemplatesQuery,
    useGetStepTemplateQuery,
    usePatchStepTemplateMutation,
    // STEP TOKEN
    useGetAllStepTokenOptionsQuery,
    useGetStepTokenOptionsQuery
} = gherkinEditorApi