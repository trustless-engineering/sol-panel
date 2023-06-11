"use client";

// import useSWR from 'swr'

export default function Info(): React.JSX.Element {
  // const { data, error, isLoading } = useSWR('/api/debug/info', fetcher)

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <div className="container mx-auto">Info:</div>
      </div>
    </div>
  );
}
