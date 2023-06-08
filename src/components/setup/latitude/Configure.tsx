"use client";

import Image from "next/image";
import icon from "@/assets/latitude.svg";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const apiKey = process.env.NEXT_PUBLIC_LATITUDE_API_KEY;
const flavor = "c3-large-x86";

const getPlanInfo = async (): Promise<any> => {
  const res = await fetch(`https://api.latitude.sh/plans?filter[slug]=${flavor}&filter[in_stock]=true`, {
    headers: {
      Authorization: apiKey as string,
      Accept: "application/json",
    },
  });

  const data = await res.json();
  console.log(data.data[0]);
  const regions = data.data[0].attributes.available_in;

  const available: any[] = regions.flatMap((region: any) => {
    const regionName = region.region.name;
    const sites = region.sites;
    return sites
      .map((site: any) => {
        if (site.in_stock as boolean) {
          return {
            key: site.slug,
            name: `${site.name as string}, ${regionName as string}`,
            details: site,
            price: region.pricing,
          };
        }
        return null;
      })
      .filter((site: any) => site !== null);
  });

  console.log("available", available);
  return available;
};

interface ConfigureStepProps {
  onSuccess: (settings: any) => void;
  onFail: (error: any) => void;
}

export default function Configure({ onSuccess, onFail }: ConfigureStepProps): React.JSX.Element {
  const [locations, setLocations] = useState<any[]>([]);
  const [selectedSite, setSelectedSite] = useState<any>(null);
  const onChange = (event: { target: { value: any } }): void => {
    const site = event.target.value;

    const selected = locations.filter((location: any) => {
      return location.key === site;
    })[0];

    setSelectedSite(selected);
    console.log(selected);
  };

  const stockBadge = (stock: string): React.JSX.Element => {
    if (stock === "High") {
      return <span className="badge badge-success badge-md ml-2">HIGH</span>;
    } else if (stock === "Medium") {
      return <span className="badge badge-warning badge-md ml-2">MEDIUM</span>;
    } else if (stock === "Low") {
      return <span className="badge badge-error badge-md ml-2">LOW</span>;
    } else {
      return <span className="badge badge-error badge-md ml-2">N/A</span>;
    }
  };

  const confirmationDialog = useRef<any>(null);

  const confirm = (): void => {
    if (confirmationDialog.current !== null) {
      confirmationDialog.current.showModal();
    }
  };

  const finalize = (): void => {
    onSuccess({
      site: selectedSite.key,
      flavor,
    });
  };

  useEffect(() => {
    getPlanInfo()
      .then((data: any): void => {
        setLocations(data);
        setSelectedSite(data[0]);
      })
      .catch((error: any): void => {
        console.log(error);
        throw error;
      });
  }, []);

  return (
    <div className="card col-span-6 mb-8 bg-base-200 pt-8 shadow-xl">
      <figure>
        <Image src={icon} alt="Latitude Icon" height={50} />
      </figure>
      <div className="card-body items-center">
        <div className="alert alert-success w-auto">
          <span className="text-sm">
            <b className="pr-1">Preferred Provider:</b>
            <Link className="link-primary pr-1 font-bold" href="https://www.latitude.sh">
              Latitude
            </Link>
            is a core sponsor of <span className="font-bold">SOL Panel</span> and all new releases are validated against their configurations.
          </span>
        </div>

        <div className="xs:grid-cols-1 mt-8 grid grid-cols-2 items-stretch gap-4">
          <div className="justify-self-start">
            <h2 className="mb-1 text-3xl font-bold text-secondary">Deploy Solana v1.14.17 RPC Node</h2>
            <p className="mb-4 font-bold text-primary-content">
              Select a location to deploy a <span className="font-mono text-sm text-accent">{flavor}</span> instance
            </p>
            <p>This will provision the instance and install the latest version of Solana v1.14.17.</p>
            <p>This process will usually take about 30 minutes to complete and SOL Panel will provide feedback on the progress.</p>
          </div>
          <div className="grid w-full max-w-md grid-cols-2 gap-2 justify-self-end">
            <div className="form-control col-span-2 w-full">
              <select className="select-bordered select w-full" onChange={onChange}>
                {locations.map((site, idx) => {
                  return (
                    <option key={idx} value={site.key}>
                      {site.name}
                    </option>
                  );
                })}
              </select>
            </div>
            {selectedSite !== null && (
              <div className="details">
                <ul className="list-none">
                  <li className="text-lg text-primary-content">
                    <span className="pr-1">Region:</span>
                    <code className="font-extrabold text-accent">{selectedSite?.key}</code>
                  </li>
                  <li className="text-lg text-primary-content">
                    <span className="pr-1">Stock Level:</span>
                    {stockBadge(selectedSite?.details.stock_level)}
                  </li>
                  <li className="text-lg text-primary-content">
                    <span className="pr-1">USD Per Hour:</span>
                    <code className="font-extrabold text-secondary">${selectedSite?.price.USD.hour}/hr</code>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="divider"></div>
        <div className="card-actions justify-center">
          <button className="btn-primary btn" onClick={confirm}>
            Deploy
          </button>
        </div>
      </div>
      <dialog id="confirmation" className="modal" ref={confirmationDialog}>
        <form method="dialog" className="modal-box">
          <h3 className="text-lg font-bold">Confirmation</h3>
          <p className="py-4">
            This is your last chance to back out! You are about to provision a <span className="text-primary">{flavor}</span> instance which will bill your
            account ${selectedSite?.price.USD.hour} per hour. Are you sure you want to continue?
          </p>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn-primary btn" onClick={finalize}>
              Lets Go!
            </button>
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
