import { clsx, type ClassValue } from "clsx";
import Compressor from "compressorjs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function compressFile(
  file: File,
  compressionQuality: number
): Promise<File> {
  return new Promise<File>((resolve) => {
    new Compressor(file, {
      quality: compressionQuality,
      success: (compressedFile) => {
        if (compressedFile instanceof Blob) {
          const convertedCompressedFile = new File(
            [compressedFile],
            file.name,
            {
              type: compressedFile.type,
            }
          );
          resolve(convertedCompressedFile);
        } else {
          resolve(compressedFile);
        }
      },
      error: (error) => {
        console.error("Error compressing file", error);
        resolve(file);
      },
    });
  });
}

export type Photo = {
  fileName: string;
  bytes: string;
};

export function dataUrlToFile(photo: Photo): File | undefined {
  const arr = photo.bytes.split(",");
  if (!arr[0] || !arr[1]) {
    return undefined;
  }
  const mimeArr = arr[0].match(/:(.*?);/);
  if (!mimeArr || mimeArr.length < 2) {
    return undefined;
  }
  const mime = mimeArr[1];

  const ui8Array = new Uint8Array(
    atob(arr[1])
      .split("")
      .map((char) => char.charCodeAt(0))
  );

  const blob = new Blob([ui8Array], { type: mime });
  const file = new File([blob], photo.fileName, { type: mime });
  const preview = URL.createObjectURL(blob);

  return Object.assign(file, { preview });
}
