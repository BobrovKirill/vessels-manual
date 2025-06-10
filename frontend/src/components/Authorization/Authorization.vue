<script setup lang="ts">
import {
  isLoginTab,
  login,
  loginForm,
  regForm,
  register,
  showLogin,
  showModal,
  showRegister,
  toggleModal,
} from '~/components/Authorization/index'
</script>

<template>
  <Teleport to="body">
    <div v-if="showModal" class="modal-overlay" @click.self="toggleModal">
      <div class="modal">
        <button class="modal__close" @click="toggleModal">
          ×
        </button>

        <!-- Табы -->
        <div class="modal__tabs">
          <button
            :class="{ active: isLoginTab }"
            @click="showLogin"
          >
            Вход
          </button>
          <button
            :class="{ active: !isLoginTab }"
            @click="showRegister"
          >
            Регистрация
          </button>
        </div>

        <!-- Содержимое табов -->
        <form v-if="isLoginTab" class="modal__form" @submit.prevent="login">
          <input
            v-model="loginForm.email"
            placeholder="Email"
            required
            type="email"
          >
          <input
            v-model="loginForm.password"
            placeholder="Пароль"
            required
            type="password"
          >
          <button type="submit">
            Войти
          </button>
        </form>

        <form v-else class="modal__form" @submit.prevent="register">
          <input
            v-model="regForm.name"
            placeholder="Имя"
            required
            type="text"
          >
          <input
            v-model="regForm.email"
            placeholder="Email"
            required
            type="email"
          >
          <input
            v-model="regForm.password"
            placeholder="Пароль"
            required
            type="password"
          >
          <button type="submit">
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  width: 90%;
  height: 100%;
  max-width: 700px;
  max-height: 700px;
  position: relative;
}
.modal__close {
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}
.modal__tabs {
  display: flex;
  margin-bottom: 16px;
}
.modal__tabs button {
  flex: 1;
  padding: 8px;
  background: none;
  border: none;
  font-weight: 500;
  cursor: pointer;
}
.modal__tabs button.active {
  border-bottom: 2px solid #000;
}
.modal__form {
  display: flex;
  flex-direction: column;
}
.modal__form input {
  margin-bottom: 12px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.modal__form button {
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
