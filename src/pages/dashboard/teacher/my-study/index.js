import { useTranslation } from "react-i18next";
import { useSession } from "next-auth/react";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import ContentLoader from "@/components/loader/content-loader";
import MainWrapper from '@/layout/MainWrapper'

const MyStudyPage = () => {
  const { t } = useTranslation();
  const { data: session } = useSession();

  const { data: groups, isLoading } = useGetQuery({
    key: KEYS.teacherGroups,
    url: URLS.teacherGroups,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    enabled: !!session?.accessToken,
  });

  if (isLoading) {
    return <ContentLoader />;
  }

  return (
    <MainWrapper title={t('groups')}>
      <div className="p-6 md:p-8 font-sf">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('groups')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {t('manage your study groups')}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          {groups?.data?.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {groups.data.map((group, index) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {group.name || group.group_name || 'N/A'}
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {group.status || 'Active'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {group.description || group.group_description || 'No description available'}
                  </p>
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>{t('students')}: {group.students_count || 0}</span>
                    <span>{t('subjects')}: {group.subjects_count || 0}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                {t('no groups found')}
              </p>
            </div>
          )}
        </div>
      </div>
    </MainWrapper>
  );
};

export default MyStudyPage; 