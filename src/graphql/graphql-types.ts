export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Time: string;
  UUID: string;
};

export type Dish = {
  __typename?: 'Dish';
  id: Scalars['UUID'];
  name: Scalars['String'];
};

export type Image = {
  __typename?: 'Image';
  acceptedAt?: Maybe<Scalars['Time']>;
  createdAt: Scalars['Time'];
  description?: Maybe<Scalars['String']>;
  displayName: Scalars['String'];
  downVotes: Scalars['Int'];
  id: Scalars['UUID'];
  occurrence: Occurrence;
  upVotes: Scalars['Int'];
  updatedAt: Scalars['Time'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTag: Tag;
};

export type MutationCreateTagArgs = {
  tag: TagInput;
};

export type Occurrence = {
  __typename?: 'Occurrence';
  date: Scalars['Time'];
  dish: Dish;
  id: Scalars['UUID'];
  images: Array<Image>;
  priceGuest: Scalars['Int'];
  priceStaff: Scalars['Int'];
  priceStudent: Scalars['Int'];
  reviews: Array<Review>;
  sideDishes: Array<Dish>;
  tags: Array<Tag>;
};

export enum Priority {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM',
}

export type Query = {
  __typename?: 'Query';
  getAllDishes: Array<Dish>;
  getAllImages: Array<Image>;
  getAllReviews: Array<Review>;
  getAllTags: Array<Tag>;
  getImagesForOccurrence: Array<Image>;
  getOccurrencesByDate: Array<Occurrence>;
};

export type QueryGetImagesForOccurrenceArgs = {
  occurrence: Scalars['UUID'];
};

export type QueryGetOccurrencesByDateArgs = {
  date: Scalars['Time'];
};

export type Review = {
  __typename?: 'Review';
  acceptedAt?: Maybe<Scalars['Time']>;
  createdAt: Scalars['Time'];
  displayName: Scalars['String'];
  downVotes: Scalars['Int'];
  id: Scalars['UUID'];
  occurrence: Occurrence;
  stars: Scalars['Int'];
  text?: Maybe<Scalars['String']>;
  upVotes: Scalars['Int'];
  updatedAt: Scalars['Time'];
};

export type Tag = {
  __typename?: 'Tag';
  description: Scalars['String'];
  isAllergy: Scalars['Boolean'];
  key: Scalars['String'];
  name: Scalars['String'];
  priority?: Maybe<Priority>;
  shortName?: Maybe<Scalars['String']>;
};

export type TagInput = {
  description: Scalars['String'];
  isAllergy: Scalars['Boolean'];
  key: Scalars['String'];
  name: Scalars['String'];
  priority?: InputMaybe<Priority>;
  shortName?: InputMaybe<Scalars['String']>;
};

export type GetOccurrenceByDateQueryVariables = Exact<{
  date: Scalars['Time'];
}>;

export type GetOccurrenceByDateQuery = {
  __typename?: 'Query';
  getOccurrencesByDate: Array<{
    __typename?: 'Occurrence';
    id: string;
    date: string;
    priceStudent: number;
    priceStaff: number;
    priceGuest: number;
    dish: { __typename?: 'Dish'; id: string; name: string };
    sideDishes: Array<{ __typename?: 'Dish'; id: string; name: string }>;
    tags: Array<{
      __typename?: 'Tag';
      shortName?: string | null;
      priority?: Priority | null;
    }>;
  }>;
};
