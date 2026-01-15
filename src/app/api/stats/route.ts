import { NextResponse } from 'next/server'
import { prisma } from '@/utils/prisma'

export async function GET() {
  try {
    const [
      totalRevenue,
      totalOrders,
      totalCustomers,
      totalProducts,
      recentOrders,
      ordersByStatus,
    ] = await Promise.all([
      prisma.order.aggregate({
        _sum: {
          total: true,
        },
      }),
      prisma.order.count(),
      prisma.customer.count(),
      prisma.product.count(),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          customer: {
            select: {
              name: true,
            },
          },
        },
      }),
      prisma.order.groupBy({
        by: ['status'],
        _count: {
          status: true,
        },
      }),
    ])

    const statusCounts = ordersByStatus.reduce((acc, item) => {
      acc[item.status] = item._count.status
      return acc
    }, {} as Record<string, number>)

    return NextResponse.json({
      revenue: totalRevenue._sum.total || 0,
      orders: totalOrders,
      customers: totalCustomers,
      products: totalProducts,
      recentOrders,
      ordersByStatus: statusCounts,
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
