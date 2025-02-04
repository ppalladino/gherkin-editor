// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Organization, Project, ProjectAggregate, StepTemplate, StepToken, StepTokenOption } from '@/_types'
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

        // PROJECTS

        getProjects: builder.query<Project[], undefined>({
            query: () => `projects`,
        }),
        getProject: builder.query<Project, string>({
            query: (id) => `projects/${id}`,
        }),
        getProjectAggregate: builder.query<ProjectAggregate, string>({
            query: (id) => `projects/aggregate/${id}`,
        }),
        postProject: builder.mutation<Project, Project>({
            query: (model) => ({
              url: '/projects',
              method: 'POST',
              body: model,
              headers: {
                'Content-Type': 'application/json',
              },
            }),
        }),
        putProject: builder.mutation<Project, Project>({
            query: (model) => ({
                url: `projects/${model.id}`,
                method: 'PUT',
                body: model,
            }),
        }),
        deleteProject: builder.mutation<{ success: boolean }, string>({
            query: (id) => ({
              url: `projects/${id}`,
              method: 'DELETE',
            })
        }),

        // STEP TEMPLATES

        getStepTemplates: builder.query<StepTemplate[], undefined>({
            query: () => `step-templates`,
        }),
        getStepTemplate: builder.query<StepTemplate, string>({
            query: (id) => `step-templates/${id}`,
        }),
        postStepTemplate: builder.mutation<StepTemplate, StepTemplate>({
            query: (model) => ({
              url: '/step-templates',
              method: 'POST',
              body: model,
              headers: {
                'Content-Type': 'application/json',
              },
            }),
        }),
        putStepTemplate: builder.mutation<StepTemplate, StepTemplate>({
            query: (model) => ({
                url: `step-templates/${model.id}`,
                method: 'PUT',
                body: model,
            }),
        }),
        deleteStepTemplate: builder.mutation<{ success: boolean }, string>({
            query: (id) => ({
              url: `step-templates/${id}`,
              method: 'DELETE',
            })
        }),
        seedStepTemplates: builder.mutation<undefined, undefined>({
            query: (model) => ({
              url: '/step-templates/seed',
              method: 'POST',
              body: {},
              headers: {
                'Content-Type': 'application/json',
              },
            }),
        }),

        // STEP TOKENS

        getStepTokens: builder.query<StepToken[], undefined>({
            query: () => `step-tokens`,
        }),
        getStepToken: builder.query<StepToken, string>({
            query: (id) => `step-tokens/${id}`,
        }),
        postStepToken: builder.mutation<StepToken, StepToken>({
            query: (model) => ({
              url: '/step-tokens',
              method: 'POST',
              body: model,
              headers: {
                'Content-Type': 'application/json',
              },
            }),
        }),
        putStepToken: builder.mutation<StepToken, StepToken>({
            query: (model) => ({
                url: `step-tokens/${model.id}`,
                method: 'PUT',
                body: model,
            }),
        }),
        deleteStepToken: builder.mutation<{ success: boolean }, string>({
            query: (id) => ({
              url: `step-tokens/${id}`,
              method: 'DELETE',
            })
        }),
        seedStepTokens: builder.mutation<undefined, undefined>({
            query: (model) => ({
              url: '/step-tokens/seed',
              method: 'POST',
              body: {},
              headers: {
                'Content-Type': 'application/json',
              },
            }),
        }),

        // STEP TOKEN OPTIONS

        getStepTokenOptions: builder.query<StepTokenOption[], undefined>({
            query: () => `step-token-options`,
        }),
        getStepTokenOption: builder.query<StepTokenOption, string>({
            query: (id) => `step-token-options/${id}`,
        }),
        postStepTokenOption: builder.mutation<StepTokenOption, StepTokenOption>({
            query: (model) => ({
              url: '/step-token-options',
              method: 'POST',
              body: model,
              headers: {
                'Content-Type': 'application/json',
              },
            }),
        }),
        putStepTokenOption: builder.mutation<StepTokenOption, StepTokenOption>({
            query: (model) => ({
                url: `step-token-options/${model.id}`,
                method: 'PUT',
                body: model,
            }),
        }),
        deleteStepTokenOption: builder.mutation<{ success: boolean }, string>({
            query: (id) => ({
              url: `step-token-options/${id}`,
              method: 'DELETE',
            })
        }),
        seedStepTokenOptions: builder.mutation<undefined, undefined>({
            query: (model) => ({
              url: '/step-token-options/seed',
              method: 'POST',
              body: {},
              headers: {
                'Content-Type': 'application/json',
              },
            }),
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
    // PROJECTS
    useGetProjectsQuery,
    useGetProjectQuery,
    useGetProjectAggregateQuery,
    usePutProjectMutation,
    usePostProjectMutation,
    useDeleteProjectMutation,
    // STEP TEMPLATES
    useGetStepTemplatesQuery,
    useGetStepTemplateQuery,
    usePutStepTemplateMutation,
    usePostStepTemplateMutation,
    useDeleteStepTemplateMutation,
    useSeedStepTemplatesMutation,
    // STEP TOKENS
    useGetStepTokensQuery,
    useGetStepTokenQuery,
    usePutStepTokenMutation,
    usePostStepTokenMutation,
    useDeleteStepTokenMutation,
    useSeedStepTokensMutation,
    // STEP TOKEN OPTIONS
    useGetStepTokenOptionsQuery,
    useGetStepTokenOptionQuery,
    usePutStepTokenOptionMutation,
    usePostStepTokenOptionMutation,
    useDeleteStepTokenOptionMutation,
    useSeedStepTokenOptionsMutation,
} = gherkinEditorApi