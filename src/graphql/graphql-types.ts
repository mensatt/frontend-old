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
  Date: string;
  Timestamp: string;
  UUID: string;
  Upload: string;
};

export type AddImagesToReviewInput = {
  images: Array<ImageInput>;
  review: Scalars['UUID'];
};

export type AddSideDishToOccurrenceInput = {
  dish: Scalars['UUID'];
  occurrence: Scalars['UUID'];
};

export type AddTagToOccurrenceInput = {
  occurrence: Scalars['UUID'];
  tag: Scalars['String'];
};

export type CreateDishAliasInput = {
  aliasName: Scalars['String'];
  dish: Scalars['UUID'];
  normalizedAliasName: Scalars['String'];
};

export type CreateDishInput = {
  nameDe: Scalars['String'];
  nameEn?: InputMaybe<Scalars['String']>;
};

export type CreateOccurrenceInput = {
  carbohydrates?: InputMaybe<Scalars['Int']>;
  date: Scalars['Date'];
  dish: Scalars['UUID'];
  fat?: InputMaybe<Scalars['Int']>;
  fiber?: InputMaybe<Scalars['Int']>;
  kcal?: InputMaybe<Scalars['Int']>;
  kj?: InputMaybe<Scalars['Int']>;
  location: Scalars['UUID'];
  priceGuest?: InputMaybe<Scalars['Int']>;
  priceStaff?: InputMaybe<Scalars['Int']>;
  priceStudent?: InputMaybe<Scalars['Int']>;
  protein?: InputMaybe<Scalars['Int']>;
  salt?: InputMaybe<Scalars['Int']>;
  saturatedFat?: InputMaybe<Scalars['Int']>;
  sideDishes?: InputMaybe<Array<Scalars['UUID']>>;
  status: OccurrenceStatus;
  sugar?: InputMaybe<Scalars['Int']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type CreateReviewInput = {
  displayName?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<Array<ImageInput>>;
  occurrence: Scalars['UUID'];
  stars: Scalars['Int'];
  text?: InputMaybe<Scalars['String']>;
};

export type CreateTagInput = {
  description: Scalars['String'];
  isAllergy?: InputMaybe<Scalars['Boolean']>;
  key: Scalars['String'];
  name: Scalars['String'];
  priority?: InputMaybe<Priority>;
  shortName?: InputMaybe<Scalars['String']>;
};

export type DeleteDishAliasInput = {
  alias: Scalars['String'];
};

export type DeleteImageToReviewInput = {
  id: Scalars['UUID'];
  review: Scalars['UUID'];
};

export type DeleteOccurrenceInput = {
  id: Scalars['UUID'];
};

export type DeleteReviewInput = {
  id: Scalars['UUID'];
};

export type Dish = {
  __typename?: 'Dish';
  aliases: Array<Scalars['String']>;
  id: Scalars['UUID'];
  nameDe: Scalars['String'];
  nameEn?: Maybe<Scalars['String']>;
  reviewData: ReviewDataDish;
};

export type DishReviewDataArgs = {
  filter?: InputMaybe<ReviewFilter>;
};

export type DishAlias = {
  __typename?: 'DishAlias';
  aliasName: Scalars['String'];
  dish: Scalars['UUID'];
  normalizedAliasName: Scalars['String'];
};

export type Image = {
  __typename?: 'Image';
  id: Scalars['UUID'];
  imageUrl: Scalars['String'];
  review: Review;
};

export type ImageInput = {
  image: Scalars['Upload'];
};

export type Location = {
  __typename?: 'Location';
  externalId: Scalars['Int'];
  id: Scalars['UUID'];
  name: Scalars['String'];
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addSideDishToOccurrence: OccurrenceSideDish;
  addTagToOccurrence: OccurrenceTag;
  createDish: Dish;
  createDishAlias: DishAlias;
  createOccurrence: Occurrence;
  createReview: Review;
  createTag: Tag;
  deleteDishAlias: DishAlias;
  deleteOccurrence: Occurrence;
  deleteReview: Review;
  loginUser: Scalars['String'];
  removeSideDishFromOccurrence: OccurrenceSideDish;
  removeTagFromOccurrence: OccurrenceTag;
  setReviewApproval: Review;
  updateDish: Dish;
  updateDishAlias: DishAlias;
  updateOccurrence: Occurrence;
  updateReview: Review;
};

export type MutationAddSideDishToOccurrenceArgs = {
  input: AddSideDishToOccurrenceInput;
};

export type MutationAddTagToOccurrenceArgs = {
  input: AddTagToOccurrenceInput;
};

export type MutationCreateDishArgs = {
  input: CreateDishInput;
};

export type MutationCreateDishAliasArgs = {
  input: CreateDishAliasInput;
};

export type MutationCreateOccurrenceArgs = {
  input: CreateOccurrenceInput;
};

export type MutationCreateReviewArgs = {
  input: CreateReviewInput;
};

export type MutationCreateTagArgs = {
  input: CreateTagInput;
};

export type MutationDeleteDishAliasArgs = {
  input: DeleteDishAliasInput;
};

export type MutationDeleteOccurrenceArgs = {
  input: DeleteOccurrenceInput;
};

export type MutationDeleteReviewArgs = {
  input: DeleteReviewInput;
};

export type MutationLoginUserArgs = {
  input: LoginUserInput;
};

export type MutationRemoveSideDishFromOccurrenceArgs = {
  input: RemoveSideDishFromOccurrenceInput;
};

export type MutationRemoveTagFromOccurrenceArgs = {
  input: RemoveTagFromOccurrenceInput;
};

export type MutationSetReviewApprovalArgs = {
  input: SetReviewApprovalInput;
};

export type MutationUpdateDishArgs = {
  input: UpdateDishInput;
};

export type MutationUpdateDishAliasArgs = {
  input: UpdateDishAliasInput;
};

export type MutationUpdateOccurrenceArgs = {
  input: UpdateOccurrenceInput;
};

export type MutationUpdateReviewArgs = {
  input: UpdateReviewInput;
};

export type Occurrence = {
  __typename?: 'Occurrence';
  carbohydrates?: Maybe<Scalars['Int']>;
  date: Scalars['Date'];
  dish: Dish;
  fat?: Maybe<Scalars['Int']>;
  fiber?: Maybe<Scalars['Int']>;
  id: Scalars['UUID'];
  kcal?: Maybe<Scalars['Int']>;
  kj?: Maybe<Scalars['Int']>;
  location: Location;
  priceGuest?: Maybe<Scalars['Int']>;
  priceStaff?: Maybe<Scalars['Int']>;
  priceStudent?: Maybe<Scalars['Int']>;
  protein?: Maybe<Scalars['Int']>;
  reviewData: ReviewDataOccurrence;
  salt?: Maybe<Scalars['Int']>;
  saturatedFat?: Maybe<Scalars['Int']>;
  sideDishes: Array<Dish>;
  status: OccurrenceStatus;
  sugar?: Maybe<Scalars['Int']>;
  tags: Array<Tag>;
};

export type OccurrenceReviewDataArgs = {
  filter?: InputMaybe<ReviewFilter>;
};

export type OccurrenceFilter = {
  endDate?: InputMaybe<Scalars['Date']>;
  location?: InputMaybe<Scalars['UUID']>;
  startDate?: InputMaybe<Scalars['Date']>;
  status?: InputMaybe<OccurrenceStatus>;
};

export type OccurrenceSideDish = {
  __typename?: 'OccurrenceSideDish';
  dish: Dish;
  occurrence: Occurrence;
};

export enum OccurrenceStatus {
  Approved = 'APPROVED',
  AwaitingApproval = 'AWAITING_APPROVAL',
  Confirmed = 'CONFIRMED',
  PendingDeletion = 'PENDING_DELETION',
  Updated = 'UPDATED',
}

export type OccurrenceTag = {
  __typename?: 'OccurrenceTag';
  occurrence: Occurrence;
  tag: Tag;
};

export enum Priority {
  Hide = 'HIDE',
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM',
}

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<User>;
  dishes: Array<Dish>;
  locationById: Location;
  locations: Array<Location>;
  occurrences: Array<Occurrence>;
  reviews: Array<Review>;
  tags: Array<Tag>;
  vcsBuildInfo?: Maybe<VcsBuildInfo>;
};

