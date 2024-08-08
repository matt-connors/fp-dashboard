import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  JSONObject: { input: any; output: any; }
};

export type Exercise = {
  __typename?: 'Exercise';
  aliases?: Maybe<Array<Scalars['String']['output']>>;
  bodyPart?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['String']['output']>;
  iconUrl?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  programExercise?: Maybe<ProgramExercise>;
};

export type Permission = {
  __typename?: 'Permission';
  action?: Maybe<PermissionAction>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  roles?: Maybe<Array<Role>>;
};

/** The action that a permission allows */
export enum PermissionAction {
  Create = 'CREATE',
  Delete = 'DELETE',
  Edit = 'EDIT',
  Manage = 'MANAGE',
  View = 'VIEW'
}

export type Program = {
  __typename?: 'Program';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  programExercises?: Maybe<Array<ProgramExercise>>;
  trainerPrograms?: Maybe<Array<TrainerPrograms>>;
  type?: Maybe<ProgramType>;
  userPrograms?: Maybe<Array<UserProgram>>;
};

export type ProgramExercise = {
  __typename?: 'ProgramExercise';
  duration?: Maybe<Scalars['Int']['output']>;
  exercise?: Maybe<Exercise>;
  id?: Maybe<Scalars['ID']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  program?: Maybe<Program>;
  reps?: Maybe<Scalars['Int']['output']>;
  sets?: Maybe<Scalars['Int']['output']>;
};

/** The type of program; either Library or Custom */
export enum ProgramType {
  Custom = 'Custom',
  Library = 'Library'
}

export type Query = {
  __typename?: 'Query';
  exercise?: Maybe<Exercise>;
  exercises?: Maybe<Array<Exercise>>;
  program?: Maybe<Program>;
  publicPrograms?: Maybe<Array<Program>>;
  trainer?: Maybe<Trainer>;
  trainerWithPrograms?: Maybe<Array<Trainer>>;
  user?: Maybe<User>;
};


export type QueryExerciseArgs = {
  exerciseId: Scalars['String']['input'];
};


export type QueryProgramArgs = {
  programId: Scalars['String']['input'];
};


export type QueryTrainerArgs = {
  trainerId: Scalars['String']['input'];
};


export type QueryTrainerWithProgramsArgs = {
  trainerId: Scalars['String']['input'];
};


export type QueryUserArgs = {
  userId: Scalars['String']['input'];
};

export type Role = {
  __typename?: 'Role';
  id?: Maybe<Scalars['ID']['output']>;
  permissions?: Maybe<Array<Permission>>;
  roleName?: Maybe<Scalars['String']['output']>;
  userRoles?: Maybe<Scalars['String']['output']>;
};

export type Trainer = {
  __typename?: 'Trainer';
  id?: Maybe<Scalars['ID']['output']>;
  trainerPrograms?: Maybe<Array<TrainerPrograms>>;
  users?: Maybe<Array<User>>;
};

export type TrainerPrograms = {
  __typename?: 'TrainerPrograms';
  id?: Maybe<Scalars['ID']['output']>;
  program?: Maybe<Array<Program>>;
  trainer?: Maybe<Array<Trainer>>;
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  trainer?: Maybe<Trainer>;
  userProgram?: Maybe<Array<UserProgram>>;
  userRoles?: Maybe<Array<UserRole>>;
};

export type UserProgram = {
  __typename?: 'UserProgram';
  endDate?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  program?: Maybe<Array<Program>>;
  startDate?: Maybe<Scalars['String']['output']>;
  user?: Maybe<Array<User>>;
};

export type UserRole = {
  __typename?: 'UserRole';
  id?: Maybe<Scalars['ID']['output']>;
  role?: Maybe<Role>;
  user?: Maybe<User>;
};

export type GetUserQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', email?: string | null, id?: string | null } | null };

export type GetExercisesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetExercisesQuery = { __typename?: 'Query', exercises?: Array<{ __typename?: 'Exercise', id?: string | null, name?: string | null, bodyPart?: string | null, aliases?: Array<string> | null, category?: string | null, iconUrl?: string | null }> | null };

export type GetPublicProgramsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPublicProgramsQuery = { __typename?: 'Query', publicPrograms?: Array<{ __typename?: 'Program', id?: string | null, type?: ProgramType | null, name?: string | null, description?: string | null, programExercises?: Array<{ __typename?: 'ProgramExercise', exercise?: { __typename?: 'Exercise', name?: string | null, id?: string | null, aliases?: Array<string> | null, category?: string | null } | null }> | null, userPrograms?: Array<{ __typename?: 'UserProgram', id?: string | null, startDate?: string | null, endDate?: string | null }> | null }> | null };


export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const GetExercisesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getExercises"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exercises"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"bodyPart"}},{"kind":"Field","name":{"kind":"Name","value":"aliases"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"iconUrl"}}]}}]}}]} as unknown as DocumentNode<GetExercisesQuery, GetExercisesQueryVariables>;
export const GetPublicProgramsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPublicPrograms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publicPrograms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"programExercises"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"aliases"}},{"kind":"Field","name":{"kind":"Name","value":"category"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"userPrograms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}}]}}]}}]} as unknown as DocumentNode<GetPublicProgramsQuery, GetPublicProgramsQueryVariables>;