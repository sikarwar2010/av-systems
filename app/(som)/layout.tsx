import SalesLayout from "@/components/layouts/ui/Saleslayout";

export default function SalesDashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <SalesLayout>
                {children}
            </SalesLayout>
        </div>
    );
}
