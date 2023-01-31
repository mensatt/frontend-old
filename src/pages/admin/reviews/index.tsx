import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import React, { useMemo, useState } from 'react';
import Popup from 'reactjs-popup';
import Modal from 'src/components/modal';
import OccurrenceRating from 'src/components/occurrence/rating';
import Table, { TableDataRow, TableHeaderRow } from 'src/components/table';
import {
  DeleteReviewMutation,
  DeleteReviewMutationVariables,
  GetAdminPanelReviewsQuery,
  SetReviewApprovalStatusMutation,
  SetReviewApprovalStatusMutationVariables,
} from 'src/graphql/graphql-types';
import { DELETE_REVIEW } from 'src/graphql/mutations';
import { GET_NAVIGATION, Navigation } from 'src/graphql/queries';
import { backendImageLoader } from 'src/util/imageLoader';

import { useMutation, useQuery } from '@apollo/client';

import styles from './page.module.scss';
import { SET_REVIEW_APPROVAL_STATUS } from 'src/graphql/mutations/setReviewApprovalStatus.gql';
import { GET_ADMIN_PANEL_REVIEWS } from 'src/graphql/queries/getAdminPanelReviews.gql';

const AdminReviewsPage: NextPage = () => {
  const { t } = useTranslation('common');

  const [onlyShowApprovedReviews, setOnlyShowApprovedReviews] = useState(false);

  const { data: navData } = useQuery<Navigation>(GET_NAVIGATION);

  const [deleteReview, { loading: deletionLoading }] = useMutation<
    DeleteReviewMutation,
    DeleteReviewMutationVariables
  >(DELETE_REVIEW, {
    refetchQueries: [
      {
        query: GET_ADMIN_PANEL_REVIEWS,
      },
    ],
  });

  const { data, loading, error } = useQuery<
    GetAdminPanelReviewsQuery,
    GetAdminPanelReviewsQuery
  >(GET_ADMIN_PANEL_REVIEWS);

  // TODO: Filtering for unapproved reviews should be done by the backend
  // (similar to how it is done with the occurrences), but at the time of writing
  // the API was missing support for it.
  // Should be removed/replaced when https://github.com/mensatt/backend/issues/110 is closed
  const filteredReviews = useMemo(
    () =>
      data?.reviews.filter(
        (review) => !!review.acceptedAt === onlyShowApprovedReviews,
      ),
    [data?.reviews, onlyShowApprovedReviews],
  );

  const [setReviewApprovalStatus, { loading: mutationLoading }] = useMutation<
    SetReviewApprovalStatusMutation,
    SetReviewApprovalStatusMutationVariables
  >(SET_REVIEW_APPROVAL_STATUS, {
    // TODO: In the future it might be better to just update the apollo cache
    // if the mutation was successful instead of refetching the data.
    refetchQueries: [
      {
        query: GET_ADMIN_PANEL_REVIEWS,
      },
    ],
  });

  const headerRows = useMemo<TableHeaderRow[]>(
    () => [
      { fieldName: 'dishName', displayName: 'Dish' },
      { fieldName: 'author', displayName: 'Author' },
      { fieldName: 'comment', displayName: 'Comment' },
      { fieldName: 'rating', displayName: 'Rating' },
      { fieldName: 'image', displayName: 'Image' },
      {
        fieldName: 'approvalStatus',
        displayName: 'Approval Status',
        filterComp: (
          <button
            onClick={() => setOnlyShowApprovedReviews(!onlyShowApprovedReviews)}
          >
            Only show {onlyShowApprovedReviews ? '' : 'un'}approved reviews
          </button>
        ),
      },
      {
        fieldName: 'delete',
        displayName: 'Delete',
        nonSortable: true,
      },
    ],
    [onlyShowApprovedReviews],
  );

  const backendUrlBase = useMemo(() => {
    const { protocol, hostname } = new URL(
      navData?.backends[navData.activeBackendIdx].url ||
        'https://api.mensatt.de/v1/graphql',
    );
    return `${protocol}//${hostname}`;
  }, [navData]);

  const rows: TableDataRow[] = useMemo(() => {
    if (!filteredReviews || filteredReviews.length < 1) return [];

    return filteredReviews.map((elem) => ({
      dishName: elem.occurrence.dish.nameDe,
      author: elem.displayName || t('noAuthorName'),
      comment: elem.text || '<NULL>',
      rating: {
        node: (
          <OccurrenceRating
            metadata={{
              averageStars: elem.stars,
              reviewCount: 1,
            }}
            hideAmount
          />
        ),
        value: elem.stars,
      },
      image: {
        node:
          elem.images.length > 0 ? (
            <Popup trigger={<button>Show images</button>} modal>
              <Modal>
                <h1>
                  {t('imageDescription', {
                    name: elem.occurrence.dish.nameDe,
                    author: elem.displayName || t('noAuthorName'),
                  })}
                </h1>
                <div className={styles.image}>
                  <Image
                    src={backendUrlBase + elem.images[0].imageUrl}
                    alt={t('imageDescription', {
                      name: elem.occurrence.dish.nameDe,
                      author: elem.displayName || t('noAuthorName'),
                    })}
                    layout={'fill'}
                    objectFit="contain"
                    loader={backendImageLoader}
                  />
                </div>
              </Modal>
            </Popup>
          ) : (
            'no images'
          ),
        value: elem.images.length > 0 ? elem.images[0].id : '',
      },
      approvalStatus: {
        node: (
          <button
            disabled={mutationLoading || deletionLoading}
            onClick={() =>
              setReviewApprovalStatus({
                variables: {
                  id: elem.id,
                  approved: !elem.acceptedAt,
                },
              })
            }
          >
            {elem.acceptedAt ? 'Unapprove' : 'Approve'}
          </button>
        ),
        value: elem.acceptedAt || '0',
      },
      delete: {
        node: (
          <button
            disabled={mutationLoading || deletionLoading}
            onClick={() => deleteReview({ variables: { id: elem.id } })}
            style={{
              backgroundColor: 'red',
            }}
          >
            Delete this review
          </button>
        ),
        value: 'delete',
      },
    }));
  }, [
    filteredReviews,
    t,
    backendUrlBase,
    mutationLoading,
    deletionLoading,
    setReviewApprovalStatus,
    deleteReview,
  ]);

  return (
    <>
      {loading && t('loading')}
      {error && error.message}
      {filteredReviews && <Table headerRow={headerRows} dataRows={rows} />}
    </>
  );
};

export default AdminReviewsPage;

// TODO: This is a workaround, find a more suiting typing in the future
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['admin', 'common', 'footer'])),
      // Will be passed to the page component as props
    },
  };
}
