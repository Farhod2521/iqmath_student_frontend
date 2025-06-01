import useGetQuery from '@/hooks/api/useGetQuery'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { get } from 'lodash'
import { signOut, useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@heroui/react'
import { User, Avatar, AvatarIcon, Button } from '@heroui/react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@heroui/react'
import { useUserStore } from '@/store'
import { useEffect } from 'react'

function NavbarProfile() {
  const { data: session } = useSession()
  const { t } = useTranslation()

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()

  const {
    data: studentProfile,
    isLoading,
    isFetching
  } = useGetQuery({
    key: KEYS.studentProfile,
    url: URLS.studentProfile,
    headers: { Authorization: `Bearer ${session?.accessToken}` },
    enabled: !!session?.accessToken
  })

  // Zustand store
  const { setUser } = useUserStore()

  // Effect to store user profile
  useEffect(() => {
    if (studentProfile?.data) {
      setUser(studentProfile.data)
    }
  }, [studentProfile, setUser])

  const handleLogout = async () => {
    await signOut({ callbackUrl: 'https://iq-math.uz' })
    onClose()
    localStorage.clear()
    sessionStorage.clear()
  }

  return (
    <>
      <Dropdown classNames={{ content: 'w-[280px] rounded-md' }}>
        <DropdownTrigger>
          <Button isIconOnly radius="full" className="p-0 bg-transparent">
            <Avatar icon={<AvatarIcon />} radius="full" size="sm" className="bg-transparent" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu disabledKeys={['peymentkey']}>
          <DropdownSection showDivider>
            <DropdownItem key="peymentkey" isReadOnly className="h-12 gap-2 opacity-100">
              <div className="space-y-[4px] text-black dark:text-white">
                <p className="text-[17px]">ID: {get(studentProfile, 'data.identification')}</p>
              </div>
            </DropdownItem>
          </DropdownSection>
          <DropdownSection showDivider>
            <DropdownItem isReadOnly className="h-14 gap-2 opacity-100">
              <Link href="/dashboard/student/profile">
                <User
                  avatarProps={{ size: 'md', className: 'rounded-md' }}
                  classNames={{
                    name: 'text-black dark:text-white font-semibold',
                    description: 'text-[#7C8FAC] dark:text-gray-200 text-sm'
                  }}
                  description={t('settings')}
                  name={t('myPage')}
                />
              </Link>
            </DropdownItem>
          </DropdownSection>

          <DropdownItem onClick={onOpen} className=" py-[8px] bg-[#EDEDF2FF] text-center  text-black ">
            {t('logout')}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-xl">{t('exitWeb')}</ModalHeader>
              <ModalBody>
                {/* <h2 className="text-xl font-semibold mb-1">{t('exitWeb')}</h2> */}
                <p className="text-lg font-medium text-[#7C8FAC] mb-4">{t('exitWebDesc')}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={handleLogout}>
                  {t('yes')}
                </Button>
                <Button onPress={onClose}>{t('no')}</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default NavbarProfile