export type QueryLocationByIdArgs = {
  id: Scalars['UUID'];
};

export type QueryOccurrencesArgs = {
  filter?: InputMaybe<OccurrenceFilter>;
};

export type RemoveSideDishFromOccurrenceInput = {
  dish: Scalars['UUID'];
  occurrence: Scalars['UUID'];
};

export type RemoveTagFromOccurrenceInput = {
  occurrence: Scalars['UUID'];
  tag: Scalars['String'];
};

export type Review = {
  __typename?: 'Review';
  acceptedAt?: Maybe<Scalars['Timestamp']>;
  createdAt: Scalars['Timestamp'];
  displayName?: Maybe<Scalars['String']>;
  downVotes: Scalars['Int'];
  id: Scalars['UUID'];
  images: Array<Image>;
  occurrence: Occurrence;
  stars: Scalars['Int'];
  text?: Maybe<Scalars['String']>;
  upVotes: Scalars['Int'];
  updatedAt: Scalars['Timestamp'];
};

export type ReviewDataDish = {
  __typename?: 'ReviewDataDish';
  images: Array<Image>;
  metadata: ReviewMetadataDish;
  reviews: Array<Review>;
};

export type ReviewDataOccurrence = {
  __typename?: 'ReviewDataOccurrence';
  images: Array<Image>;
  metadata: ReviewMetadataOccurrence;
  reviews: Array<Review>;
};

export type ReviewFilter = {
  approved?: InputMaybe<Scalars['Boolean']>;
};

