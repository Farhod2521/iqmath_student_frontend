import { useTranslation } from "react-i18next";
import { useSession } from "next-auth/react";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import ContentLoader from "@/components/loader/content-loader";
import MainWrapper from '@/layout/MainWrapper'

const PupilsPage = () => {
  const { t } = useTranslation();
  const { data: session } = useSession();

  const { data: pupils, isLoading } = useGetQuery({
    key: KEYS.teacherStudents,
    url: URLS.teacherStudents,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    enabled: !!session?.accessToken,
  });

  if (isLoading) {
    return <ContentLoader />;
  }

  return (
    <MainWrapper title={t('students')}>
      <div className="p-6 md:p-8 font-sf">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('students')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {t('manage your students')}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          {pupils?.data?.length > 0 ? (
            <div className="grid gap-4">
              {pupils.data.map((pupil, index) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {pupil.name || pupil.full_name || 'N/A'}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {pupil.phone || pupil.phone_number || 'N/A'}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        {pupil.status || 'Active'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                {t('no students found')}
              </p>
            </div>
          )}
        </div>
      </div>
    </MainWrapper>
  );
};

export default PupilsPage; 