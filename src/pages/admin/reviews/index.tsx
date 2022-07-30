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
  GetAdminPanelReviewsQuery,
  SetReviewApprovalStatusMutation,
  SetReviewApprovalStatusMutationVariables,
} from 'src/graphql/graphql-types';
import { GET_NAVIGATION, Navigation } from 'src/graphql/queries';

import { useMutation, useQuery } from '@apollo/client';

import { SET_REVIEW_APPROVAL_STATUS } from 'src/graphql/mutations/setReviewApprovalStatus.gql';
import { GET_ADMIN_PANEL_REVIEWS } from 'src/graphql/queries/getAdminPanelReviews.gql';

const AdminReviewsPage: NextPage = () => {
  const { t } = useTranslation('common');

  const { data: navData } = useQuery<Navigation>(GET_NAVIGATION);

  const { data, loading, error } = useQuery<
    GetAdminPanelReviewsQuery,
    GetAdminPanelReviewsQuery
  >(GET_ADMIN_PANEL_REVIEWS);

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

  const [headerRows] = useState<TableHeaderRow[]>([
    { fieldName: 'dishName', displayName: 'Dish' },
    { fieldName: 'author', displayName: 'Author' },
    { fieldName: 'comment', displayName: 'Comment' },
    { fieldName: 'rating', displayName: 'Rating' },
    { fieldName: 'image', displayName: 'Image' },
    { fieldName: 'approvalStatus', displayName: 'Approval Status' },
  ]);

  const backendUrlBase = useMemo(() => {
    const { protocol, hostname } = new URL(
      navData
        ? navData.mensas[navData.activeMensaIdx].url
        : 'https://api.mensatt.de/v1/graphql',
    );
    return `${protocol}//${hostname}`;
  }, [navData]);

  const rows: TableDataRow[] = useMemo(() => {
    if (!data || data.reviews.length < 1) return [];

    return data.reviews.map((elem) => ({
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
            <Popup trigger={<button>Show image</button>} modal>
              <Modal>
                <h1>
                  {t('imageDescription', {
                    name: elem.occurrence.dish.nameDe,
                    author: elem.displayName || t('noAuthorName'),
                  })}
                </h1>
                <div
                  style={{
                    height: '200pt',
                    position: 'relative',
                  }}
                >
                  <Image
                    src={backendUrlBase + elem.images[0].imageUrl}
                    alt={t('imageDescription', {
                      name: elem.occurrence.dish.nameDe,
                      author: elem.displayName || t('noAuthorName'),
                    })}
                    layout={'fill'}
                    objectFit="contain"
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
            disabled={mutationLoading}
            onClick={() =>
              setReviewApprovalStatus({
                variables: {
                  id: elem.id,
                  approved: !elem.acceptedAt,
                },
              })
            }
          >
            {elem.acceptedAt ? 'Unapprove' : 'approve'}
          </button>
        ),
        value: elem.acceptedAt || '0',
      },
    }));
  }, [backendUrlBase, data, mutationLoading, setReviewApprovalStatus, t]);

  return (
    <>
      {loading && t('loading')}
      {error && error.message}
      {data && <Table headerRow={headerRows} dataRows={rows} />}
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
