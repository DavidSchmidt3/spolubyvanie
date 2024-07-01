import Advertisement from "@/app/[locale]/_components/home/advertisement";

export default function AdvertisementList() {
  return (
    <div className="flex flex-col justify-center w-full items-center gap-y-4 px-4 sm:px-16 py-4 sm:py-8">
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <Advertisement
            key={index}
            price={300}
            street="Osuského 10"
            municipality="Bratislava 5"
            district="Bratislava"
            region="Bratislavský dlhy fest bars dlhy pamboško dlhy kraj"
            title="Nepriechodná veľká testovacia izba v Petržalke"
            description="Nepriechodná Izba pre jednotlivca/pár, (190Eur za osobu ak dvaja na izbe), 5,5x4,5m s dvojposteľou.V izbe je posteľ,satnikova skriňa,stôl,2 stoličky,sedacka, cajovy stolik,(novy nabytok),Smart TV s TV balikom SledovanieTV/SlovanetTV,+ rychly opticky internet s dobrym signalom. Z izby je vstup do novej kúpeľne a kuchyne so sporákom,chladničou a mrazničkou, varnou kanvicou,mikr.rúrou, myčkou riadu a následne do jedálne. K dispozícii je čisto nová moderná kúpeľňa so sprch.kútom, WC s funkciou bidet, pračka, sušiak.vztup na dvor. Parkovanie zdarma. ziadne ine príplatky."
          />
        ))}
    </div>
  );
}
