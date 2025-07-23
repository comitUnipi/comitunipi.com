import { formatDate } from '@/lib/format-date';
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

  const generateTicks = () => {
    const max = Math.max(...data.map((d) => d.amount));
    if (max === 0) return [0, 1000, 2000, 3000];
    const step = Math.pow(10, Math.floor(Math.log10(max)) - 1);
    const ticks = [];

    for (let i = 0; i <= max; i += step) {
      ticks.push(i);
    }

    if (ticks[ticks.length - 1] < max) {
      ticks.push(max);
    }

    return ticks;
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/20 bg-white/50 p-3 shadow sm:rounded-2xl sm:p-4 lg:p-6 dark:border-white/10 dark:bg-zinc-900/60">
      <div className="h-[250px] w-full rounded-lg border border-white/50 bg-white/50 p-2 backdrop-blur-sm sm:h-[300px] sm:rounded-xl sm:p-3 lg:h-[350px] lg:p-4 dark:border-white/10 dark:bg-zinc-800/50">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.5} className="dark:stroke-white/10" />
            <XAxis
              dataKey="name"
              tick={{ fill: '#64748b', fontWeight: '500', fontSize: 10 }}
              tickLine={{ stroke: '#cbd5e1' }}
              axisLine={{ stroke: '#cbd5e1' }}
              interval={0}
              height={60}
              className="dark:tick:fill-white/70 hidden sm:block"
            />
            <XAxis
              dataKey="shortName"
              tick={{ fill: '#64748b', fontWeight: '500', fontSize: 10 }}
              tickLine={{ stroke: '#cbd5e1' }}
              axisLine={{ stroke: '#cbd5e1' }}
              interval={0}
              height={40}
              className="block sm:hidden"
            />
            <YAxis
              tick={{ fill: '#64748b', fontWeight: '500', fontSize: 10 }}
              tickLine={{ stroke: '#cbd5e1' }}
              axisLine={{ stroke: '#cbd5e1' }}
              tickFormatter={(value) => formatRupiah(value)}
              width={50}
              ticks={generateTicks()}
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
              <span className="text-xs font-medium text-gray-600 sm:text-sm dark:text-gray-300">{item.shortName}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 text-xs text-gray-500 sm:mt-0 dark:text-gray-400">Updated: {formatDate(new Date().toISOString())}</div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:hidden sm:grid-cols-3">
        {data.map((item, index) => (
          <div key={index} className="rounded-lg border border-white/30 bg-white/60 p-3 backdrop-blur-sm dark:border-white/10 dark:bg-zinc-800/60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {item.icon}
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{item.shortName}</span>
              </div>
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }}></div>
            </div>
            <div className="mt-2 text-lg font-bold text-gray-800 dark:text-white">{formatRupiah(item.amount)}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 hidden sm:block lg:block">
        <div className="grid grid-cols-3 gap-4">
          {data.map((item, index) => (
            <div key={index} className="rounded-lg border border-white/30 bg-white/60 p-4 backdrop-blur-sm dark:border-white/10 dark:bg-zinc-800/60">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{item.name}</span>
                </div>
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
              </div>
              <div className="text-xl font-bold text-gray-800 lg:text-2xl dark:text-white">{formatRupiah(item.amount)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
