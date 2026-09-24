import React from 'react';
import { cn } from '@/lib/utils';
import { User } from '@prisma/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Image from 'next/image';
import { UserIcon } from 'lucide-react';

interface Props {
    className?: string;
    data: User[];
}

export const StatisticUser: React.FC<Props> = (props) => {
    const { className, data } = props;
    return (
        <Table className={cn("", className)}>
            <TableHeader>
                <TableRow>
                    <TableHead>Avatar</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Mail</TableHead>
                    <TableHead>Register Data</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((el) => (
                    <TableRow key={el.id}>
                        <TableCell>
                            {el.image ?
                                (
                                    <Image width={50} height={50} src={el.image} alt={el.name} />
                                ) : (
                                    <UserIcon />
                                )}
                        </TableCell>
                        <TableCell>{el.name}</TableCell>
                        <TableCell>{el.email}</TableCell>
                        <TableCell>{el.createdAt?.toString().split("T")[0]}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}