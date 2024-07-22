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

export function crop(file: File, aspectRatio: number): Promise<File> {
  // we return a Promise that gets resolved with our canvas element
  return new Promise((resolve) => {
    // this image will hold our source image data
    const inputImage = new Image();

    // we want to wait for our image to load
    inputImage.onload = () => {
      // let's store the width and height of our image
      const inputWidth = inputImage.naturalWidth;
      const inputHeight = inputImage.naturalHeight;

      // get the aspect ratio of the input image
      const inputImageAspectRatio = inputWidth / inputHeight;

      // if it's bigger than our target aspect ratio
      let outputWidth = inputWidth;
      let outputHeight = inputHeight;
      if (inputImageAspectRatio > aspectRatio) {
        outputWidth = inputHeight * aspectRatio;
      } else if (inputImageAspectRatio < aspectRatio) {
        outputHeight = inputWidth / aspectRatio;
      }

      // calculate the position to draw the image at
      const outputX = (outputWidth - inputWidth) * 0.5;
      const outputY = (outputHeight - inputHeight) * 0.5;

      // create a canvas that will present the output image
      const outputImage = document.createElement("canvas");

      // set it to the same size as the image
      outputImage.width = outputWidth;
      outputImage.height = outputHeight;

      // draw our image at position 0, 0 on the canvas
      const ctx = outputImage.getContext("2d");
      ctx?.drawImage(inputImage, outputX, outputY);
      outputImage.toBlob((blob) => {
        if (blob) {
          // create a new File from the Blob with the same name and type as the original file
          const croppedFile = new File([blob], file.name, { type: file.type });
          resolve(croppedFile);
        } else {
          resolve(file);
        }
      }, file.type);
      URL.revokeObjectURL(inputImage.src);
    };

    // start loading our image
    inputImage.src = URL.createObjectURL(file);
  });
}
