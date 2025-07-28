


// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"

// export default function AuthForms() {
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   })
//   const [signupData, setSignupData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   })

//   const handleLogin = (e) => {
//     e.preventDefault()
//     console.log("Login data:", loginData)
//     // Add your login logic here
//   }

//   const handleSignup = (e) => {
//     e.preventDefault()
//     if (signupData.password !== signupData.confirmPassword) {
//       alert("Passwords don't match!")
//       return
//     }
//     console.log("Signup data:", signupData)
//     // Add your signup logic here
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
//       <Card className="w-full max-w-md shadow-xl">
//         <CardHeader className="text-center">
//           <CardTitle className="text-2xl font-bold text-gray-800">Welcome</CardTitle>
//           <CardDescription>Sign in to your account or create a new one</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Tabs defaultValue="login" className="w-full">
//             <TabsList className="grid w-full grid-cols-2">
//               <TabsTrigger value="login">Login</TabsTrigger>
//               <TabsTrigger value="signup">Sign Up</TabsTrigger>
//             </TabsList>

//             <TabsContent value="login" className="space-y-4 mt-6">
//               <form onSubmit={handleLogin} className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="login-email">Email</Label>
//                   <div className="relative">
//                     <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                     <Input
//                       id="login-email"
//                       type="email"
//                       placeholder="Enter your email"
//                       className="pl-10"
//                       value={loginData.email}
//                       onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="login-password">Password</Label>
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                     <Input
//                       id="login-password"
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Enter your password"
//                       className="pl-10 pr-10"
//                       value={loginData.password}
//                       onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
//                       required
//                     />
//                     <button
//                       type="button"
//                       className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                     </button>
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-2">
//                     <input type="checkbox" id="remember" className="rounded border-gray-300" />
//                     <Label htmlFor="remember" className="text-sm text-gray-600">
//                       Remember me
//                     </Label>
//                   </div>
//                   <a href="#" className="text-sm text-blue-600 hover:underline">
//                     Forgot password?
//                   </a>
//                 </div>

//                 <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
//                   Sign In
//                 </Button>
//               </form>
//             </TabsContent>

//             <TabsContent value="signup" className="space-y-4 mt-6">
//               <form onSubmit={handleSignup} className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="signup-name">Full Name</Label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                     <Input
//                       id="signup-name"
//                       type="text"
//                       placeholder="Enter your full name"
//                       className="pl-10"
//                       value={signupData.name}
//                       onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="signup-email">Email</Label>
//                   <div className="relative">
//                     <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                     <Input
//                       id="signup-email"
//                       type="email"
//                       placeholder="Enter your email"
//                       className="pl-10"
//                       value={signupData.email}
//                       onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="signup-password">Password</Label>
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                     <Input
//                       id="signup-password"
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Create a password"
//                       className="pl-10 pr-10"
//                       value={signupData.password}
//                       onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
//                       required
//                     />
//                     <button
//                       type="button"
//                       className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                     </button>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="confirm-password">Confirm Password</Label>
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                     <Input
//                       id="confirm-password"
//                       type={showConfirmPassword ? "text" : "password"}
//                       placeholder="Confirm your password"
//                       className="pl-10 pr-10"
//                       value={signupData.confirmPassword}
//                       onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
//                       required
//                     />
//                     <button
//                       type="button"
//                       className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
//                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     >
//                       {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                     </button>
//                   </div>
//                 </div>

//                 <div className="flex items-center space-x-2">
//                   <input type="checkbox" id="terms" className="rounded border-gray-300" required />
//                   <Label htmlFor="terms" className="text-sm text-gray-600">
//                     I agree to the{" "}
//                     <a href="#" className="text-blue-600 hover:underline">
//                       Terms and Conditions
//                     </a>
//                   </Label>
//                 </div>

//                 <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
//                   Create Account
//                 </Button>
//               </form>
//             </TabsContent>
//           </Tabs>

//           <div className="mt-6">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <span className="w-full border-t" />
//               </div>
//               <div className="relative flex justify-center text-xs uppercase">
//                 <span className="bg-white px-2 text-gray-500">Or continue with</span>
//               </div>
//             </div>

//             <div className="mt-4 grid grid-cols-2 gap-3">
//               <Button variant="outline" className="w-full bg-transparent">
//                 <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
//                   <path
//                     fill="currentColor"
//                     d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                   />
//                   <path
//                     fill="currentColor"
//                     d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                   />
//                   <path
//                     fill="currentColor"
//                     d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                   />
//                   <path
//                     fill="currentColor"
//                     d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                   />
//                 </svg>
//                 Google
//               </Button>
//               <Button variant="outline" className="w-full bg-transparent">
//                 <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
//                 </svg>
//                 Twitter
//               </Button>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