export type ReviewMetadataDish = {
  __typename?: 'ReviewMetadataDish';
  averageStars?: Maybe<Scalars['Float']>;
  reviewCount: Scalars['Int'];
};

export type ReviewMetadataOccurrence = {
  __typename?: 'ReviewMetadataOccurrence';
  averageStars?: Maybe<Scalars['Float']>;
  reviewCount: Scalars['Int'];
};

export type SetReviewApprovalInput = {
  approved: Scalars['Boolean'];
  id: Scalars['UUID'];
};

export type Tag = {
  __typename?: 'Tag';
  description: Scalars['String'];
  isAllergy: Scalars['Boolean'];
  key: Scalars['String'];
  name: Scalars['String'];
  priority: Priority;
  shortName?: Maybe<Scalars['String']>;
};

export type UpdateDishAliasInput = {
  aliasName: Scalars['String'];
  dish?: InputMaybe<Scalars['UUID']>;
  newAliasName?: InputMaybe<Scalars['String']>;
  normalizedAliasName?: InputMaybe<Scalars['String']>;
};

export type UpdateDishInput = {
  id: Scalars['UUID'];
  nameDe?: InputMaybe<Scalars['String']>;
  nameEn?: InputMaybe<Scalars['String']>;
};

export type UpdateOccurrenceInput = {
  carbohydrates?: InputMaybe<Scalars['Int']>;
  date?: InputMaybe<Scalars['Date']>;
  dish?: InputMaybe<Scalars['UUID']>;
  fat?: InputMaybe<Scalars['Int']>;
  fiber?: InputMaybe<Scalars['Int']>;
  id: Scalars['UUID'];
  kcal?: InputMaybe<Scalars['Int']>;
  kj?: InputMaybe<Scalars['Int']>;
  priceGuest?: InputMaybe<Scalars['Int']>;
  priceStaff?: InputMaybe<Scalars['Int']>;
  priceStudent?: InputMaybe<Scalars['Int']>;
  protein?: InputMaybe<Scalars['Int']>;
  salt?: InputMaybe<Scalars['Int']>;
  saturatedFat?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<OccurrenceStatus>;
  sugar?: InputMaybe<Scalars['Int']>;
};

export type UpdateReviewInput = {
  approved?: InputMaybe<Scalars['Boolean']>;
  displayName?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  occurrence?: InputMaybe<Scalars['UUID']>;
  stars?: InputMaybe<Scalars['Int']>;
  text?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['UUID'];
};

export type VcsBuildInfo = {
  __typename?: 'VcsBuildInfo';
  commit: Scalars['String'];
  commitTime: Scalars['String'];
  modified: Scalars['String'];
};

export type LoginUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;

export type LoginUserMutation = { __typename?: 'Mutation'; loginUser: string };

export type SetOccurrenceStatusMutationVariables = Exact<{
  id: Scalars['UUID'];
  status: OccurrenceStatus;
}>;

export type SetOccurrenceStatusMutation = {
  __typename?: 'Mutation';
  updateOccurrence: {
    __typename?: 'Occurrence';
    id: string;
    status: OccurrenceStatus;
    date: string;
    dish: { __typename?: 'Dish'; nameDe: string };
  };
};

export type GetAdminPanelOccurrencesQueryVariables = Exact<{
  date: Scalars['Date'];
}>;

export type GetAdminPanelOccurrencesQuery = {
  __typename?: 'Query';
  occurrences: Array<{
    __typename?: 'Occurrence';
    id: string;
    status: OccurrenceStatus;
    date: string;
    dish: { __typename?: 'Dish'; nameDe: string };
  }>;
};

export type GetOccurrencesByDateQueryVariables = Exact<{
  date: Scalars['Date'];
}>;

export type GetOccurrencesByDateQuery = {
  __typename?: 'Query';
  occurrences: Array<{
    __typename?: 'Occurrence';
    id: string;
    date: string;
    priceStudent?: number | null;
    priceStaff?: number | null;
    priceGuest?: number | null;
    dish: {
      __typename?: 'Dish';
      id: string;
      nameDe: string;
      nameEn?: string | null;
      reviewData: {
        __typename?: 'ReviewDataDish';
        reviews: Array<{
          __typename?: 'Review';
          id: string;
          displayName?: string | null;
          text?: string | null;
          acceptedAt?: string | null;
          createdAt: string;
          images: Array<{ __typename?: 'Image'; id: string; imageUrl: string }>;
        }>;
        metadata: {
          __typename?: 'ReviewMetadataDish';
          averageStars?: number | null;
          reviewCount: number;
        };
      };
    };
    sideDishes: Array<{ __typename?: 'Dish'; id: string; nameDe: string }>;
    tags: Array<{
      __typename?: 'Tag';
      key: string;
      name: string;
      description: string;
      shortName?: string | null;
      priority: Priority;
      isAllergy: boolean;
    }>;
  }>;
};
