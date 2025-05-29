"use client";

import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { format } from "date-fns";
import {
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Tag,
  PieChart as PieChartIcon,
  BarChart3,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const COLORS = [
  "#6366F1", // Indigo
  "#EC4899", // Pink
  "#3B82F6", // Blue
  "#10B981", // Emerald
  "#F59E0B", // Amber
  "#8B5CF6", // Violet
  "#EF4444", // Red
];

export function DashboardOverview({ accounts, transactions }) {
  const [selectedAccountId, setSelectedAccountId] = useState(
    accounts.find((a) => a.isDefault)?.id || accounts[0]?.id
  );
  const [chartType, setChartType] = useState("pie");
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

  // Filter transactions for selected account
  const accountTransactions = transactions.filter(
    (t) => t.accountId === selectedAccountId
  );

  // Get recent transactions (last 5)
  const recentTransactions = accountTransactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  // Calculate expense breakdown for current month
  const currentDate = new Date();
  const currentMonthExpenses = accountTransactions.filter((t) => {
    const transactionDate = new Date(t.date);
    return (
      t.type === "EXPENSE" &&
      transactionDate.getMonth() === currentDate.getMonth() &&
      transactionDate.getFullYear() === currentDate.getFullYear()
    );
  });

  // Group expenses by category
  const expensesByCategory = currentMonthExpenses.reduce((acc, transaction) => {
    const category = transaction.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += transaction.amount;
    return acc;
  }, {});

  // Format data for charts
  const chartData = Object.entries(expensesByCategory)
    .map(([category, amount]) => ({
      name: category,
      value: amount,
    }))
    .sort((a, b) => b.value - a.value); // Sort by value (highest first)

  // Calculate total expenses
  const totalExpenses = chartData.reduce((sum, item) => sum + item.value, 0);

  // Custom label for pie chart
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    // Don't show labels on mobile for small segments
    if (isMobile && percent < 0.1) return null;

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return percent > 0.05 ? (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={isMobile ? 10 : 12}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
      {/* Recent Transactions Card */}
      <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-4">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <span className="bg-blue-100 p-1.5 rounded-full">
              <Calendar size={16} className="text-blue-600" />
            </span>
            Recent Transactions
          </CardTitle>
          <Select
            value={selectedAccountId}
            onValueChange={setSelectedAccountId}
          >
            <SelectTrigger className="w-full sm:w-[160px] bg-gray-50 border-gray-200">
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.id}>
                  {account.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            {recentTransactions.length === 0 ? (
              <div className="text-center text-muted-foreground py-8 bg-gray-50 rounded-lg">
                <p>No recent transactions</p>
                <p className="text-xs mt-1">Transactions will appear here</p>
              </div>
            ) : (
              recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "p-2 rounded-full",
                        transaction.type === "EXPENSE"
                          ? "bg-red-100"
                          : "bg-green-100"
                      )}
                    >
                      {transaction.type === "EXPENSE" ? (
                        <ArrowDownRight className="h-4 w-4 text-red-600" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {transaction.description || "Untitled Transaction"}
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar size={12} />
                          {format(new Date(transaction.date), "MMM d, yyyy")}
                        </p>
                        {transaction.category && (
                          <Badge
                            variant="outline"
                            className="text-xs font-normal px-1.5 py-0"
                          >
                            <Tag size={10} className="mr-1" />
                            {transaction.category}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "font-medium ml-2",
                      transaction.type === "EXPENSE"
                        ? "text-red-600"
                        : "text-green-600"
                    )}
                  >
                    {transaction.type === "EXPENSE" ? "-" : "+"}$
                    {transaction.amount.toFixed(2)}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Expense Breakdown Card */}
      <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <span className="bg-purple-100 p-1.5 rounded-full">
                <Tag size={16} className="text-purple-600" />
              </span>
              Monthly Expenses
            </CardTitle>
            <div className="flex items-center space-x-1 bg-gray-100 rounded-md p-0.5">
              <button
                onClick={() => setChartType("pie")}
                className={`p-1.5 rounded-md ${
                  chartType === "pie"
                    ? "bg-white shadow-sm"
                    : "hover:bg-gray-200"
                }`}
              >
                <PieChartIcon
                  size={16}
                  className={
                    chartType === "pie" ? "text-purple-600" : "text-gray-600"
                  }
                />
              </button>
              <button
                onClick={() => setChartType("bar")}
                className={`p-1.5 rounded-md ${
                  chartType === "bar"
                    ? "bg-white shadow-sm"
                    : "hover:bg-gray-200"
                }`}
              >
                <BarChart3
                  size={16}
                  className={
                    chartType === "bar" ? "text-purple-600" : "text-gray-600"
                  }
                />
              </button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {format(currentDate, "MMMM yyyy")}
          </p>
        </CardHeader>
        <CardContent>
          {chartData.length === 0 ? (
            <div className="text-center text-muted-foreground py-8 bg-gray-50 rounded-lg">
              <p>No expenses this month</p>
              <p className="text-xs mt-1">Spending data will appear here</p>
            </div>
          ) : (
            <>
              <div
                className={`h-[200px] sm:h-[220px] ${
                  chartType === "bar" && isMobile ? "-ml-6" : ""
                }`}
              >
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === "pie" ? (
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={isMobile ? 60 : 80}
                        innerRadius={isMobile ? 30 : 40}
                        fill="#8884d8"
                        dataKey="value"
                        paddingAngle={2}
                        labelLine={false}
                        label={renderCustomizedLabel}
                      >
                        {chartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                            strokeWidth={1}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => `$${value.toFixed(2)}`}
                        contentStyle={{
                          backgroundColor: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "var(--radius)",
                          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        }}
                      />
                      <Legend
                        layout={isMobile ? "vertical" : "horizontal"}
                        verticalAlign={isMobile ? "middle" : "bottom"}
                        align={isMobile ? "right" : "center"}
                        wrapperStyle={
                          isMobile
                            ? { fontSize: "10px", right: 10, width: 100 }
                            : { fontSize: "12px" }
                        }
                        formatter={(value) =>
                          value.length > (isMobile ? 7 : 12)
                            ? `${value.slice(0, isMobile ? 7 : 12)}...`
                            : value
                        }
                      />
                    </PieChart>
                  ) : (
                    <BarChart
                      data={chartData.slice(0, isMobile ? 3 : 5)} // Show fewer categories on mobile
                      layout="vertical"
                      margin={
                        isMobile
                          ? { top: 5, right: 5, left: 70, bottom: 5 }
                          : { top: 5, right: 30, left: 60, bottom: 5 }
                      }
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        horizontal={true}
                        vertical={false}
                      />
                      <XAxis
                        type="number"
                        tickFormatter={(value) =>
                          isMobile ? `$${value}` : `$${value}`
                        }
                        fontSize={10}
                        tickCount={isMobile ? 3 : 5}
                      />
                      <YAxis
                        dataKey="name"
                        type="category"
                        width={isMobile ? 65 : 100}
                        tick={{ fontSize: isMobile ? 10 : 12 }}
                        tickFormatter={(value) =>
                          value.length > (isMobile ? 8 : 12)
                            ? `${value.slice(0, isMobile ? 8 : 12)}...`
                            : value
                        }
                      />
                      <Tooltip
                        formatter={(value) => `$${value.toFixed(2)}`}
                        contentStyle={{
                          backgroundColor: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "var(--radius)",
                          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        }}
                      />
                      <Bar
                        dataKey="value"
                        barSize={isMobile ? 15 : 20}
                        radius={[0, 4, 4, 0]}
                      >
                        {chartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>

              <div className="space-y-2 mt-4 max-h-[120px] overflow-y-auto pr-2">
                {chartData
                  .slice(0, isMobile ? 4 : undefined)
                  .map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2 max-w-[65%]">
                        <div
                          className="min-w-[12px] w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        />
                        <span className="text-sm truncate">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <span className="text-sm font-medium">
                          ${item.value.toFixed(2)}
                        </span>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          ({Math.round((item.value / totalExpenses) * 100)}%)
                        </span>
                      </div>
                    </div>
                  ))}
                {isMobile && chartData.length > 4 && (
                  <div className="text-xs text-center text-muted-foreground">
                    +{chartData.length - 4} more categories
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Expenses</span>
                  <span className="font-semibold">
                    ${totalExpenses.toFixed(2)}
                  </span>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
