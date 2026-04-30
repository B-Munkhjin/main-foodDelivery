import { AddFood } from "@/app/Components/AddFood";
import { DishesCategory } from "@/app/Components/Categories";
import GetOrders from "@/app/Components/GetOrder";
// import { EditFood } from "@/app/Components/EditFood";
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="w-full font-inter  bg-[#f4f4f5] ">
      <GetOrders initialOrders={[]} />
    </div>
  );
}
