"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("duration") ?? "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);

    params.set("duration", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className="border hover:border-2-primary-900 flex">
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All services
      </Button>
      <Button
        filter="short"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        30-60 minuets
      </Button>
      <Button
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        60-120 minuets
      </Button>
      <Button
        filter="long"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        120-180 minuets
      </Button>
    </div>
  );
}
function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      className={`px-6 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
