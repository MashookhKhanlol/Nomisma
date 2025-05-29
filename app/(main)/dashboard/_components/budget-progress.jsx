"use client";

import { useState, useEffect } from "react";
import {
  Pencil,
  Check,
  X,
  Wallet,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  ChevronRight,
  BarChart3,
} from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { updateBudget } from "@/actions/budget";

export function BudgetProgress({ initialBudget, currentExpenses }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(
    initialBudget?.amount?.toString() || ""
  );
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen on client side
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const {
    loading: isLoading,
    fn: updateBudgetFn,
    data: updatedBudget,
    error,
  } = useFetch(updateBudget);

  const percentUsed = initialBudget
    ? (currentExpenses / initialBudget.amount) * 100
    : 0;

  const remaining = initialBudget ? initialBudget.amount - currentExpenses : 0;
  const isOverBudget = percentUsed > 100;
  const isNearLimit = percentUsed >= 80 && percentUsed < 100;

  const getBudgetStatusColor = () => {
    if (isOverBudget) return "bg-red-100 text-red-700 border-red-200";
    if (isNearLimit) return "bg-amber-100 text-amber-700 border-amber-200";
    return "bg-green-100 text-green-700 border-green-200";
  };

  const getBudgetStatusIcon = () => {
    if (isOverBudget) return <AlertTriangle className="w-4 h-4 mr-1" />;
    if (isNearLimit) return <AlertTriangle className="w-4 h-4 mr-1" />;
    return <Check className="w-4 h-4 mr-1" />;
  };

  const getBudgetStatusText = () => {
    if (isOverBudget) return "Over Budget";
    if (isNearLimit) return "Near Limit";
    return "On Track";
  };

  const handleUpdateBudget = async () => {
    const amount = parseFloat(newBudget);

    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    await updateBudgetFn(amount);
  };

  const handleCancel = () => {
    setNewBudget(initialBudget?.amount?.toString() || "");
    setIsEditing(false);
  };

  useEffect(() => {
    if (updatedBudget?.success) {
      setIsEditing(false);
      toast.success("Budget updated successfully");
    }
  }, [updatedBudget]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update budget");
    }
  }, [error]);

  // Get current month and year
  const currentMonthYear = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-2 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 p-1.5 rounded-full">
              <BarChart3 size={16} className="text-blue-600" />
            </span>
            <CardTitle className="text-base font-semibold">
              Monthly Budget
            </CardTitle>
          </div>

          {!isEditing && initialBudget && (
            <Badge
              variant="outline"
              className={`${getBudgetStatusColor()} mt-2 sm:mt-0`}
            >
              <div className="flex items-center">
                {getBudgetStatusIcon()}
                {getBudgetStatusText()}
              </div>
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        {!initialBudget && !isEditing ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
              <Wallet className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <p className="text-muted-foreground">
                No budget set for {currentMonthYear}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Set a budget to track your spending
              </p>
            </div>
            <Button
              onClick={() => setIsEditing(true)}
              className="mt-2 bg-blue-600 hover:bg-blue-700"
            >
              <DollarSign className="h-4 w-4 mr-1" />
              Set Monthly Budget
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {isEditing ? (
              <div className="space-y-3">
                <label className="text-sm font-medium">
                  Set Monthly Budget for {currentMonthYear}
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <div className="relative flex-1 w-full">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <Input
                      type="number"
                      value={newBudget}
                      onChange={(e) => setNewBudget(e.target.value)}
                      className="pl-7"
                      placeholder="Enter amount"
                      autoFocus
                      disabled={isLoading}
                    />
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                    <Button
                      variant="outline"
                      size={isMobile ? "default" : "icon"}
                      onClick={handleUpdateBudget}
                      disabled={isLoading}
                      className={`${
                        isMobile ? "flex-1" : "w-9 h-9"
                      } text-green-600 border-green-200 hover:bg-green-50`}
                    >
                      {isMobile ? (
                        <span className="flex items-center">
                          <Check className="h-4 w-4 mr-2" /> Save
                        </span>
                      ) : (
                        <Check className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size={isMobile ? "default" : "icon"}
                      onClick={handleCancel}
                      disabled={isLoading}
                      className={`${
                        isMobile ? "flex-1" : "w-9 h-9"
                      } text-red-600 border-red-200 hover:bg-red-50`}
                    >
                      {isMobile ? (
                        <span className="flex items-center">
                          <X className="h-4 w-4 mr-2" /> Cancel
                        </span>
                      ) : (
                        <X className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Current Spending
                    </p>
                    <p className="text-xl font-semibold mt-1">
                      ${currentExpenses.toFixed(2)}{" "}
                      <span className="text-sm text-muted-foreground font-normal ml-1">
                        of ${initialBudget.amount.toFixed(2)}
                      </span>
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 self-start sm:self-auto mt-2 sm:mt-0"
                  >
                    <Pencil className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                </div>

                {/* Responsive Circular Budget Chart */}
                <div className="flex flex-col sm:flex-row items-center justify-center py-4">
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-4 sm:mb-0">
                    {/* Background circle */}
                    <div className="absolute inset-0 rounded-full border-8 border-gray-100"></div>

                    {/* Progress circle with gradient */}
                    <svg
                      className="absolute inset-0 w-full h-full rotate-[-90deg]"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="46"
                        fill="none"
                        stroke={
                          isOverBudget
                            ? "#FEE2E2" // Light red for over budget
                            : isNearLimit
                              ? "#FEF3C7" // Light amber for near limit
                              : "#DCFCE7" // Light green for on track
                        }
                        strokeWidth="8"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="46"
                        fill="none"
                        stroke={
                          isOverBudget
                            ? "#EF4444" // Red for over budget
                            : isNearLimit
                              ? "#F59E0B" // Amber for near limit
                              : "#10B981" // Green for on track
                        }
                        strokeWidth="8"
                        strokeDasharray="289.02652413026095"
                        strokeDashoffset={
                          289.02652413026095 *
                          (1 - Math.min(percentUsed, 100) / 100)
                        }
                        strokeLinecap="round"
                      />
                    </svg>

                    {/* Center text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl sm:text-2xl font-bold">
                        {Math.min(percentUsed, 100).toFixed(0)}%
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Used
                      </span>
                    </div>
                  </div>

                  {/* Extra info for desktop */}
                  {!isMobile && (
                    <div className="ml-6 space-y-2 hidden sm:block">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-sm">
                          Budget: ${initialBudget.amount.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-sm">
                          Spent: ${currentExpenses.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            remaining >= 0 ? "bg-blue-500" : "bg-orange-500"
                          }`}
                        ></div>
                        <span className="text-sm">
                          {remaining >= 0 ? "Remaining:" : "Overspent:"} $
                          {Math.abs(remaining).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span>Budget Usage</span>
                    <span className="font-medium">
                      ${currentExpenses.toFixed(2)} / $
                      {initialBudget.amount.toFixed(2)}
                    </span>
                  </div>
                  <Progress
                    value={Math.min(percentUsed, 100)}
                    className={`h-2 ${
                      isOverBudget
                        ? "bg-red-100"
                        : isNearLimit
                          ? "bg-amber-100"
                          : "bg-green-100"
                    }`}
                    extraStyles={
                      isOverBudget
                        ? "bg-red-500"
                        : isNearLimit
                          ? "bg-amber-500"
                          : "bg-green-500"
                    }
                  />
                </div>
              </>
            )}
          </div>
        )}
      </CardContent>

      {initialBudget && !isEditing && (
        <CardFooter className="pt-3 pb-3 flex flex-col sm:flex-row justify-between border-t gap-2">
          <div className="text-sm flex items-center">
            {remaining >= 0 ? (
              <span className="text-green-600 font-medium flex items-center gap-1">
                <DollarSign size={14} className="text-green-500" />$
                {remaining.toFixed(2)} remaining
              </span>
            ) : (
              <span className="text-red-600 font-medium flex items-center gap-1">
                <TrendingUp size={14} />${Math.abs(remaining).toFixed(2)} over
                budget
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-sm text-blue-600 p-0 h-auto hover:bg-transparent hover:text-blue-800 self-end"
          >
            View Details <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
