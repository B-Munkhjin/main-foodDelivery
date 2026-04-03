import { Payment, columns } from "./Columns";
import { DataTable } from "./DataTable";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
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
      <DataTable columns={columns} data={data} />
    </div>
  );
}
