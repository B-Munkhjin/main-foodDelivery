"use client";
import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronDown, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
type OrderStatus = "PENDING" | "DELIVERED" | "CANCELED";

interface OrderUser {
  id: number;
  email: string;
}

interface OrderFood {
  id?: number;
  foodName?: string;
  image?: string;
}

interface FoodOrderItem {
  id?: number;
  quantity: number;
  food: OrderFood;
}

interface Order {
  id: number;
  user: OrderUser;
  foodOrderItems: FoodOrderItem[];
  totalPrice: number;
  status: OrderStatus;
  createdAt?: string;
}

interface OrdersTableProps {
  initialOrders?: Order[];
}

function getStatusStyles(status: OrderStatus) {
  switch (status) {
    case "DELIVERED":
      return " border-green-200 ";
    case "PENDING":
      return " border-red-200";
    case "CANCELED":
      return "";
    default:
      return " text-gray-600";
  }
}

export default function GetOrders({ initialOrders }: OrdersTableProps) {
  const [orders, setOrders] = useState<Order[]>(initialOrders ?? []);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        console.log(orders);
        const res = await fetch("http://localhost:3001/orders");
        if (!res.ok) throw new Error(`Failed to load orders: ${res.status}`);
        const { orders: remote } = await res.json();
        if (!mounted) return;
        const mapped = (remote || []).map((item: any) => ({
          id: item.id,
          user: item.user ?? { id: item.userId, email: `user_${item.userId}` },
          foodOrderItems: (item.foodOrderItems || []).map((it: any) => ({
            id: it.id,
            quantity: it.quantity,
            food: it.food ?? {
              foodName: it.foodName,
              image: it.image,
            },
          })),
          totalPrice: item.totalPrice ?? item.total_price ?? 0,
          status: (item.status as OrderStatus) ?? ("PENDING" as OrderStatus),
          createdAt: item.createdAt ?? item.created_at,
        }));

        setOrders(mapped);
      } catch (err: any) {
        console.error(err);
        if (mounted) setError(err.message ?? String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);
  const formatDate = (iso?: string) => {
    if (!iso) return "-";
    try {
      const d = new Date(iso);
      return new Intl.DateTimeFormat("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(d);
    } catch {
      return iso;
    }
  };

  const dateRange = React.useMemo(() => {
    if (!orders || orders.length === 0) return "-";
    const dates = orders
      .map((o) => (o.createdAt ? new Date(o.createdAt).getTime() : NaN))
      .filter((t) => !Number.isNaN(t)) as number[];

    if (dates.length === 0) return "-";

    const min = new Date(Math.min(...dates));
    const max = new Date(Math.max(...dates));

    return `${formatDate(min.toISOString())} - ${formatDate(
      max.toISOString(),
    )}`;
  }, [orders]);

  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [tempStatus, setTempStatus] = useState<OrderStatus>("DELIVERED");

  ///bugd select
  const toggleSelectAll = () => {
    if (selectedIds.size === orders.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(orders.map((o) => o.id)));
    }
  };

  ////moroor select hiih
  const toggleSelectRow = (id: number) => {
    const newSet = new Set(selectedIds);

    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);

    setSelectedIds(newSet);
  };

  const handleStatusChange = async (
    orderId: number,

    newStatus: OrderStatus,
  ) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
    );

    await fetch(`http://localhost:3001/orders/${orderId}`, {
      method: "PATCH",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({ status: newStatus }),
    });
  };

  const handleBulkUpdate = async () => {
    const idsToUpdate = Array.from(selectedIds);

    setOrders((prev) =>
      prev.map((o) =>
        selectedIds.has(o.id) ? { ...o, status: tempStatus } : o,
      ),
    );

    setSelectedIds(new Set());

    setIsDialogOpen(false);

    await Promise.all(
      idsToUpdate.map((id) =>
        fetch(`http://localhost:3001/orders/${id}`, {
          method: "PATCH",

          headers: { "Content-Type": "application/json" },

          body: JSON.stringify({ status: tempStatus }),
        }),
      ),
    );
  };

  return (
    <div>
      <div className="w-full mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-50">
          <div className="flex">
            <h1 className="text-xl font-bold text-gray-900">Orders</h1>
            <p className="text-sm text-zinc-500 font-medium">
              {orders.length} items
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 border rounded-full text-sm text-gray-600 bg-white shadow-sm">
              <CalendarIcon size={16} className="text-gray-400" />
              <span className="font-medium">{dateRange}</span>
            </div>

            <Dialog
              open={isDialogOpen && selectedIds.size > 0}
              onOpenChange={(open) => {
                if (open && selectedIds.size > 0) {
                  setIsDialogOpen(true);
                } else {
                  setIsDialogOpen(false);
                }
              }}
            >
              <DialogTrigger>
                <Button
                  className="px-4 py-2 h-9 rounded-full bg-gray-900 hover:bg-gray-800 text-white flex items-center gap-2"
                  disabled={selectedIds.size === 0}
                >
                  Change delivery state
                  {selectedIds.size > 0 && (
                    <span className="flex items-center justify-center bg-white text-black text-[10px] font-bold w-5 h-5 rounded-full">
                      {selectedIds.size}
                    </span>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-105 p-8 rounded-xl border-none shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-xl  text-gray-900">
                    Change delivery state
                  </DialogTitle>
                </DialogHeader>
                <div className="flex gap-3 py-8 justify-center">
                  {(["DELIVERED", "PENDING", "CANCELED"] as OrderStatus[]).map(
                    (status) => (
                      <button
                        key={status}
                        onClick={() => setTempStatus(status)}
                        className={cn(
                          "px-5 h-9 py-2 rounded-full text-sm font-medium transition-all border",

                          tempStatus === status
                            ? "bg-red-50 border-red-200 text-red-500"
                            : "bg-gray-50 border-transparent text-gray-600 hover:bg-gray-100",
                        )}
                      >
                        {status.charAt(0) + status.slice(1).toLowerCase()}
                      </button>
                    ),
                  )}
                </div>
                <Button
                  onClick={handleBulkUpdate}
                  className="w-full h-9 bg-black text-white rounded-full text-sm "
                >
                  Save
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="">
          <table className="w-full text-left ">
            <thead className="text-[11px] font-bold text-zinc-400 ">
              <tr>
                <th className="px-6 py-4 w-10">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 w-4 h-4"
                    checked={
                      orders.length > 0 && selectedIds.size === orders.length
                    }
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-4 py-4">№</th>
                <th className="px-4 py-4">Customer</th>
                <th className="px-4 py-4">Food</th>
                <th className="px-4 py-4">Total</th>
                <th className="px-4 py-4 text-right pr-10">Delivery state</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order, idx) => (
                <tr
                  key={order.id}
                  className={cn(
                    "text-[13px] transition-colors",
                    selectedIds.has(order.id)
                      ? "bg-blue-50/30"
                      : "hover:bg-gray-50/50",
                  )}
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      className="rounded border-gray-200 accent-black w-4 h-4"
                      checked={selectedIds.has(order.id)}
                      onChange={() => toggleSelectRow(order.id)}
                    />
                  </td>
                  <td className="px-4 py-4 text-black font-mono">{idx + 1}</td>
                  <td className="px-4 py-4 font-semibold text-zinc-500">
                    {order.user.email}
                  </td>
                  <td className="px-4 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-2 font-medium text-gray-600 outline-none">
                          {order.foodOrderItems.length}
                          <ChevronDown size={14} className="text-zinc-400" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        style={{ width: "263px" }}
                        className="p-4 rounded-md shadow-2xl bg-white border border-gray-100 space-y-4"
                      >
                        {order.foodOrderItems.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between gap-3"
                          >
                            <div className="flex items-center gap-3">
                              {item.food.image ? (
                                <img
                                  src={item.food.image}
                                  alt={item.food.foodName || "Food image"}
                                  className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                                />
                              ) : (
                                <div className=" rounded-lg bg-gray-200 flex items-center justify-center text-[10px] text-gray-400">
                                  <img
                                    src={item.food.image || "/foodImg.png"}
                                    alt={item.food.foodName}
                                    className="size-12 rounded-xl object-cover"
                                  ></img>
                                </div>
                              )}
                              <span className="text-sm font-medium text-black ">
                                {item.food.foodName}
                              </span>
                            </div>
                            <span className="text-sm text-gray-400 ">
                              x {item.quantity}
                            </span>
                          </div>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                  <td className="px-4 py-4 font-bold text-zinc-500">
                    ${order.totalPrice}
                  </td>
                  <td className="px-4 py-4 text-right pr-6">
                    <div className="inline-block min-w-27.5">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(
                            order.id,
                            e.target.value as OrderStatus,
                          )
                        }
                        className={cn(
                          "h-8 rounded-full text-[11px] font-bold border px-4 w-full  bg-white cursor-pointer",
                          getStatusStyles(order.status),
                        )}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELED">CANCELED</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
