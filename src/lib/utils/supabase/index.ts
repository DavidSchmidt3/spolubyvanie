export const PHOTO_BUCKET = "photos";
export function getImageFullUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${path}`;
}

export function getFileNameFromFullPath(path: string): string {
  return path.split("/").pop() ?? "";
}

export function trimBucketName(path: string) {
  return path.replace(`${PHOTO_BUCKET}/`, "");
}
