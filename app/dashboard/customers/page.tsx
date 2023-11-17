import Search from "@/app/ui/search";
import CustomersTable from "@/app/ui/customers/table";
import { fetchCustomersPages, fetchFilteredCustomers } from "@/app/lib/data";
import Pagination from "@/app/ui/invoices/pagination";
import { TableRowSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

export default async function Customer({ searchParams }: {
    searchParams?: {
        query?: string;
        page?: string;
    }
}) {
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page || 1);
    const totalPages = await fetchCustomersPages(query);
    return (
        <div className="w-full">
            <h1 className={`mb-8 text-xl md:text-2xl`}>
                Customers
            </h1>
            <Search placeholder="Search customers..." />
            <Suspense key={query + currentPage} fallback={<TableRowSkeleton />}>
                <CustomersTable query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    )
}
