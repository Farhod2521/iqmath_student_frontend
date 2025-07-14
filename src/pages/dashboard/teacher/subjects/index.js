import { useTranslation } from "react-i18next";
import { useSession } from "next-auth/react";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import ContentLoader from "@/components/loader/content-loader";
import MainWrapper from '@/layout/MainWrapper'

const SubjectsPage = () => {
  const { t } = useTranslation();
  const { data: session } = useSession();

  const { data: subjects, isLoading } = useGetQuery({
    key: KEYS.teacherSubjects,
    url: URLS.teacherSubjects,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    enabled: !!session?.accessToken,
  });

  if (isLoading) {
    return <ContentLoader />;
  }

  return (
    <MainWrapper title={t('subjects')}>
      <div className="p-6 md:p-8 font-sf">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('subjects')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {t('manage your subjects')}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          {subjects?.data?.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {subjects.data.map((subject, index) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {subject.name || subject.subject_name || 'N/A'}
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {subject.status || 'Active'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {subject.description || subject.subject_description || 'No description available'}
                  </p>
                  {subject.students_count && (
                    <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                      {t('students')}: {subject.students_count}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                {t('no subjects found')}
              </p>
            </div>
          )}
        </div>
      </div>
    </MainWrapper>
  );
};

export default SubjectsPage; 