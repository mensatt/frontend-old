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
  aliases: Array<Scalars['String']>;
  id: Scalars['UUID'];
  name: Scalars['String'];
};

export type DishAlias = {
  __typename?: 'DishAlias';
  aliasName: Scalars['String'];
  dish: Scalars['UUID'];
};

export type EditOccurrenceInput = {
  carbohydrates?: InputMaybe<Scalars['Int']>;
  date: Scalars['Time'];
  dish: Scalars['UUID'];
  fat?: InputMaybe<Scalars['Int']>;
  fiber?: InputMaybe<Scalars['Int']>;
  kcal?: InputMaybe<Scalars['Int']>;
  kj?: InputMaybe<Scalars['Int']>;
  priceGuest?: InputMaybe<Scalars['Int']>;
  priceStaff?: InputMaybe<Scalars['Int']>;
  priceStudent?: InputMaybe<Scalars['Int']>;
  protein?: InputMaybe<Scalars['Int']>;
  reviewStatus: ReviewStatus;
  salt?: InputMaybe<Scalars['Int']>;
  saturatedFat?: InputMaybe<Scalars['Int']>;
  sugar?: InputMaybe<Scalars['Int']>;
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
  addSideDishToOccurrence: OccurrenceSideDish;
  addTagToOccurrence: OccurrenceTag;
  createAlias: DishAlias;
  createDish: Dish;
  createOccurrence: Occurrence;
  createReview: Review;
  createTag: Tag;
  deleteAlias: DishAlias;
  deleteOccurrence: Occurrence;
  editOccurrence: Occurrence;
  removeSideDishFromOccurrence: OccurrenceSideDish;
  removeTagFromOccurrence: OccurrenceTag;
  updateAlias: DishAlias;
};

export type MutationAddSideDishToOccurrenceArgs = {
  occurrenceId: Scalars['UUID'];
  sideDish: Scalars['UUID'];
};

export type MutationAddTagToOccurrenceArgs = {
  occurrenceId: Scalars['UUID'];
  tag: Scalars['String'];
};

export type MutationCreateAliasArgs = {
  alias: Scalars['String'];
  dish: Scalars['UUID'];
};

export type MutationCreateDishArgs = {
  name: Scalars['String'];
};

export type MutationCreateOccurrenceArgs = {
  input: OccurrenceInput;
};

export type MutationCreateReviewArgs = {
  review: ReviewInput;
};

export type MutationCreateTagArgs = {
  tag: TagInput;
};

export type MutationDeleteAliasArgs = {
  alias: Scalars['String'];
  dish: Scalars['UUID'];
};

export type MutationDeleteOccurrenceArgs = {
  id: Scalars['UUID'];
};

export type MutationEditOccurrenceArgs = {
  id: Scalars['UUID'];
  input: EditOccurrenceInput;
};

export type MutationRemoveSideDishFromOccurrenceArgs = {
  occurrenceId: Scalars['UUID'];
  sideDish: Scalars['UUID'];
};

export type MutationRemoveTagFromOccurrenceArgs = {
  occurrenceId: Scalars['UUID'];
  tag: Scalars['String'];
};

export type MutationUpdateAliasArgs = {
  alias: Scalars['String'];
  dish: Scalars['UUID'];
  oldAlias: Scalars['String'];
};

export type Occurrence = {
  __typename?: 'Occurrence';
  carbohydrates?: Maybe<Scalars['Int']>;
  date: Scalars['Time'];
  dish: Dish;
  fat?: Maybe<Scalars['Int']>;
  fiber?: Maybe<Scalars['Int']>;
  id: Scalars['UUID'];
  images: Array<Image>;
  kcal?: Maybe<Scalars['Int']>;
  kj?: Maybe<Scalars['Int']>;
  priceGuest?: Maybe<Scalars['Int']>;
  priceStaff?: Maybe<Scalars['Int']>;
  priceStudent?: Maybe<Scalars['Int']>;
  protein?: Maybe<Scalars['Int']>;
  reviewStatus: ReviewStatus;
  reviews: Array<Review>;
  salt?: Maybe<Scalars['Int']>;
  saturatedFat?: Maybe<Scalars['Int']>;
  sideDishes: Array<Dish>;
  sugar?: Maybe<Scalars['Int']>;
  tags: Array<Tag>;
};

export type OccurrenceInput = {
  carbohydrates?: InputMaybe<Scalars['Int']>;
  date: Scalars['Time'];
  dish: Scalars['UUID'];
  fat?: InputMaybe<Scalars['Int']>;
  fiber?: InputMaybe<Scalars['Int']>;
  kcal?: InputMaybe<Scalars['Int']>;
  kj?: InputMaybe<Scalars['Int']>;
  priceGuest?: InputMaybe<Scalars['Int']>;
  priceStaff?: InputMaybe<Scalars['Int']>;
  priceStudent?: InputMaybe<Scalars['Int']>;
  protein?: InputMaybe<Scalars['Int']>;
  reviewStatus: ReviewStatus;
  salt?: InputMaybe<Scalars['Int']>;
  saturatedFat?: InputMaybe<Scalars['Int']>;
  sideDishes?: InputMaybe<Array<Scalars['UUID']>>;
  sugar?: InputMaybe<Scalars['Int']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type OccurrenceSideDish = {
  __typename?: 'OccurrenceSideDish';
  dish: Dish;
  occurrence: Occurrence;
};

export type OccurrenceTag = {
  __typename?: 'OccurrenceTag';
  occurrence: Occurrence;
  tag: Tag;
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
  getAllOccurrences: Array<Occurrence>;
  getAllReviews: Array<Review>;
  getAllTags: Array<Tag>;
  getCurrentUser?: Maybe<User>;
  getOccurrencesByDate: Array<Occurrence>;
  login: Scalars['String'];
};

export type QueryGetOccurrencesByDateArgs = {
  date: Scalars['Time'];
};

export type QueryLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
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

export type ReviewInput = {
  displayName: Scalars['String'];
  occurrence: Scalars['UUID'];
  stars: Scalars['Int'];
  text?: InputMaybe<Scalars['String']>;
};

export enum ReviewStatus {
  Approved = 'APPROVED',
  AwaitingApproval = 'AWAITING_APPROVAL',
  Updated = 'UPDATED',
}

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
  isAllergy?: InputMaybe<Scalars['Boolean']>;
  key: Scalars['String'];
  name: Scalars['String'];
  priority?: InputMaybe<Priority>;
  shortName?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['UUID'];
};

export type GetOccurrenceForAdminPanelQueryVariables = Exact<{
  date: Scalars['Time'];
}>;

export type GetOccurrenceForAdminPanelQuery = {
  __typename?: 'Query';
  getOccurrencesByDate: Array<{
    __typename?: 'Occurrence';
    id: string;
    date: string;
    reviewStatus: ReviewStatus;
    dish: { __typename?: 'Dish'; id: string; name: string };
  }>;
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
    priceStudent?: number | null;
    priceStaff?: number | null;
    priceGuest?: number | null;
    dish: { __typename?: 'Dish'; id: string; name: string };
    sideDishes: Array<{ __typename?: 'Dish'; id: string; name: string }>;
    tags: Array<{
      __typename?: 'Tag';
      shortName?: string | null;
      priority?: Priority | null;
    }>;
  }>;
};
