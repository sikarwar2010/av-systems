import { Badge } from "@/components/ui/badge"

interface RoleBadgeProps {
    role: "Admin" | "Manager" | "Employee"
    size?: "sm" | "md" | "lg"
}

export function RoleBadge({ role, size = "sm" }: RoleBadgeProps) {
    const getRoleConfig = (role: string) => {
        switch (role) {
            case "Admin":
                return {
                    color: "bg-red-100 text-red-800 border-red-200 hover:bg-red-100",
                    icon: "👑",
                }
            case "Manager":
                return {
                    color: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100",
                    icon: "⚡",
                }
            case "Employee":
                return {
                    color: "bg-green-100 text-green-800 border-green-200 hover:bg-green-100",
                    icon: "👤",
                }
            default:
                return {
                    color: "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100",
                    icon: "❓",
                }
        }
    }

    const config = getRoleConfig(role)
    const sizeClasses = {
        sm: "text-xs px-2 py-0.5",
        md: "text-sm px-3 py-1",
        lg: "text-base px-4 py-1.5",
    }

    return (
        <Badge variant="outline" className={`${config.color} ${sizeClasses[size]} font-medium flex items-center gap-1`}>
            <span className="text-xs">{config.icon}</span>
            {role}
        </Badge>
    )
}
