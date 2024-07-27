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

export type Query = {
  __typename?: 'Query';
  trainers?: Maybe<Array<Trainer>>;
  user?: Maybe<User>;
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
  users?: Maybe<Array<User>>;
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  trainer?: Maybe<Trainer>;
  userRoles?: Maybe<Array<UserRole>>;
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


export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;