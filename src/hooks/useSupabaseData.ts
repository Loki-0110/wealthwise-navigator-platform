
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  getUserProfile,
  getBudgetCategories,
  getFinancialGoals,
  getUserAlerts,
  getUserAccounts,
  getTransactions,
  getEducationalResources
} from '@/services/supabaseService';
import type { 
  UserProfile, 
  BudgetCategory, 
  FinancialGoal, 
  UserAlert, 
  UserAccount,
  Transaction,
  EducationalResource
} from '@/types/supabase.types';

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const data = await getUserProfile(user.id);
        setProfile(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  return { profile, loading, error };
};

export const useBudgetCategories = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState<BudgetCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const data = await getBudgetCategories(user.id);
        setCategories(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [user]);

  return { categories, loading, error };
};

export const useFinancialGoals = () => {
  const { user } = useAuth();
  const [goals, setGoals] = useState<FinancialGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGoals = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const data = await getFinancialGoals(user.id);
        setGoals(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, [user]);

  return { goals, loading, error };
};

export const useUserAlerts = () => {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState<UserAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const data = await getUserAlerts(user.id);
        setAlerts(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, [user]);

  return { alerts, loading, error };
};

export const useUserAccounts = () => {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState<UserAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const data = await getUserAccounts(user.id);
        setAccounts(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [user]);

  return { accounts, loading, error };
};

export const useTransactions = (limit = 50) => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const data = await getTransactions(user.id, limit);
        setTransactions(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user, limit]);

  return { transactions, loading, error };
};

export const useEducationalResources = (limit = 10) => {
  const [resources, setResources] = useState<EducationalResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      try {
        const data = await getEducationalResources(limit);
        setResources(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [limit]);

  return { resources, loading, error };
};
