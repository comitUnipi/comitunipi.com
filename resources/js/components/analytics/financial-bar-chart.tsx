import { formatRupiah } from '@/lib/format-rupiah';
import { DollarSign, TrendingDown, TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface Props {
    totalPemasukan: number;
    totalPengeluaran: number;
    totalKas: number;
}

export default function FinancialBarChart({ totalPemasukan, totalPengeluaran, totalKas }: Props) {
    const data = [
        {
            name: 'Total Pemasukan',
            shortName: 'Pemasukan',
            amount: totalPemasukan,
            color: '#10b981',
            icon: <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />,
            gradient: 'from-emerald-400 to-emerald-600',
        },
        {
            name: 'Total Pengeluaran',
            shortName: 'Pengeluaran',
            amount: totalPengeluaran,
            color: '#ef4444',
            icon: <TrendingDown className="h-4 w-4 sm:h-5 sm:w-5" />,
            gradient: 'from-red-400 to-red-600',
        },
        {
            name: 'Total Kas',
            shortName: 'Kas',
            amount: totalKas,
            color: '#3b82f6',
            icon: <DollarSign className="h-4 w-4 sm:h-5 sm:w-5" />,
            gradient: 'from-blue-400 to-blue-600',
        },
    ];

    return (
        <div className="relative overflow-hidden rounded-xl border border-white/20 bg-white/50 p-3 shadow-xl sm:rounded-2xl sm:p-4 lg:p-6">
            <div className="h-[250px] w-full rounded-lg border border-white/50 bg-white/50 p-2 backdrop-blur-sm sm:h-[300px] sm:rounded-xl sm:p-3 lg:h-[350px] lg:p-4">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 10,
                            left: 10,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.5} />
                        <XAxis
                            dataKey="name"
                            tick={{
                                fill: '#64748b',
                                fontWeight: '500',
                                fontSize: 10,
                            }}
                            tickLine={{ stroke: '#cbd5e1' }}
                            axisLine={{ stroke: '#cbd5e1' }}
                            interval={0}
                            angle={0}
                            textAnchor="middle"
                            height={60}
                            className="hidden sm:block"
                        />
                        <XAxis
                            dataKey="shortName"
                            tick={{
                                fill: '#64748b',
                                fontWeight: '500',
                                fontSize: 10,
                            }}
                            tickLine={{ stroke: '#cbd5e1' }}
                            axisLine={{ stroke: '#cbd5e1' }}
                            interval={0}
                            angle={0}
                            textAnchor="middle"
                            height={40}
                            className="block sm:hidden"
                        />
                        <YAxis
                            tick={{
                                fill: '#64748b',
                                fontWeight: '500',
                                fontSize: 10,
                            }}
                            tickLine={{ stroke: '#cbd5e1' }}
                            axisLine={{ stroke: '#cbd5e1' }}
                            tickFormatter={(value) => formatRupiah(value)}
                            width={40}
                        />
                        <Bar dataKey="amount" radius={[4, 4, 0, 0]} className="transition-opacity duration-300 hover:opacity-80">
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-3 flex flex-col gap-3 sm:mt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                    {data.map((item, index) => (
                        <div key={index} className="flex items-center gap-1 sm:gap-2">
                            <div className="flex items-center gap-1">
                                {item.icon}
                                <div className="h-2 w-2 rounded-full sm:h-3 sm:w-3" style={{ backgroundColor: item.color }}></div>
                            </div>
                            <span className="text-xs font-medium text-gray-600 sm:text-sm">{item.shortName}</span>
                        </div>
                    ))}
                </div>
                <div className="mt-2 text-xs text-gray-500 sm:mt-0">Updated: {new Date().toLocaleDateString('id-ID')}</div>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:hidden sm:grid-cols-3">
                {data.map((item, index) => (
                    <div key={index} className="rounded-lg border border-white/30 bg-white/60 p-3 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                {item.icon}
                                <span className="text-xs font-medium text-gray-600">{item.shortName}</span>
                            </div>
                            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                        </div>
                        <div className="mt-2 text-lg font-bold text-gray-800">{formatRupiah(item.amount)}</div>
                    </div>
                ))}
            </div>
            <div className="mt-4 hidden sm:block lg:block">
                <div className="grid grid-cols-3 gap-4">
                    {data.map((item, index) => (
                        <div key={index} className="rounded-lg border border-white/30 bg-white/60 p-4 backdrop-blur-sm">
                            <div className="mb-2 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    {item.icon}
                                    <span className="text-sm font-medium text-gray-600">{item.name}</span>
                                </div>
                                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                            </div>
                            <div className="text-xl font-bold text-gray-800 lg:text-2xl">{formatRupiah(item.amount)}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
