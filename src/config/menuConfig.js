import SubjectIcon from '@/components/icons/subjects'
import DiagnosticsIcon from '@/components/icons/diagnostics'
import IndividualIcon from '@/components/icons/individual'
import PupilProfileIcon from '@/components/icons/pupil'
import CoinsIcon from '@/components/icons/coins'
import TeacherPupilIcon from '@/components/icons/teacher-pupil'
import GraduationHatIcon from '@/components/icons/graduation-hat.js'
import StudentExamplesIcon from '@/components/icons/student-examples.js'
import ProductsIcon from '@/components/icons/products'
import Image from 'next/image'

export const createMenuConfig = (t) => ({
  student: {
    main: [
      {
        key: 'main',
        path: '/dashboard/student/subjects',
        label: t('subjects'),
        icon: <SubjectIcon />,
        activeIcon: <Image src="/icons/statistics.svg" alt="chevron-down" width={24} height={24} />
      },
      {
        key: 'diagnostics',
        path: '/dashboard/student/diagnostics',
        label: t('diagnostics'),
        icon: <DiagnosticsIcon />,
        activeIcon: <Image src="/icons/chevron-down.svg" alt="chevron-down" width={24} height={24} />
      },
      {
        key: 'recommendation',
        path: '/dashboard/student/recommendations',
        label: t('recommendation'),
        icon: <IndividualIcon />,
        activeIcon: <Image src="/icons/chevron-down.svg" alt="chevron-down" width={24} height={24} />
      },
      {
        key: 'products',
        label: t('products'),
        icon: <ProductsIcon />,
        activeIcon: <Image src="/icons/chevron-down.svg" alt="chevron-down" width={24} height={24} />,
        children: [
          {
            key: 'all-products',
            path: '/dashboard/student/products',
            label: t('allProducts'),
            icon: <ProductsIcon />
          },
          {
            key: 'purchased-products',
            path: '/dashboard/student/purchased-products',
            label: t('purchasedProducts'),
            icon: <ProductsIcon />
          }
        ]
      }
    ],
    account: [
      {
        key: 'profile',
        path: '/dashboard/student/profile',
        label: t('profile'),
        icon: <PupilProfileIcon />,
        activeIcon: <Image src="/icons/chevron-down.svg" alt="chevron-down" width={24} height={24} />
      },
      {
        key: 'coins',
        path: '/dashboard/student/coins',
        label: t('points'),
        icon: <CoinsIcon />,
        activeIcon: <Image src="/icons/chevron-down.svg" alt="chevron-down" width={24} height={24} />
      }
    ]
  },
  teacher: {
    main: [
      {
        key: 'statistics',
        path: '/dashboard/teacher/statistics',
        label: t('statistics'),
        icon: <Image src="/icons/statistics.svg" alt="statistics" width={28} height={28} />,
        activeIcon: <Image src="/icons/chevron-down.svg" alt="chevron-down" width={24} height={24} />
      },
      {
        key: 'pupils',
        path: '/dashboard/teacher/pupils',
        label: t('students'),
        icon: <TeacherPupilIcon />,
        activeIcon: <Image src="/icons/chevron-down.svg" alt="chevron-down" width={24} height={24} />
      },
      {
        key: 'subjects',
        path: '/dashboard/teacher/subjects',
        label: t('subjects'),
        icon: <SubjectIcon />,
        activeIcon: <Image src="/icons/chevron-down.svg" alt="chevron-down" width={24} height={24} />
      },
      {
        key: 'my-study',
        path: '/dashboard/teacher/my-study',
        label: t('groups'),
        icon: <GraduationHatIcon />,
        activeIcon: <Image src="/icons/chevron-down.svg" alt="chevron-down" width={24} height={24} />
      },
      {
        key: 'individual',
        path: '/dashboard/teacher/individual',
        label: t('independent'),
        icon: <IndividualIcon />,
        activeIcon: <Image src="/icons/chevron-down.svg" alt="chevron-down" width={24} height={24} />
      },
      {
        key: 'student-examples',
        path: '/dashboard/teacher/student-examples',
        label: t('studentExamples'),
        icon: <StudentExamplesIcon />,
        activeIcon: <Image src="/icons/chevron-down.svg" alt="chevron-down" width={24} height={24} />
      },
      {
        key: 'parents',
        path: '/dashboard/teacher/parents',
        label: t('parents'),
        icon: <Image src="/icons/pupil.svg" alt="parents" width={28} height={28} />,
        activeIcon: <Image src="/icons/chevron-down.svg" alt="chevron-down" width={24} height={24} />
      }
    ],
    account: [
      {
        key: 'profile',
        path: '/dashboard/teacher/profile',
        label: t('profile'),
        icon: <PupilProfileIcon />,
        activeIcon: <Image src="/icons/chevron-down.svg" alt="chevron-down" width={24} height={24} />
      }
    ]
  },
  parent: {
    main: [
      {
        key: 'my-children',
        path: '/dashboard/parent/my-children',
        label: t('myChildren'),
        icon: <Image src="/icons/pupil.svg" alt="my-children" width={28} height={28} />,
        activeIcon: <Image src="/icons/chevron-down.svg" alt="chevron-down" width={24} height={24} />
      }
    ],
    account: [
      {
        key: 'parent-profile',
        path: '/dashboard/parent/profile',
        label: t('profile'),
        icon: <PupilProfileIcon />,
        activeIcon: <Image src="/icons/chevron-down.svg" alt="chevron-down" width={24} height={24} />
      }
    ]
  }
}) 