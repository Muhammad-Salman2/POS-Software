// "use client"

// import { useState, useEffect } from "react"
// import {
//   Activity,
//   CreditCard,
//   DollarSign,
//   Package,
//   ShoppingCart,
//   Users,
//   Zap,
//   Target,
//   Clock,
//   Wifi,
//   WifiOff,
//   Settings,
//   Search,
//   Filter,
//   Download,
//   RefreshCw,
// } from "lucide-react"

// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { SalesChart } from "./components/sales-chart"
// import { LiveNotifications } from "./components/live-notifications"
// import { ProductHeatmap } from "./components/product-heatmap"

// export default function AdvancedPOSDashboard() {
//   const [isOnline, setIsOnline] = useState(true)
//   const [currentTime, setCurrentTime] = useState(new Date())
//   const [activeUsers, setActiveUsers] = useState(12)

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date())
//       setActiveUsers((prev) => prev + Math.floor(Math.random() * 3) - 1)
//     }, 1000)

//     const connectionTimer = setInterval(() => {
//       setIsOnline((prev) => (Math.random() > 0.1 ? true : !prev))
//     }, 10000)

//     return () => {
//       clearInterval(timer)
//       clearInterval(connectionTimer)
//     }
//   }, [])

//   const recentTransactions = [
//     {
//       id: "TXN-2024-001",
//       customer: "Alice Johnson",
//       amount: 47.85,
//       method: "Card",
//       status: "completed",
//       time: "2m ago",
//     },
//     { id: "TXN-2024-002", customer: "Bob Smith", amount: 23.5, method: "Cash", status: "completed", time: "5m ago" },
//     {
//       id: "TXN-2024-003",
//       customer: "Carol Davis",
//       amount: 89.99,
//       method: "Mobile",
//       status: "processing",
//       time: "8m ago",
//     },
//     {
//       id: "TXN-2024-004",
//       customer: "David Wilson",
//       amount: 156.75,
//       method: "Card",
//       status: "completed",
//       time: "12m ago",
//     },
//     { id: "TXN-2024-005", customer: "Eva Brown", amount: 34.2, method: "Cash", status: "refunded", time: "15m ago" },
//   ]

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
//       {/* Advanced Header */}
//       <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-6">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
//                 <Zap className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                   NexusPOS Pro
//                 </h1>
//                 <p className="text-sm text-gray-500">Advanced Retail Management</p>
//               </div>
//             </div>

//             <div className="flex items-center space-x-4">
//               <Badge variant={isOnline ? "default" : "destructive"} className="flex items-center gap-1">
//                 {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
//                 {isOnline ? "Online" : "Offline"}
//               </Badge>
//               <Badge variant="outline" className="flex items-center gap-1">
//                 <Users className="w-3 h-3" />
//                 {activeUsers} Active
//               </Badge>
//               <Badge variant="secondary" className="flex items-center gap-1">
//                 <Clock className="w-3 h-3" />
//                 {currentTime.toLocaleTimeString()}
//               </Badge>
//             </div>
//           </div>

//           <div className="flex items-center space-x-3">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//               <Input
//                 placeholder="Search products, customers..."
//                 className="pl-10 w-80 bg-gray-50 border-0 focus:bg-white transition-colors"
//               />
//             </div>
//             <Button variant="outline" size="sm">
//               <Filter className="w-4 h-4 mr-2" />
//               Filter
//             </Button>
//             <Button variant="outline" size="sm">
//               <Download className="w-4 h-4 mr-2" />
//               Export
//             </Button>
//             <Button variant="outline" size="sm">
//               <Settings className="w-4 h-4" />
//             </Button>
//           </div>
//         </div>
//       </header>

