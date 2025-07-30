import { LuBookText, LuUser } from 'react-icons/lu'
import { TbCheckbox } from 'react-icons/tb'
import { FaCoins } from 'react-icons/fa6'
import { BiDirections } from 'react-icons/bi'
import { BsBarChart } from 'react-icons/bs'
import { GoChecklist } from 'react-icons/go'
import { PiBooksLight } from 'react-icons/pi'
import { PiUsers } from 'react-icons/pi'
import { LiaLayerGroupSolid } from 'react-icons/lia'
import { PiGraduationCap } from 'react-icons/pi'
import { FiLayers } from 'react-icons/fi'

export const MenuType = { LINK: 'LINK', GROUP: 'GROUP', TITLE: 'TITLE' }
export const RolesList = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  ADMIN: 'admin'
}

export const getMenuItems = (t) => [
  { label: t('main'), roles: [RolesList.STUDENT, RolesList.TEACHER], type: MenuType.TITLE },
  {
    key: 'main',
    path: '/dashboard/student/subjects',
    label: t('subjects'),
    icon: <LuBookText size={26} />,
    disabled: false,
    roles: [RolesList.STUDENT, RolesList.ADMIN],
    type: MenuType.LINK
  },
  {
    key: 'diagnostics',
    path: '/dashboard/student/diagnostics',
    label: t('diagnostics'),
    icon: <TbCheckbox size={26} />,
    disabled: false,
    roles: [RolesList.STUDENT],
    type: MenuType.LINK
  },
  {
    key: 'recommended', // Diqqat: bu yerda "recommended" bo‘lishi kerak
    path: '/dashboard/student/recommendations',
    label: t('recommended'),
    icon: <BiDirections size={26} />,
    disabled: false,
    roles: [RolesList.STUDENT],
    type: MenuType.LINK
  },
  {
    key: 'statistics',
    path: '/dashboard/teacher/statistics',
    label: t('statistics'),
    icon: <BsBarChart size={26} />,
    roles: [RolesList.TEACHER, RolesList.ADMIN],
    type: MenuType.LINK
  },
  {
    key: 'pupils',
    path: '/dashboard/teacher/pupils',
    label: t('students'),
    icon: <PiUsers size={26} />,
    roles: [RolesList.TEACHER, RolesList.ADMIN],
    type: MenuType.LINK
  },
  {
    key: 'subjects',
    path: '/dashboard/teacher/subjects',
    label: t('subjects'),
    icon: <PiBooksLight size={26} />,
    roles: [RolesList.TEACHER, RolesList.ADMIN],
    type: MenuType.LINK
  },
  {
    key: 'my-study',
    path: '/dashboard/teacher/my-study',
    label: t('groups'),
    icon: <PiGraduationCap size={26} />,
    roles: [RolesList.TEACHER, RolesList.ADMIN],
    type: MenuType.LINK
  },
  {
    key: 'individual',
    path: '/dashboard/teacher/individual',
    label: t('independent'),
    icon: <GoChecklist size={26} />,
    roles: [RolesList.TEACHER, RolesList.ADMIN],
    type: MenuType.LINK
  },
  {
    key: 'student-examples',
    path: '/dashboard/teacher/student-examples',
    label: t('studentExamples'),
    icon: <FiLayers size={26} />,
    roles: [RolesList.TEACHER, RolesList.ADMIN],
    type: MenuType.LINK
  },
  { roles: [RolesList.STUDENT, RolesList.TEACHER], type: MenuType.GROUP },
  {
    key: 'profile',
    path: '/dashboard/student/profile',
    label: t('profile'),
    icon: <LuUser size={26} />,
    disabled: false,
    roles: [RolesList.STUDENT],
    type: MenuType.LINK
  },
  {
    key: 'profile',
    path: '/dashboard/teacher/profile',
    label: t('profile'),
    icon: <LuUser size={26} />,
    disabled: false,
    roles: [RolesList.TEACHER, RolesList.ADMIN],
    type: MenuType.LINK
  },
  {
    key: 'coins',
    path: '/dashboard/student/coins',
    label: t('points'),
    icon: <FaCoins size={26} />,
    disabled: false,
    roles: [RolesList.STUDENT],
    type: MenuType.LINK
  }
]

export const getMenuItemClasses = (isActive, disabled) => {
  const base =
    'flex gap-x-[10px] items-center py-[10px] px-[12px] rounded-[8px] transition-all duration-300 font-medium text-[15px]'
  const active = 'bg-[#5D87FF] text-white'
  const inactive = 'text-[#5A6A85] dark:bg-[#202936] hover:bg-[#4463bb] hover:text-white dark:hover:bg-[#4463bb] dark:text-white'
  const disabledCls = 'opacity-50 cursor-not-allowed pointer-events-none'
  return `${base} ${disabled ? disabledCls : isActive ? active : inactive}`
}
