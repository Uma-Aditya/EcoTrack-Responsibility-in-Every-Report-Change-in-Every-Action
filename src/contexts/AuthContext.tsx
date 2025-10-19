import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase, AdminUser } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  adminUser: AdminUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchAdminUser(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchAdminUser(session.user.id);
        } else {
          setAdminUser(null);
          setLoading(false);
        }
      })();
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchAdminUser = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) throw error;
      setAdminUser(data);
    } catch (error) {
      console.error('Error fetching admin user:', error);
      setAdminUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Static admin credentials for testing
      if (email === 'admin@ecotrack.city' && password === 'admin123') {
        // Create a mock admin user
        const mockAdminUser: AdminUser = {
          id: 'static-admin-id',
          email: 'admin@ecotrack.city',
          full_name: 'Admin User',
          role: 'Admin',
          created_at: new Date().toISOString(),
        };
        setAdminUser(mockAdminUser);
        return { error: null };
      } else {
        return { error: new Error('Invalid credentials') };
      }
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    setAdminUser(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, adminUser, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
