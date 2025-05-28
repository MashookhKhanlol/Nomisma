"use client";

import { ArrowUpRight, ArrowDownRight, CreditCard } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useEffect } from "react";
import useFetch from "@/hooks/use-fetch";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { updateDefaultAccount } from "@/actions/account";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export function AccountCard({ account }) {
  const { name, type, balance, id, isDefault } = account;
  const router = useRouter();

  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount);

  const handleCardClick = () => {
    router.push(`/account/${id}`);
  };

  const handleDefaultClick = (event) => {
    event.stopPropagation(); // Prevent card click navigation
  };

  const handleDefaultChange = async () => {
    if (isDefault) {
      toast.warning("You need at least 1 default account");
      return;
    }
    await updateDefaultFn(id);
  };

  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Default account updated successfully");
    }
  }, [updatedAccount]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update default account");
    }
  }, [error]);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={handleCardClick}
      className="cursor-pointer"
    >
      <Card className="relative overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
        <div className={`absolute inset-0 opacity-5 ${getGradientByType(type)}`} />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${getBackgroundByType(type)}`}>
              {getIconByType(type)}
            </div>
            <div>
              <CardTitle className="text-lg font-semibold capitalize">
                {name}
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()} Account
              </p>
            </div>
          </div>
          <div onClick={handleDefaultClick}>
            <Switch
              checked={isDefault}
              onChange={handleDefaultChange}
              disabled={updateDefaultLoading}
              className="data-[state=checked]:bg-blue-600"
            />
          </div>
        </CardHeader>
        <CardContent className="py-4 relative z-10">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold tracking-tight">
              ${parseFloat(balance).toFixed(2)}
            </span>
            <span className="text-sm text-muted-foreground">USD</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between text-sm bg-gray-50 dark:bg-gray-900/50 py-3 relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-700 dark:text-green-500">Income</span>
            </div>
            <div className="w-px h-4 bg-gray-200 dark:bg-gray-700" />
            <div className="flex items-center">
              <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
              <span className="text-red-700 dark:text-red-500">Expense</span>
            </div>
          </div>
          {isDefault && (
            <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
              Default
            </span>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}

// Helper functions
function getGradientByType(type) {
  switch (type.toLowerCase()) {
    case "savings":
      return "bg-gradient-to-r from-blue-600 to-cyan-600";
    case "checking":
      return "bg-gradient-to-r from-purple-600 to-pink-600";
    case "credit":
      return "bg-gradient-to-r from-orange-600 to-red-600";
    default:
      return "bg-gradient-to-r from-gray-600 to-gray-700";
  }
}

function getBackgroundByType(type) {
  switch (type.toLowerCase()) {
    case "savings":
      return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
    case "checking":
      return "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400";
    case "credit":
      return "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400";
    default:
      return "bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400";
  }
}

function getIconByType(type) {
  return <CreditCard className="h-5 w-5" />;
}
