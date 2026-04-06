import { AddFood } from "@/app/Components/AddFood";
import { DishesCategory } from "@/app/Components/Categories";
import { GetOrders } from "@/app/Components/GetOrder";
import GetOrdersPage from "@/app/Components/GetOrders/page";
// import { EditFood } from "@/app/Components/EditFood";

export default function Home() {
  return (
    <div className="font-inter w-full bg-[#f4f4f5] rounded-2xl px-10 pt-0 mt-0">
      <GetOrdersPage />
    </div>
  );
}
