import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../pages/LoginPage';
import { useLanguage } from '../context/LanguageContext';

// Mock useLanguage
jest.mock('../context/LanguageContext', () => ({
  useLanguage: jest.fn(),
}));

// Mock fetch
global.fetch = jest.fn();

// Mock window.location
delete window.location;
window.location = { href: '', search: '' };

describe('LoginPage', () => {
  const mockT = {
    auth_page: {
      signIn: 'Sign In',
      createAccount: 'Create Account',
      loginTitle: 'Welcome Back',
      registerTitle: 'Join Us',
      email: 'Email',
      password: 'Password',
      emailPlaceholder: 'Enter email',
      loginSuccess: 'Logged in',
    },
  };

  beforeEach(() => {
    useLanguage.mockReturnValue({ t: mockT });
    fetch.mockClear();
    localStorage.clear();
    window.location.href = '';
    window.alert = jest.fn();
  });

  it('renders login form by default', () => {
    render(<LoginPage />);
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
  });

  it('switches to register tab when clicked', () => {
    render(<LoginPage />);
    const registerTab = screen.getAllByText('Create Account')[0];
    fireEvent.click(registerTab);
    expect(screen.getByText('Join Us')).toBeInTheDocument();
  });

  it('calls login API on submit', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ accessToken: 'fake-token', user: { id: '1', username: 'test' } }),
    });

    render(<LoginPage />);
    
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    
    const submitBtn = screen.getAllByText('Sign In')[1]; // The button inside form
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/auth/login'),
        expect.any(Object)
      );
    });
  });
});
