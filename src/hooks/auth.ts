import { supabase } from "@/lib/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
const USER_KEY = "user";

// type User = {
//   email: string;
// };

export const useUserQuery = () => {
  const { data, isLoading } = useQuery({
    queryKey: [USER_KEY],
    queryFn: async () => await supabase.auth.getUser(),
  });
  return { data: data?.data.user, isLoading };
};
