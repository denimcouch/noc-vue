import { ref, onMounted, onUnmounted } from 'vue'

export function useScreen(breakpoint = 810) {
  const isMobile = ref(false)

  const updateIsMobile = () => {
    if (typeof window === 'undefined') {
      isMobile.value = false
      return
    }
    isMobile.value = window.innerWidth <= breakpoint
  }

  onMounted(() => {
    updateIsMobile()
    window.addEventListener('resize', updateIsMobile)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateIsMobile)
  })

  return { isMobile }
}
