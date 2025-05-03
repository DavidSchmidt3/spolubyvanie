export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      advertisements: {
        Row: {
          apartment_area: number | null
          apartment_rooms: number | null
          available_from: string
          created_at: string
          deleted_at: string | null
          description: string
          floor: number | null
          id: string
          max_age: number | null
          max_floor: number | null
          min_age: number | null
          municipality_id: string
          price: number
          primary_photo_url: string | null
          room_area: number | null
          room_max_occupancy: number | null
          street: string | null
          title: string
          type: number
          updated_at: string
          user_id: string
          views: number
        }
        Insert: {
          apartment_area?: number | null
          apartment_rooms?: number | null
          available_from: string
          created_at?: string
          deleted_at?: string | null
          description: string
          floor?: number | null
          id?: string
          max_age?: number | null
          max_floor?: number | null
          min_age?: number | null
          municipality_id: string
          price: number
          primary_photo_url?: string | null
          room_area?: number | null
          room_max_occupancy?: number | null
          street?: string | null
          title: string
          type: number
          updated_at?: string
          user_id: string
          views?: number
        }
        Update: {
          apartment_area?: number | null
          apartment_rooms?: number | null
          available_from?: string
          created_at?: string
          deleted_at?: string | null
          description?: string
          floor?: number | null
          id?: string
          max_age?: number | null
          max_floor?: number | null
          min_age?: number | null
          municipality_id?: string
          price?: number
          primary_photo_url?: string | null
          room_area?: number | null
          room_max_occupancy?: number | null
          street?: string | null
          title?: string
          type?: number
          updated_at?: string
          user_id?: string
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_advertisements_municipality_id_fkey"
            columns: ["municipality_id"]
            isOneToOne: false
            referencedRelation: "municipalities"
            referencedColumns: ["id"]
          },
        ]
      }
      advertisements_photos: {
        Row: {
          advertisement_id: string
          id: string
          url: string
        }
        Insert: {
          advertisement_id: string
          id?: string
          url: string
        }
        Update: {
          advertisement_id?: string
          id?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_advertisements_photos_advertisement_id_fkey"
            columns: ["advertisement_id"]
            isOneToOne: false
            referencedRelation: "advertisements"
            referencedColumns: ["id"]
          },
        ]
      }
      advertisements_properties: {
        Row: {
          advertisement_id: string
          id: string
          property_id: string
        }
        Insert: {
          advertisement_id: string
          id?: string
          property_id: string
        }
        Update: {
          advertisement_id?: string
          id?: string
          property_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "advertisements_apartment_equipments_advertisement_id_fkey"
            columns: ["advertisement_id"]
            isOneToOne: false
            referencedRelation: "advertisements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "advertisements_apartment_equipments_apartment_equipment_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      districts: {
        Row: {
          id: string
          name: string
          region_id: string
        }
        Insert: {
          id?: string
          name: string
          region_id: string
        }
        Update: {
          id?: string
          name?: string
          region_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "districts_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      municipalities: {
        Row: {
          district_id: string
          id: string
          name: string
          region_id: string
        }
        Insert: {
          district_id: string
          id?: string
          name: string
          region_id: string
        }
        Update: {
          district_id?: string
          id?: string
          name?: string
          region_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "municipalities_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "municipalities_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      properties: {
        Row: {
          en_translation: string
          id: string
          order: number | null
          property_group_id: string | null
          sk_translation: string
          type: Database["public"]["Enums"]["advertisement_property"]
        }
        Insert: {
          en_translation: string
          id?: string
          order?: number | null
          property_group_id?: string | null
          sk_translation: string
          type?: Database["public"]["Enums"]["advertisement_property"]
        }
        Update: {
          en_translation?: string
          id?: string
          order?: number | null
          property_group_id?: string | null
          sk_translation?: string
          type?: Database["public"]["Enums"]["advertisement_property"]
        }
        Relationships: [
          {
            foreignKeyName: "properties_property_group_id_fkey"
            columns: ["property_group_id"]
            isOneToOne: false
            referencedRelation: "properties_group"
            referencedColumns: ["id"]
          },
        ]
      }
      properties_group: {
        Row: {
          en_translation: string
          id: string
          sk_translation: string
        }
        Insert: {
          en_translation: string
          id?: string
          sk_translation: string
        }
        Update: {
          en_translation?: string
          id?: string
          sk_translation?: string
        }
        Relationships: []
      }
      regions: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          created_at: string
          id: string
          locale: string
          theme: string
        }
        Insert: {
          created_at?: string
          id: string
          locale: string
          theme: string
        }
        Update: {
          created_at?: string
          id?: string
          locale?: string
          theme?: string
        }
        Relationships: []
      }
      users_filters: {
        Row: {
          id: string
          name: string
          query: string
          user_id: string
        }
        Insert: {
          id?: string
          name: string
          query: string
          user_id: string
        }
        Update: {
          id?: string
          name?: string
          query?: string
          user_id?: string
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
      advertisement_property:
        | "roommate"
        | "apartment"
        | "special_apartment"
        | "room"
        | "room_orientation"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      advertisement_property: [
        "roommate",
        "apartment",
        "special_apartment",
        "room",
        "room_orientation",
      ],
    },
  },
} as const
