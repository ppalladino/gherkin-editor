// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Organization, Project, ProjectAggregate, StepTemplate, StepToken, StepTokenOption } from '@/_types'
import { getStepTemplate } from './_index'

// Define a service using a base URL and expected endpoints
export const gherkinEditorApi = createApi({
  reducerPath: 'gherkinEditorApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
  tagTypes: ['Organization', 'Project', 'StepTemplate', 'StepToken', 'StepTokenOption'],
  endpoints: (builder) => ({

        // ORGANIZATIONS

        getOrganizations: builder.query<Organization[], undefined>({
            query: () => `organizations`,
            providesTags: ['Organization'],
        }),
        getOrganization: builder.query<Organization, string>({
            query: (id) => `organizations/${id}`,
            providesTags: (result, error, id) => [{ type: 'Organization', id }],
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
            invalidatesTags: ['Organization'],
        }),
        putOrganization: builder.mutation<Organization, Organization>({
            query: (organization) => ({
                url: `organizations/${organization.id}`,
                method: 'PUT',
                body: organization,
            }),
            invalidatesTags: (result, error, org) => [
              { type: 'Organization', id: org.id },
              'Organization'
            ],
        }),
        deleteOrganization: builder.mutation<{ data: { success: boolean } }, string>({
            query: (id) => ({
              url: `organizations/${id}`,
              method: 'DELETE',
            }),
            invalidatesTags: ['Organization'],
        }),

        // PROJECTS

        getProjects: builder.query<Project[], undefined>({
            query: () => `projects`,
            providesTags: ['Project'],
        }),
        getProject: builder.query<Project, string>({
            query: (id) => `projects/${id}`,
            providesTags: (result, error, id) => [{ type: 'Project', id }],
        }),
        getProjectAggregate: builder.query<{data: ProjectAggregate}, string>({
            query: (id) => `projects/aggregate/${id}`,
            providesTags: (result, error, id) => [{ type: 'Project', id }],
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
            invalidatesTags: ['Project'],
        }),
        putProject: builder.mutation<Project, Project>({
            query: (model) => ({
                url: `projects/${model.id}`,
                method: 'PUT',
                body: model,
            }),
            invalidatesTags: (result, error, project) => [
              { type: 'Project', id: project.id },
              'Project'
            ],
        }),
        deleteProject: builder.mutation<{ data: { success: boolean } }, string>({
            query: (id) => ({
              url: `projects/${id}`,
              method: 'DELETE',
            }),
            invalidatesTags: ['Project'],
        }),

        // STEP TEMPLATES

        getStepTemplates: builder.query<StepTemplate[], undefined>({
            query: () => `step-templates`,
            providesTags: ['StepTemplate'],
        }),
        getStepTemplate: builder.query<StepTemplate, string>({
            query: (id) => `step-templates/${id}`,
            providesTags: (result, error, id) => [{ type: 'StepTemplate', id }],
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
            invalidatesTags: ['StepTemplate'],
        }),
        putStepTemplate: builder.mutation<StepTemplate, StepTemplate>({
            query: (model) => ({
                url: `step-templates/${model.id}`,
                method: 'PUT',
                body: model,
            }),
            invalidatesTags: (result, error, model) => [
              { type: 'StepTemplate', id: model.id },
              'StepTemplate'
            ],
        }),
        deleteStepTemplate: builder.mutation<{ success: boolean }, string>({
            query: (id) => ({
              url: `step-templates/${id}`,
              method: 'DELETE',
            }),
            invalidatesTags: ['StepTemplate'],
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
            invalidatesTags: ['StepTemplate'],
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