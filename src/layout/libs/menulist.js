import { LuBookText, LuUser } from 'react-icons/lu'
import { TbCheckbox, TbCoins } from 'react-icons/tb'
import { FaClipboardList, FaCoins, FaMoneyBillWave, FaTags } from 'react-icons/fa6'
import { BiDirections, BiTransfer } from 'react-icons/bi'
import { BsBarChart } from 'react-icons/bs'
import { GoChecklist } from 'react-icons/go'
import { PiBooksLight, PiTrophy } from 'react-icons/pi'
import { PiUsers } from 'react-icons/pi'
import { PiGraduationCap } from 'react-icons/pi'
import { FiLayers } from 'react-icons/fi'
import { LuUsers } from 'react-icons/lu'
import { LuShoppingBag } from 'react-icons/lu'
import { HiChatBubbleLeftRight } from 'react-icons/hi2'
import { PiShareNetwork } from 'react-icons/pi'
import { RiCoupon5Line } from 'react-icons/ri'
import { BookOpen } from 'lucide-react'
import { MdOutlinePayments } from 'react-icons/md'
import { FaAddressBook, FaDollarSign, FaTag } from 'react-icons/fa'
import ProductsIcon from '@/components/icons/products'
import { IoLibraryOutline } from 'react-icons/io5'

export const MenuType = { LINK: 'LINK', GROUP: 'GROUP', TITLE: 'TITLE' }

export const RolesList = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  ADMIN: 'admin',
  PARENT: 'parent',
  TUTOR: 'tutor',
  SUPERADMIN: 'superadmin'
}

