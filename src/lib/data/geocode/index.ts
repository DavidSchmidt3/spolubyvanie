import { type AdvertisementFetchResult } from "@/lib/data/advertisement";
import openCage from "opencage-api-client";

type GeocodeAddressParams = {
  street: AdvertisementFetchResult["street"];
  municipality: AdvertisementFetchResult["municipalities"]["name"];
  district: AdvertisementFetchResult["municipalities"]["districts"]["name"];
  region: AdvertisementFetchResult["municipalities"]["districts"]["regions"]["name"];
};

export async function geocodeAddress({
  street,
  municipality,
  district,
  region,
}: GeocodeAddressParams) {
  try {
    const { status, results } = (await openCage.geocode({
      q: `${
        street ? `${street}, ` : ""
      }${municipality}, ${district}, ${region}`,
      key: process.env.OPENCAGE_API_KEY,
    })) as OpenCageResponse;

    if (status.code === 200 && results.length > 0) {
      return results[0]!.geometry;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

type OpenCageResponse = {
  status: {
    code: number;
    message: string;
  };
  results: {
    geometry: {
      lat: number;
      lng: number;
    };
  }[];
};
