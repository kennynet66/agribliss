import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, 
  TrendingUp,
  TrendingDown,
  Plus,
  Receipt,
  PiggyBank
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

export default function Financial() {
  const monthlyData = [
    { month: 'Jan', income: 15000, expenses: 8000 },
    { month: 'Feb', income: 18000, expenses: 9500 },
    { month: 'Mar', income: 22000, expenses: 11000 },
    { month: 'Apr', income: 25000, expenses: 12500 },
    { month: 'May', income: 28000, expenses: 14000 },
    { month: 'Jun', income: 32000, expenses: 16000 },
    { month: 'Jul', income: 35000, expenses: 18500 }
  ];

  const expenseBreakdown = [
    { name: 'Feed & Supplies', value: 8500, color: '#22c55e' },
    { name: 'Equipment', value: 5200, color: '#3b82f6' },
    { name: 'Labor', value: 3800, color: '#f59e0b' },
    { name: 'Utilities', value: 1000, color: '#ef4444' }
  ];

  const transactions = [
    { id: 1, type: 'income', description: 'Wheat Sale - Grain Corp', amount: 8500, date: 'Jul 15, 2024' },
    { id: 2, type: 'expense', description: 'Fertilizer Purchase', amount: -2200, date: 'Jul 14, 2024' },
    { id: 3, type: 'income', description: 'Milk Sales', amount: 1850, date: 'Jul 13, 2024' },
    { id: 4, type: 'expense', description: 'Equipment Maintenance', amount: -750, date: 'Jul 12, 2024' },
    { id: 5, type: 'income', description: 'Corn Sale', amount: 5200, date: 'Jul 10, 2024' }
  ];

  const stats = [
    { title: "Monthly Revenue", value: "$35,000", change: "+12%", icon: DollarSign, trend: "up" },
    { title: "Monthly Expenses", value: "$18,500", change: "+5%", icon: Receipt, trend: "up" },
    { title: "Net Profit", value: "$16,500", change: "+25%", icon: TrendingUp, trend: "up" },
    { title: "Total Savings", value: "$85,420", change: "+8%", icon: PiggyBank, trend: "up" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Financial Management</h1>
          <p className="text-muted-foreground">Track income, expenses, and profits</p>
        </div>
        <Button className="bg-gradient-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Transaction
        </Button>
      </div>

      {/* Financial Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-card hover:shadow-glow transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className="p-2 rounded-lg bg-primary/10">
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-4 w-4 mr-1 text-success" />
                {stat.change} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Monthly Income vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Bar dataKey="income" fill="hsl(var(--primary))" radius={4} />
                <Bar dataKey="expenses" fill="hsl(var(--accent))" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {expenseBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {expenseBreakdown.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'income' ? 'bg-success/20' : 'bg-destructive/20'
                  }`}>
                    {transaction.type === 'income' ? (
                      <TrendingUp className="h-4 w-4 text-success" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${
                    transaction.amount > 0 ? 'text-success' : 'text-destructive'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                  </p>
                  <Badge variant={transaction.type === 'income' ? 'default' : 'destructive'} className="text-xs">
                    {transaction.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}