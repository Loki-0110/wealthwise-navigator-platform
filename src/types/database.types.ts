
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      financial_goals: {
        Row: {
          id: string
          created_at: string
          user_id: string
          title: string
          description: string | null
          target_amount: number
          current_amount: number
          target_date: string | null
          category: string
          completed: boolean
          priority: number
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          title: string
          description?: string | null
          target_amount: number
          current_amount?: number
          target_date?: string | null
          category: string
          completed?: boolean
          priority?: number
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          title?: string
          description?: string | null
          target_amount?: number
          current_amount?: number
          target_date?: string | null
          category?: string
          completed?: boolean
          priority?: number
        }
      }
      transactions: {
        Row: {
          id: string
          created_at: string
          user_id: string
          amount: number
          description: string
          category: string
          transaction_date: string
          transaction_type: "income" | "expense"
          account_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          amount: number
          description: string
          category: string
          transaction_date: string
          transaction_type: "income" | "expense"
          account_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          amount?: number
          description?: string
          category?: string
          transaction_date?: string
          transaction_type?: "income" | "expense"
          account_id?: string | null
        }
      }
      accounts: {
        Row: {
          id: string
          created_at: string
          user_id: string
          name: string
          account_type: string
          balance: number
          institution: string | null
          is_credit: boolean
          last_updated: string
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          name: string
          account_type: string
          balance: number
          institution?: string | null
          is_credit?: boolean
          last_updated?: string
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          name?: string
          account_type?: string
          balance?: number
          institution?: string | null
          is_credit?: boolean
          last_updated?: string
        }
      }
      budget_categories: {
        Row: {
          id: string
          created_at: string
          user_id: string
          name: string
          monthly_limit: number
          color: string | null
          icon: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          name: string
          monthly_limit: number
          color?: string | null
          icon?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          name?: string
          monthly_limit?: number
          color?: string | null
          icon?: string | null
        }
      }
      alerts: {
        Row: {
          id: string
          created_at: string
          user_id: string
          title: string
          message: string
          type: "info" | "warning" | "critical"
          read: boolean
          related_entity_id: string | null
          related_entity_type: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          title: string
          message: string
          type: "info" | "warning" | "critical"
          read?: boolean
          related_entity_id?: string | null
          related_entity_type?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          title?: string
          message?: string
          type?: "info" | "warning" | "critical"
          read?: boolean
          related_entity_id?: string | null
          related_entity_type?: string | null
        }
      }
      user_profiles: {
        Row: {
          id: string
          created_at: string
          user_id: string
          full_name: string | null
          avatar_url: string | null
          monthly_income: number | null
          risk_tolerance: "low" | "medium" | "high" | null
          financial_goals: string[] | null
          preferences: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          full_name?: string | null
          avatar_url?: string | null
          monthly_income?: number | null
          risk_tolerance?: "low" | "medium" | "high" | null
          financial_goals?: string[] | null
          preferences?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          full_name?: string | null
          avatar_url?: string | null
          monthly_income?: number | null
          risk_tolerance?: "low" | "medium" | "high" | null
          financial_goals?: string[] | null
          preferences?: Json | null
        }
      }
      educational_content: {
        Row: {
          id: string
          created_at: string
          title: string
          content: string
          category: string
          difficulty_level: "beginner" | "intermediate" | "advanced"
          tags: string[] | null
          thumbnail_url: string | null
          published: boolean
          author: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          content: string
          category: string
          difficulty_level: "beginner" | "intermediate" | "advanced"
          tags?: string[] | null
          thumbnail_url?: string | null
          published?: boolean
          author?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          content?: string
          category?: string
          difficulty_level?: "beginner" | "intermediate" | "advanced"
          tags?: string[] | null
          thumbnail_url?: string | null
          published?: boolean
          author?: string | null
        }
      }
    }
  }
}
