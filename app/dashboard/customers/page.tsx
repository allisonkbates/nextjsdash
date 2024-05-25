import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import Table from '@/app/ui/customers/table';
import { TableRowSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import Pagination from '@/app/ui/invoices/pagination';
import { fetchFilteredCustomers } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page({
    searchParams,
    }: {
    searchParams?: {
        query?: string;
        page?: string;
    };
    }) {
    const query = searchParams?.query || '';
    // const currentPage = Number(searchParams?.page) || 1; 
    const customers = await fetchFilteredCustomers(query);
    // console.log(customers);  

  return (
    <div className="w-full">
       <Suspense key={query} fallback={<TableRowSkeleton />}>
            <Table customers={customers}/>
        </Suspense>
    </div>
  );
}