export const getMenuItems = (t) => [
  {
    label: t('main'),
    roles: [
      RolesList.STUDENT,
      RolesList.ADMIN,
      RolesList.TUTOR,
      RolesList.PARENT,
      RolesList.TEACHER,
      RolesList.SUPERADMIN
    ],
    type: MenuType.TITLE
  },
  {
    key: 'main',
    path: '/dashboard/student/subjects',
    label: t('subjects'),
    icon: (isActive) => (
      <LuBookText
        className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'}
        size={26}
      />
    ),
    disabled: false,
    roles: [RolesList.STUDENT, RolesList.ADMIN, RolesList.SUPERADMIN],
    type: MenuType.LINK
  },
  {
    key: 'prices',
    label: t('prices'),
    icon: (isActive) => (
      <FaDollarSign
        className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'}
        size={26}
      />
    ),
    disabled: false,
    roles: [RolesList.SUPERADMIN],
    type: MenuType.LINK,
    children: [
      {
        key: 'subscriptionPlans',
        path: '/dashboard/prices/subscriptionPlans',
        label: t('subscriptionPlans'),
        icon: (isActive) => (
          <FaMoneyBillWave
            className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'}
            size={18}
          />
        ),
        disabled: false,
        roles: [RolesList.SUPERADMIN],
        type: MenuType.LINK
      },
      {
        key: 'category',
        path: '/dashboard/prices/category',
        label: t('category'),
        icon: (isActive) => (
          <FaClipboardList
            className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'}
            size={18}
          />
        ),
        disabled: false,
        roles: [RolesList.SUPERADMIN],
        type: MenuType.LINK
      },
      {
        key: 'benifits',
        path: '/dashboard/prices/benifits',
        label: t('benifits'),
        icon: (isActive) => (
          <FaTags
            className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'}
            size={18}
          />
        ),
        disabled: false,
        roles: [RolesList.SUPERADMIN],
        type: MenuType.LINK
      }
    ]
  },
  {
    key: 'diagnostics',
    path: '/dashboard/student/diagnostics',
    label: t('diagnostics'),
    icon: (isActive) => (
      <TbCheckbox
        className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'}
        size={26}
      />
    ),
    disabled: false,
    roles: [RolesList.STUDENT, RolesList.SUPERADMIN],
    type: MenuType.LINK
  },
  {
    key: 'diagnostics-history',
    path: '/dashboard/student/diagnostics/history',
    label: t('diagnosis_history'),
    icon: (isActive) => (
      <BookOpen
        className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'}
        size={26}
      />
    ),
    disabled: false,
    roles: [RolesList.STUDENT, RolesList.SUPERADMIN],
    type: MenuType.LINK
  },
  {
    key: 'recommended', // Diqqat: bu yerda "recommended" bo'lishi kerak
    path: '/dashboard/student/recommendations',
    label: t('recommended'),
    icon: (isActive) => (
      <BiDirections
        className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'}
        size={26}
      />
    ),
    disabled: false,
    roles: [RolesList.STUDENT, RolesList.SUPERADMIN],
    type: MenuType.LINK
  },
  // {
  //   key: 'friends',
  //   path: '/dashboard/student/friends',
  //   label: t('friends'),
  //   icon: (isActive) => (
  //     <LuUsers
  //       className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'}
  //       size={26}
  //     />
  //   ),
  //   disabled: false,
  //   roles: [RolesList.STUDENT],
  //   type: MenuType.LINK
  // },

  // {
  //   key: 'chat',
  //   path: '/dashboard/student/chat',
  //   label: t('chat'),
  //   icon: (isActive) => (
  //     <HiChatBubbleLeftRight
  //       className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'}
  //       size={26}
  //     />
  //   ),
  //   disabled: false,
  //   roles: [RolesList.STUDENT, RolesList.ADMIN, RolesList.SUPERADMIN],
  //   type: MenuType.LINK
  // },

  {
    key: 'products',
    label: t('products'),
    icon: (isActive) => (
      <LuShoppingBag
        className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'}
        size={26}
      />
    ),
    disabled: false,
    roles: [RolesList.STUDENT, RolesList.SUPERADMIN],
    type: MenuType.LINK,
    children: [
      {
        key: 'all-products',
        path: '/dashboard/student/products',
        label: t('allProducts'),
        icon: (isActive) => (
          <LuShoppingBag
            className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'}
            size={20}
          />
        )
      },
      {
        key: 'purchased-products',
        path: '/dashboard/student/purchased-products',
        label: t('purchasedProducts'),
        icon: (isActive) => (
          <LuShoppingBag
            className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'}
            size={20}
          />
        )
      }
    ]
  },

  // { asadbek
  //   key: 'products-exchange',
  //   path: '/dashboard/teacher/purchased-products',
  //   label: t('purchasedProducts'),
  //   icon: (isActive) => (
  //     <ProductsIcon
  //       className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'}
  //       size={20}
  //     />
  //   ),
  //   roles: [RolesList.TEACHER, RolesList.SUPERADMIN],
  //   type: MenuType.LINK
  // },
  {
    key: 'statistics',
    path: '/dashboard/teacher/statistics',
    label: t('statistics'),
    icon: (isActive) => (
      <BsBarChart
        className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'}
        size={26}
      />
    ),
    roles: [RolesList.TEACHER, RolesList.ADMIN, RolesList.SUPERADMIN],
    type: MenuType.LINK
  },
  {
    key: 'pupils',
    path: '/dashboard/teacher/pupils',
    label: t('users'),
    icon: (isActive) => (
      <PiUsers
        className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'}
        size={26}
      />
    ),
    roles: [RolesList.TEACHER, RolesList.ADMIN, RolesList.SUPERADMIN],
    type: MenuType.LINK
  },
  // {
  //   key: 'mental-games',
  //   path: '/dashboard/games',
  //   label: t('games.section.title'),
  //   icon: (isActive) => (
  //     <PiUsers
  //       className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'}
  //       size={26}
  //     />
  //   ),
  //   roles: [
  //     RolesList.TEACHER,
  //     RolesList.ADMIN,
  //     RolesList.SUPERADMIN,
  //     RolesList.TUTOR,
  //     RolesList.STUDENT,
  //     RolesList.PARENT
  //   ],
  //   type: MenuType.LINK
  // },

  {
    key: 'library',
    path: '/dashboard/library',
    label: t('library.page_title'),
    icon: (isActive) => (
      <IoLibraryOutline
        className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'}
        size={26}
      />
    ),
    roles: [RolesList.TUTOR, RolesList.TEACHER, RolesList.STUDENT, RolesList.SUPERADMIN],
    type: MenuType.LINK
  },
  {
    key: 'subjects',
    path: '/dashboard/teacher/subjects',
    label: t('subjects'),
    icon: (isActive) => (
      <PiBooksLight
        className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'}
        size={26}
      />
    ),
    roles: [RolesList.TEACHER, RolesList.ADMIN, RolesList.SUPERADMIN],
    type: MenuType.LINK
  },
  // {
  //   key: 'my-study',
  //   path: '/dashboard/teacher/my-study',
  //   label: t('groups'),
  //   icon: (isActive) => (
  //     <PiGraduationCap
  //       className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'}
  //       size={26}
  //     />
  //   ),
  //   roles: [RolesList.TEACHER, RolesList.ADMIN, RolesList.SUPERADMIN],
  //   type: MenuType.LINK
  // },
  // {
  //   key: 'individual',
  //   path: '/dashboard/teacher/individual',
  //   label: t('independent'),
  //   icon: (isActive) => (
  //     <GoChecklist
  //       className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'}
  //       size={26}
  //     />
  //   ),
  //   roles: [RolesList.TEACHER, RolesList.ADMIN, RolesList.SUPERADMIN],
  //   type: MenuType.LINK
  // },
  {
    key: 'chat',
    path: '/dashboard/student/chat/chat-box',
    label: t('chat'),
    icon: (isActive) => (
      <HiChatBubbleLeftRight
        className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'}
        size={26}
      />
    ),
    disabled: false,
    roles: [RolesList.STUDENT, RolesList.TEACHER, RolesList.TUTOR, RolesList.SUPERADMIN],
    type: MenuType.LINK
  },
  {
    key: 'ratings',
    path: '/dashboard/ratings',
    label: t('ratings'),
    icon: (isActive) => (
      <PiTrophy
        className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'}
        size={26}
      />
    ),
    roles: [
      RolesList.TEACHER,
      RolesList.ADMIN,
      RolesList.SUPERADMIN,
      RolesList.TUTOR,
      RolesList.STUDENT,
      RolesList.PARENT
    ],
    type: MenuType.LINK
  },
  {
    key: 'student-examples',
    path: '/dashboard/teacher/student-examples',
    label: t('studentExamples'),
    icon: (isActive) => (
      <FiLayers
        className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'}
        size={26}
      />
    ),
    roles: [RolesList.TEACHER, RolesList.ADMIN, RolesList.SUPERADMIN],
    type: MenuType.LINK
  },
  {
    key: 'payments-total',
    path: '/dashboard/teacher/payments',
    label: t('payments'),
    icon: (isActive) => (
      <MdOutlinePayments
        className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'}
        size={26}
      />
    ),
    roles: [RolesList.TEACHER, RolesList.ADMIN, RolesList.SUPERADMIN],
    type: MenuType.LINK
  },

  // Parent role menu items
  // { label: t('main'), roles: [RolesList.PARENT, RolesList.SUPERADMIN], type: MenuType.TITLE },
  {
    key: 'my-children',
    path: '/dashboard/parent/my-children',
    label: t('myChildren'),
    icon: (isActive) => (
      <LuUsers
        className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'}
        size={26}
      />
    ),
    roles: [RolesList.PARENT, RolesList.SUPERADMIN],
    type: MenuType.LINK,
    activePatterns: ['/dashboard/parent/my-children'] // Bu path bilan boshlanadigan barcha routelar
  },
  {
    key: 'my-children-results',
    path: '/dashboard/parent/results',
    label: t('science_results'),
    icon: (isActive) => (
      <FaAddressBook
        className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'}
        size={26}
      />
    ),
    roles: [RolesList.PARENT, RolesList.SUPERADMIN],
    type: MenuType.LINK
  },
  {
    key: 'tutor-referrals',
    path: '/dashboard/tutor/referrals',
    label: t('via_link'),
    icon: (isActive) => (
      <PiShareNetwork
        className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'}
        size={26}
      />
    ),
    roles: [RolesList.TUTOR, RolesList.ADMIN, RolesList.STUDENT, RolesList.SUPERADMIN],
    type: MenuType.LINK
  },
  {
    key: 'cupon-users',
    path: '/dashboard/cupons/users', //
    label: t('users_with_coupons'),
    icon: (isActive) => (
      <LuUsers
        className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'}
        size={26}
      />
    ),
    roles: [RolesList.TUTOR, RolesList.ADMIN, RolesList.STUDENT, RolesList.SUPERADMIN],
    type: MenuType.LINK
  },
  {
    key: 'cupon-list',
    path: '/dashboard/cupons/list',
    label: t('coupons'),
    icon: (isActive) => (
      <RiCoupon5Line
        className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'}
        size={26}
      />
    ),
    disabled: false,
    roles: [RolesList.STUDENT, RolesList.TEACHER, RolesList.TUTOR, RolesList.ADMIN, RolesList.SUPERADMIN],
    type: MenuType.LINK
  },
  {
    key: 'payment-panel',
    path: '/dashboard/tutor/payment',
    label: t('tutorPayments.paymentpanel'),
    icon: (isActive) => (
      <MdOutlinePayments
        className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'}
        size={26}
      />
    ),
    disabled: false,
    roles: [RolesList.TUTOR, RolesList.ADMIN],
    type: MenuType.LINK
  },
  { roles: [RolesList.STUDENT, RolesList.TEACHER, RolesList.SUPERADMIN], type: MenuType.GROUP },
  {
    key: 'coins',
    path: '/dashboard/student/coins',
    label: t('points'),
    icon: (isActive) => (
      <FaCoins
        className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'}
        size={26}
      />
    ),
    disabled: false,
    roles: [RolesList.STUDENT, RolesList.SUPERADMIN],
    type: MenuType.LINK
  },
  {
    key: 'ball-coins-history',
    path: '/dashboard/student/ball-coins-history',
    label: t('pointsHistory'),
    icon: (isActive) => (
      <TbCoins
        className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'}
        size={26}
      />
    ),
    disabled: false,
    roles: [RolesList.STUDENT, RolesList.SUPERADMIN],
    type: MenuType.LINK
  },

  {
    key: 'finance-transfer',
    path: '/dashboard/student/finance-transfer',
    label: t('transferMoney'),
    icon: (isActive) => (
      <BiTransfer
        className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'}
        size={26}
      />
    ),
    disabled: false,
    roles: [RolesList.STUDENT],
    type: MenuType.LINK
  },
  {
    key: 'teacher-profile',
    path: '/dashboard/teacher/profile',
    label: t('profile'),
    icon: (isActive) => (
      <LuUser
        className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'}
        size={26}
      />
    ),
    disabled: false,
    roles: [RolesList.TEACHER, RolesList.ADMIN],
    type: MenuType.LINK
  },
  {
    key: 'profile',
    path: '/dashboard/student/profile',
    label: t('profile'),
    icon: (isActive) => (
      <LuUser
        className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'}
        size={26}
      />
    ),
    disabled: false,
    roles: [RolesList.STUDENT],
    type: MenuType.LINK
  },
  // {
  //   key: 'profile',
  //   path: '/dashboard/student/convert',
  //   label: t('profile'),
  //   icon: (isActive) => (
  //     <LuUser
  //       className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'}
  //       size={26}
  //     />
  //   ),
  //   disabled: false,
  //   roles: [RolesList.STUDENT],
  //   type: MenuType.LINK
  // },
  {
    key: 'parent-profile',
    path: '/dashboard/parent/profile',
    label: t('profile'),
    icon: (isActive) => (
      <LuUser
        className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'}
        size={26}
      />
    ),
    roles: [RolesList.PARENT],
    type: MenuType.LINK
  },
  {
    key: 'tutor-profile',
    path: '/dashboard/tutor/profile',
    label: t('profile'),
    icon: (isActive) => (
      <LuUser
        className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'}
        size={26}
      />
    ),
    roles: [RolesList.TUTOR],
    type: MenuType.LINK
  }
]

export const getMenuItemClasses = (isActive, disabled) => {
  const base =
    'flex gap-x-[10px] items-center py-[10px] px-[12px] rounded-[8px] transition-all duration-300 font-medium text-[15px] group'
  const active = 'bg-[#5D87FF] text-white'
  const inactive =
    'text-[#5A6A85] dark:bg-[#202936] hover:bg-[#4463bb] hover:text-white dark:hover:bg-[#4463bb] dark:text-white'
  const disabledCls = 'opacity-50 cursor-not-allowed pointer-events-none'
  return `${base} ${disabled ? disabledCls : isActive ? active : inactive}`
}