//       <div className="p-6 space-y-6">
//         {/* Enhanced Metrics Cards */}
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//           <Card className="relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-bl-full opacity-10"></div>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
//               <DollarSign className="h-4 w-4 text-green-600" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-green-700">$12,847</div>
//               <div className="flex items-center text-xs text-green-600 mt-1">
//                 <Activity className="w-3 h-3 mr-1" />
//                 +18.2% from yesterday
//               </div>
//               <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
//                 <div
//                   className="h-full bg-gradient-to-r from-green-400 to-emerald-600 rounded-full"
//                   style={{ width: "72%" }}
//                 ></div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-bl-full opacity-10"></div>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Transactions</CardTitle>
//               <CreditCard className="h-4 w-4 text-blue-600" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-blue-700">342</div>
//               <div className="flex items-center text-xs text-blue-600 mt-1">
//                 <Activity className="w-3 h-3 mr-1" />
//                 +12.5% from yesterday
//               </div>
//               <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
//                 <div
//                   className="h-full bg-gradient-to-r from-blue-400 to-indigo-600 rounded-full"
//                   style={{ width: "85%" }}
//                 ></div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-600 rounded-bl-full opacity-10"></div>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
//               <Target className="h-4 w-4 text-purple-600" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-purple-700">$37.56</div>
//               <div className="flex items-center text-xs text-purple-600 mt-1">
//                 <Activity className="w-3 h-3 mr-1" />
//                 +5.8% from yesterday
//               </div>
//               <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
//                 <div
//                   className="h-full bg-gradient-to-r from-purple-400 to-pink-600 rounded-full"
//                   style={{ width: "63%" }}
//                 ></div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-400 to-red-600 rounded-bl-full opacity-10"></div>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Active Products</CardTitle>
//               <Package className="h-4 w-4 text-orange-600" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-orange-700">1,247</div>
//               <div className="flex items-center text-xs text-orange-600 mt-1">
//                 <Activity className="w-3 h-3 mr-1" />
//                 +2.1% from yesterday
//               </div>
//               <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
//                 <div
//                   className="h-full bg-gradient-to-r from-orange-400 to-red-600 rounded-full"
//                   style={{ width: "91%" }}
//                 ></div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Main Dashboard Grid */}
//         <div className="grid gap-6 lg:grid-cols-4">
//           {/* Sales Chart - Takes 2 columns */}
//           <SalesChart />

//           {/* Live Notifications - Takes 1 column */}
//           <LiveNotifications />

//           {/* Recent Transactions - Takes 1 column */}
//           <Card>
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <CardTitle className="flex items-center gap-2">
//                   <Activity className="w-5 h-5" />
//                   Recent Activity
//                 </CardTitle>
//                 <Button variant="ghost" size="sm">
//                   <RefreshCw className="w-4 h-4" />
//                 </Button>
//               </div>
//               <CardDescription>Latest transactions and activities</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               {recentTransactions.map((transaction) => (
//                 <div
//                   key={transaction.id}
//                   className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
//                 >
//                   <div className="flex-1">
//                     <div className="flex items-center justify-between">
//                       <p className="font-medium text-sm">{transaction.customer}</p>
//                       <Badge
//                         variant={
//                           transaction.status === "completed"
//                             ? "default"
//                             : transaction.status === "processing"
//                               ? "secondary"
//                               : "destructive"
//                         }
//                         className="text-xs"
//                       >
//                         {transaction.status}
//                       </Badge>
//                     </div>
//                     <div className="flex items-center justify-between mt-1">
//                       <p className="text-xs text-gray-500">
//                         {transaction.method} • {transaction.time}
//                       </p>
//                       <p className="font-semibold text-sm">${transaction.amount}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         </div>

//         {/* Product Performance Heatmap */}
//         <div className="grid gap-6 lg:grid-cols-3">
//           <ProductHeatmap />

//           {/* Quick Actions Panel */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Quick Actions</CardTitle>
//               <CardDescription>Frequently used operations</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               <Button className="w-full justify-start h-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
//                 <ShoppingCart className="w-5 h-5 mr-3" />
//                 New Sale
//               </Button>
//               <Button variant="outline" className="w-full justify-start h-12 bg-transparent">
//                 <Package className="w-5 h-5 mr-3" />
//                 Manage Inventory
//               </Button>
//               <Button variant="outline" className="w-full justify-start h-12 bg-transparent">
//                 <Users className="w-5 h-5 mr-3" />
//                 Customer Database
//               </Button>
//               <Button variant="outline" className="w-full justify-start h-12 bg-transparent">
//                 <Activity className="w-5 h-5 mr-3" />
//                 Analytics Report
//               </Button>
//               <Button variant="outline" className="w-full justify-start h-12 bg-transparent">
//                 <Settings className="w-5 h-5 mr-3" />
//                 System Settings
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }
