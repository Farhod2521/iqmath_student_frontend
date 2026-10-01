import { signOut } from 'next-auth/react'
import { request } from '@/services/api'

/**
 * Tizimdan chiqish: avval backendga xabar beriladi (joriy qurilma bo'shaydi —
 * 2 ta qurilma chegarasida joy ochiladi), keyin next-auth sessiyasi yopiladi.
 * Backend javob bermasa ham foydalanuvchi baribir chiqariladi.
 */
export const logout = async (callbackUrl = '/') => {
  try {
    await request.post('/api/v1/auth/student/logout/')
  } catch {
    // tarmoq xatosi chiqishga to'sqinlik qilmasin
  }
  await signOut({ callbackUrl })
}
