import { Suspense } from "react";
import { Payment, columns } from "./Columns";
import { DataTable } from "./DataTable";

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ];
}

export default async function GetOrdersPage() {
  const data = await getData();

  return (
    <div className="container mt-20 w-full">
      <Suspense fallback={<div>Loading...</div>}>
        <DataTable columns={columns} data={data} />
      </Suspense>
    </div>
  );
}
