import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { provide } from 'vue';
import { useAuth } from '../composables/useAuth';
import type { AuthComposable } from '../core/types';

describe('useAuth', () => {
  const mockAuth: AuthComposable = {
    user: { name: 'João', email: 'joao@email.com' },
    isAuthenticated: () => true,
    login: vi.fn(),
    logout: vi.fn(),
    token: 'mock-token',
    loading: false,
  };

  it('deve retornar o objeto auth provido', () => {
    const wrapper = mount({
      template: '<div />',
      setup() {
        provide('auth', mockAuth);
        const auth = useAuth();

        expect(auth).toBe(mockAuth);
        expect(auth.user.name).toBe('João');
        expect(auth.isAuthenticated).toBe(true);
      },
    });
  });

  it('deve lançar erro se não houver provider', () => {
    expect(() => {
      mount({
        template: '<div />',
        setup() {
          useAuth();
        },
      });
    }).toThrow('[vue-auth-kit] useAuth() called without installing the plugin.');
  });

  it('deve chamar login e logout', () => {
    mount({
      template: '<div />',
      setup() {
        provide('auth', mockAuth);
        const auth = useAuth();

        auth.logout();

        expect(mockAuth.login).toHaveBeenCalledWith('email', 'senha');
        expect(mockAuth.logout).toHaveBeenCalled();
      },
    });
  });
});
