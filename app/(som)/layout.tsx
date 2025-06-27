import DashboardLayoutPage from "@/components/layouts/dashboardlayout";

export default function SalesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <DashboardLayoutPage>
                {children}
            </DashboardLayoutPage>
        </div>
    );
}
