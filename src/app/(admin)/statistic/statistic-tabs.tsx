"use client"
import React from 'react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatisticUser } from './statistic-user';
import { StatisticOrder } from './statistic-order';
import { Order, User } from '@prisma/client';

interface Props {
    className?: string;
}

interface StateProps {
    users: User[],
    order: Order[],

}
export const StatisticTabs: React.FC<Props> = (props) => {
    const { className } = props;
    const [data, setData] = React.useState<StateProps>({ order: [], users: [] })

    React.useEffect(() => {
        async function fetchData() {
            const [users, order] = await Promise.all([
                (await (fetch(process.env.NEXT_PUBLIC_API_URL + "/users"))).json(),
                (await (fetch(process.env.NEXT_PUBLIC_API_URL + "/order"))).json(),
            ]);
            setData({ users, order })
        }
        fetchData()
    }, [])
    return (
        <Tabs defaultValue="user" className={cn("", className)}>
            <TabsList>
                <TabsTrigger value="user">users</TabsTrigger>
                <TabsTrigger value="order">order</TabsTrigger>
            </TabsList>
            <TabsContent value="user">
                <StatisticUser data={data.users} />
            </TabsContent>
            <TabsContent value="order">
                <StatisticOrder data={data.order} />
            </TabsContent>
        </Tabs>
    );
}