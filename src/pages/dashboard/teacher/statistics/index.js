import MainWrapper from '@/layout/MainWrapper'
import Statistics from "@/modules/teacher/statistics/Statistics";
import { useTranslation } from 'react-i18next'

function Index() {
  const { t } = useTranslation()
  
  return (
    <MainWrapper title={t('statistics')}>
      <Statistics />
    </MainWrapper>
  );
}

export default Index;
