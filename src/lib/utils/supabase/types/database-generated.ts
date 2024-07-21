export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      advertisements: {
        Row: {
          apartment_area: number | null;
          available_from: string | null;
          created_at: string;
          deleted_at: string | null;
          description: string;
          floor: number | null;
          id: string;
          max_floor: number | null;
          municipality_id: string;
          price: number;
          primary_photo_url: string | null;
          room_area: number | null;
          street: string | null;
          title: string;
          type: number;
          user_id: string;
        };
        Insert: {
          apartment_area?: number | null;
          available_from?: string | null;
          created_at?: string;
          deleted_at?: string | null;
          description: string;
          floor?: number | null;
          id?: string;
          max_floor?: number | null;
          municipality_id: string;
          price: number;
          primary_photo_url?: string | null;
          room_area?: number | null;
          street?: string | null;
          title: string;
          type: number;
          user_id: string;
        };
        Update: {
          apartment_area?: number | null;
          available_from?: string | null;
          created_at?: string;
          deleted_at?: string | null;
          description?: string;
          floor?: number | null;
          id?: string;
          max_floor?: number | null;
          municipality_id?: string;
          price?: number;
          primary_photo_url?: string | null;
          room_area?: number | null;
          street?: string | null;
          title?: string;
          type?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_advertisements_municipality_id_fkey";
            columns: ["municipality_id"];
            isOneToOne: false;
            referencedRelation: "municipalities";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_advertisements_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      advertisements_photos: {
        Row: {
          advertisement_id: string;
          id: string;
          url: string;
        };
        Insert: {
          advertisement_id: string;
          id?: string;
          url: string;
        };
        Update: {
          advertisement_id?: string;
          id?: string;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_advertisements_photos_advertisement_id_fkey";
            columns: ["advertisement_id"];
            isOneToOne: false;
            referencedRelation: "advertisements";
            referencedColumns: ["id"];
          }
        ];
      };
      districts: {
        Row: {
          id: string;
          name: string;
          region_id: string;
        };
        Insert: {
          id?: string;
          name: string;
          region_id: string;
        };
        Update: {
          id?: string;
          name?: string;
          region_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "districts_region_id_fkey";
            columns: ["region_id"];
            isOneToOne: false;
            referencedRelation: "regions";
            referencedColumns: ["id"];
          }
        ];
      };
      municipalities: {
        Row: {
          district_id: string;
          id: string;
          name: string;
          region_id: string;
        };
        Insert: {
          district_id: string;
          id?: string;
          name: string;
          region_id: string;
        };
        Update: {
          district_id?: string;
          id?: string;
          name?: string;
          region_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "municipalities_district_id_fkey";
            columns: ["district_id"];
            isOneToOne: false;
            referencedRelation: "districts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "municipalities_region_id_fkey";
            columns: ["region_id"];
            isOneToOne: false;
            referencedRelation: "regions";
            referencedColumns: ["id"];
          }
        ];
      };
      regions: {
        Row: {
          id: string;
          name: string;
        };
        Insert: {
          id?: string;
          name: string;
        };
        Update: {
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
      user_settings: {
        Row: {
          created_at: string;
          id: string;
          locale: string;
          theme: string;
        };
        Insert: {
          created_at?: string;
          id: string;
          locale: string;
          theme: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          locale?: string;
          theme?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_settings_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
