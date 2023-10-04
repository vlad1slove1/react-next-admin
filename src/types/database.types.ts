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
      orders: {
        Row: {
          about: string | null
          address: string | null
          author: string | null
          company: string | null
          contact: string | null
          createdAt: string | null
          email: string | null
          id: number | null
          price: string | null
        }
        Insert: {
          about?: string | null
          address?: string | null
          author?: string | null
          company?: string | null
          contact?: string | null
          createdAt?: string | null
          email?: string | null
          id?: number | null
          price?: string | null
        }
        Update: {
          about?: string | null
          address?: string | null
          author?: string | null
          company?: string | null
          contact?: string | null
          createdAt?: string | null
          email?: string | null
          id?: number | null
          price?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
