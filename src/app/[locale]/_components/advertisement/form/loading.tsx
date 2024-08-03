import Container from "@/app/[locale]/_components/common/container";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/[locale]/_components/ui/card";
import { Skeleton } from "@/app/[locale]/_components/ui/skeleton";

export default function AddAdvertisementLoading() {
  function Row() {
    return (
      <div className="flex flex-col gap-y-3">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-11 w-full" />
      </div>
    );
  }

  return (
    <Container className="p-1 sm:py-3" fullWidth>
      <Skeleton className="h-10 w-80 mx-auto mb-8" />
      <div className="grid grid-cols-1 gap-2 mx-4 mt-4 gap-y-4 sm:gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-10 w-1/2" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-8">
            <Row />
            <Row />
            <Row />
            <Row />
            <Skeleton className="h-48 w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-11 w-1/2" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-8">
            <Row />
            <Row />
            <Row />
            <Row />
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col mx-4 mt-8">
        <Skeleton className="w-full h-10" />
      </div>
    </Container>
  );
}
