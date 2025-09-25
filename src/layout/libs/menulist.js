import { LuBookText, LuUser } from 'react-icons/lu'
import { TbCheckbox } from 'react-icons/tb'
import { FaCoins } from 'react-icons/fa6'
import { BiDirections } from 'react-icons/bi'
import { BsBarChart } from 'react-icons/bs'
import { GoChecklist } from 'react-icons/go'
import { PiBooksLight } from 'react-icons/pi'
import { PiUsers } from 'react-icons/pi'
import { PiGraduationCap } from 'react-icons/pi'
import { FiLayers } from 'react-icons/fi'
import { LuUsers } from 'react-icons/lu'
import { LuShoppingBag } from 'react-icons/lu'
import { HiChatBubbleLeftRight } from 'react-icons/hi2'

export const MenuType = { LINK: 'LINK', GROUP: 'GROUP', TITLE: 'TITLE' }

export const RolesList = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  ADMIN: 'admin',
  PARENT: 'parent',
  TUTOR: 'tutor',
}

export const getMenuItems = (t) => [
  { label: t('main'), roles: [RolesList.STUDENT, RolesList.TEACHER], type: MenuType.TITLE },
  {
    key: 'main',
    path: '/dashboard/student/subjects',
    label: t('subjects'),
    icon: (isActive) => <LuBookText className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'} size={26} />,
    disabled: false,
    roles: [RolesList.STUDENT, RolesList.ADMIN],
    type: MenuType.LINK
  },
  {
    key: 'diagnostics',
    path: '/dashboard/student/diagnostics',
    label: t('diagnostics'),
    icon: (isActive) => <TbCheckbox className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'} size={26} />,
    disabled: false,
    roles: [RolesList.STUDENT],
    type: MenuType.LINK
  },
  {
    key: 'recommended', // Diqqat: bu yerda "recommended" bo'lishi kerak
    path: '/dashboard/student/recommendations',
    label: t('recommended'),
    icon: (isActive) => <BiDirections className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'} size={26} />,
    disabled: false,
    roles: [RolesList.STUDENT],
    type: MenuType.LINK
  },
  {
    key: 'friends',
    path: '/dashboard/student/friends',
    label: t('friends'),
    icon: (isActive) => <LuUsers className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'} size={26} />,
    disabled: false,
    roles: [RolesList.STUDENT],
    type: MenuType.LINK
  },
  {
    key: 'referal',
    path: '/dashboard/tutor/referal',
    label: t('referal'),
    icon: (isActive) => <LuUsers className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'} size={26} />,
    disabled: false,
    roles: [RolesList.TUTOR, RolesList.ADMIN],
    type: MenuType.LINK
  },
  {
    key: 'chat',
    path: '/dashboard/student/chat',
    label: t('chat'),
    icon: (isActive) => <HiChatBubbleLeftRight className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'} size={26} />,
    disabled: false,
    roles: [RolesList.STUDENT, RolesList.ADMIN],
    type: MenuType.LINK
  },
  {
    key: 'products',
    label: t('products'),
    icon: (isActive) => <LuShoppingBag className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'} size={26} />,
    disabled: false,
    roles: [RolesList.STUDENT],
    type: MenuType.LINK,
    children: [
      {
        key: 'all-products',
        path: '/dashboard/student/products',
        label: t('allProducts'),
        icon: (isActive) => <LuShoppingBag className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'} size={20} />
      },
      {
        key: 'purchased-products',
        path: '/dashboard/student/purchased-products',
        label: t('purchasedProducts'),
        icon: (isActive) => <LuShoppingBag className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'} size={20} />
      }
    ]
  },
  {
    key: 'statistics',
    path: '/dashboard/teacher/statistics',
    label: t('statistics'),
    icon: (isActive) => <BsBarChart className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'} size={26} />,
    roles: [RolesList.TEACHER, RolesList.ADMIN],
    type: MenuType.LINK
  },
  {
    key: 'pupils',
    path: '/dashboard/teacher/pupils',
    label: t('students'),
    icon: (isActive) => <PiUsers className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'} size={26} />, 
    roles: [RolesList.TEACHER, RolesList.ADMIN],
    type: MenuType.LINK
  },
  {
    key: 'subjects',
    path: '/dashboard/teacher/subjects',
    label: t('subjects'),
    icon: (isActive) => <PiBooksLight className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'} size={26} />,
    roles: [RolesList.TEACHER, RolesList.ADMIN],
    type: MenuType.LINK
  },
  {
    key: 'my-study',
    path: '/dashboard/teacher/my-study',
    label: t('groups'),
    icon: (isActive) => <PiGraduationCap className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'} size={26} />,
    roles: [RolesList.TEACHER, RolesList.ADMIN],
    type: MenuType.LINK
  },
  {
    key: 'individual',
    path: '/dashboard/teacher/individual',
    label: t('independent'),
    icon: (isActive) => <GoChecklist className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'} size={26} />,
    roles: [RolesList.TEACHER, RolesList.ADMIN],
    type: MenuType.LINK
  },
  {
    key: 'student-examples',
    path: '/dashboard/teacher/student-examples',
    label: t('studentExamples'),
    icon: (isActive) => <FiLayers className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'} size={26} />,
    roles: [RolesList.TEACHER, RolesList.ADMIN],
    type: MenuType.LINK
  },
  { roles: [RolesList.STUDENT, RolesList.TEACHER], type: MenuType.GROUP },
  {
    key: 'profile',
    path: '/dashboard/student/profile',
    label: t('profile'),
    icon: (isActive) => <LuUser className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'} size={26} />,
    disabled: false,
    roles: [RolesList.STUDENT],
    type: MenuType.LINK
  },
  {
    key: 'profile',
    path: '/dashboard/teacher/profile',
    label: t('profile'),
    icon: (isActive) => <LuUser className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'} size={26} />,
    disabled: false,
    roles: [RolesList.TEACHER, RolesList.ADMIN, RolesList.TUTOR],
    type: MenuType.LINK
  },
  {
    key: 'coins',
    path: '/dashboard/student/coins',
    label: t('points'),
    icon: (isActive) => <FaCoins className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'} size={26} />,
    disabled: false,
    roles: [RolesList.STUDENT],
    type: MenuType.LINK
  },
  // {
  //   key: 'parents-management',
  //   path: '/dashboard/teacher/parents-management',
  //   label: t('parentsManagement'),
  //   icon: <LuUsers size={26} />,
  //   roles: [RolesList.TEACHER, RolesList.ADMIN],
  //   type: MenuType.LINK
  // },

  // Parent role menu items
  { label: t('main'), roles: [RolesList.PARENT], type: MenuType.TITLE },
  {
    key: 'my-children',
    path: '/dashboard/parent/my-children',
    label: t('myChildren'),
    icon: (isActive) => <LuUsers className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'} size={26} />,
    roles: [RolesList.PARENT],
    type: MenuType.LINK,
    activePatterns: ['/dashboard/parent/my-children'] // Bu path bilan boshlanadigan barcha routelar
  },
  {
    key: 'parent-profile',
    path: '/dashboard/parent/profile',
    label: t('profile'),
    icon: (isActive) => <LuUser className={isActive ? 'text-white' : 'text-[#5d87ff] group-hover:text-white transition-colors duration-300'} size={26} />,
    roles: [RolesList.PARENT],
    type: MenuType.LINK
  }
]

export const getMenuItemClasses = (isActive, disabled) => {
  const base =
    'flex gap-x-[10px] items-center py-[10px] px-[12px] rounded-[8px] transition-all duration-300 font-medium text-[15px] group'
  const active = 'bg-[#5D87FF] text-white'
  const inactive = 'text-[#5A6A85] dark:bg-[#202936] hover:bg-[#4463bb] hover:text-white dark:hover:bg-[#4463bb] dark:text-white'
  const disabledCls = 'opacity-50 cursor-not-allowed pointer-events-none'
  return `${base} ${disabled ? disabledCls : isActive ? active : inactive}`
}
