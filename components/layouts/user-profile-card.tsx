import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Shield, User } from "lucide-react"

interface UserProfileCardProps {
    user: {
        name: string
        email: string
        avatar: string
        role: "Admin" | "Manager" | "Employee"
    }
}

export function UserProfileCard({ user }: UserProfileCardProps) {
    const getRoleConfig = (role: string) => {
        switch (role) {
            case "Admin":
                return {
                    color: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
                    icon: Shield,
                }
            case "Manager":
                return {
                    color: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
                    icon: User,
                }
            case "Employee":
                return {
                    color:
                        "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800",
                    icon: User,
                }
            default:
                return {
                    color: "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950 dark:text-gray-300 dark:border-gray-800",
                    icon: User,
                }
        }
    }

    const config = getRoleConfig(user.role)
    const RoleIcon = config.icon

    return (
        <Card className="w-full max-w-sm hover:shadow-lg transition-shadow duration-200 border-0 shadow-md bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
            <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4">
                    {/* Avatar */}
                    <div className="relative">
                        <Avatar className="h-20 w-20 ring-4 ring-white shadow-lg dark:ring-gray-800">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                                {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-2 -right-2">
                            <div className={`p-2 rounded-full ${config.color} shadow-sm`}>
                                <RoleIcon className="h-4 w-4" />
                            </div>
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="text-center space-y-2">
                        <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100">{user.name}</h3>
                        <div className="flex items-center justify-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                            <Mail className="h-4 w-4" />
                            <span>{user.email}</span>
                        </div>
                    </div>

                    {/* Role Badge */}
                    <Badge variant="outline" className={`${config.color} font-medium px-4 py-1.5 text-sm`}>
                        <RoleIcon className="h-3 w-3 mr-1" />
                        {user.role}
                    </Badge>

                    {/* Status Indicator */}
                    <div className="flex items-center gap-2 text-sm">
                        <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-600 dark:text-green-400 font-medium">Active</span>
                    </div>

                    {/* Additional Info */}
                    <div className="w-full pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">24</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Projects</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">156</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Tasks</div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
