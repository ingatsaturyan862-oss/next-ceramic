import React from 'react';
import { cn } from '@/lib/utils';
import { Order } from '@prisma/client';
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/table';


interface Props {
    className?: string;
    data: Order[]
}
export const StatisticOrder: React.FC<Props> = (props) => {
    const { className, data } = props;
    return (

        <Table className={cn("", className)}>
            <TableHeader>
                <TableRow>
                    <TableHead>Id</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Your order has been confirmed</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((el) => (
                    <TableRow key={el.id}>
                        <TableCell >{el.id}</TableCell>
                        <TableCell >{el.address}</TableCell>
                        <TableCell >{el.phone}</TableCell>
                        <TableCell>{el.email}</TableCell>
                        <TableCell>{el.createdAt?.toString().split("T")[0]}</TableCell>
                        <TableCell >{el.status}</TableCell>
                        <TableCell >{el.totalAmount}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}