import Favourites from "@/components/Favourites";
import ShareButton from "@/components/ShareButton";
import ShareURL from "@/components/ShareURL";
import Link from "next/link";

declare type GetCharityProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function GetCharity({ params }: GetCharityProps) {
  console.log("params", params);
  const apiKey = process.env.API_KEY;
  const { id } = params;
  const response = await fetch(
    `https://partners.every.org/v0.2/nonprofit/${id}?apiKey=${apiKey}`
  );
  const result = await response.json();
  // console.log("result :>> ", result);

  return (
    <>
      <div className="lg:grid lg:grid-cols-8 lg:grid-rows-1 overflow-x-hidden md:justify-center gap-5 gap-y-5 lg:px-5 md:mt-2 ">
        <div className="lg:col-start-2 lg:col-end-6  md:h-auto lg:overflow-x-auto md:rounded-xl md:shadow-xl md:border">
          <div key={result.data.nonprofit.ein}>
            <div className="w-max lg:max-w-full lg:flex border-black">
              <img
                className="h-48 lg:h-auto w-fit lg:w-fit flex-none bg-cover rounded text-center "
                src={result.data.nonprofit.coverImageUrl}
                title="Charity cover image"
              ></img>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img
                  src={result.data.nonprofit.logoUrl}
                  alt="Avatar of Jonathan Reinink"
                  className="rounded-full"
                ></img>
                <div className="flex text-sm">
                  <p className="text-gray-900 leading-none">
                    {result.data.nonprofit.locationAddress}
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <Favourites ein={result.data.nonprofit.ein} />
              </div>
            </div>
            <div className="w-full lg:max-w-full lg:flex border-black">
              <div className=" bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div className="mb-8">
                  <div className="text-gray-900 font-bold text-xl mb-2">
                    {result.data.nonprofit.name}
                  </div>
                  <p className="text-gray-700 text-base">
                    {result.data.nonprofit.descriptionLong}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* second column */}
        <div className="lg:col-start-6 lg:col-end-8 ">
          <div className="grid gap-3">
            {/* first card in second col */}
            <div className="lg:grid lg:grid-cols-6 lg:grid-rows-3 items-center justify-items-center gap-3 lg:h-fit md:rounded-xl md:shadow-xl md:border p-2">
              {/* <div className="mb-1 text-base font-medium dark:text-white">
                Raised money
              </div>
              <div className="col-start-1 col-end-7 w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500"
                  style={{ width: "45%" }}
                ></div>
              </div> */}
              <div className="w-full col-start-1 col-end-7">
                <div className="flex justify-center py-5 bg-green-400 hover:bg-green-600 text-white font-bold rounded-full">
                  <Link
                    href={`https://www.every.org/${result.data.nonprofit.ein}/donate`}
                  >
                    Donate
                  </Link>
                </div>
              </div>
              <div className="col-start-1 col-end-7">
                <ShareButton id={id} />
              </div>

              <div className="w-full col-start-1 col-end-7">
                <ShareURL id={id} />
              </div>
            </div>
            {/* second card in second col */}
            <div className="lg:grid lg:grid-cols-6 lg:grid-rows-2 lg:items-center justify-items-center gap-3 lg:h-min md:rounded-xl md:shadow-xl md:border p-2">
              <div className="w-full col-start-1 col-end-7 lg:pt-5">
                <h4 className="text-2xl">Create a foundraiser</h4>
                <p>
                  Delivering unconditional cash directly to the world&apos;s
                  poorest households via secure mobile transfers.
                </p>
              </div>
              <div className="w-full col-start-1 col-end-7">
                <Link
                  className="flex justify-center w-full py-5 bg-green-400 hover:bg-green-600 text-white font-bold rounded-full"
                  href={"/fundraiser"}
                >
                  Create Fundraiser
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
