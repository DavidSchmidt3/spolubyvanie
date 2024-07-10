import { redirect } from "@/lib/utils/localization/navigation";

export default function Page() {
  redirect({
    pathname: "/[page]",
    params: { page: "1" },
  });

  return null;
}
