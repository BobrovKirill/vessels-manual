import { ref } from 'vue'

export const isAuthorized = ref(false)
export const showModal = ref(false)
export const isLoginTab = ref(true)

// формы
export const loginForm = ref({ email: '', password: '' })
export const regForm = ref({ name: '', email: '', password: '' })

export function toggleModal() {
  showModal.value = !showModal.value
}

export function showLogin() {
  isLoginTab.value = true
}

export function showRegister() {
  isLoginTab.value = false
}

export async function login() {
  try {
    await $fetch('/api/login', {
      method: 'POST',
      body: loginForm.value,
    })
    isAuthorized.value = true
    toggleModal()
  } catch (e) {
    console.error(e)
    // показать ошибку
  }
}

export async function register() {
  try {
    await $fetch('/api/register', {
      method: 'POST',
      body: regForm.value,
    })
    isAuthorized.value = true
    toggleModal()
  } catch (e) {
    console.error(e)
    // показать ошибку
  }
}
